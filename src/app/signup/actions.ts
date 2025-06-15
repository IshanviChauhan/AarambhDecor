
'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export interface SignUpFormState {
  message: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success: boolean;
}

export async function signUpWithEmail(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validation = SignUpSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid data. Please check your input.',
      success: false,
    };
  }

  const { email, password } = validation.data;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Consider redirecting after a short delay or on a success page if immediate feedback is needed before redirect
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return { message: 'This email is already in use. Please try another one.', success: false, errors: { _form: ['This email is already in use.'] } };
    }
    console.error('Firebase SignUp Error:', error);
    return { message: 'An unexpected error occurred during sign up. Please try again.', success: false, errors: { _form: ['An unexpected error occurred.'] } };
  }
  
  // Redirect must be outside try/catch as it throws an error,
  // and should only happen on clear success.
  redirect('/'); 
  // Note: redirect() will not be hit if an error is returned above.
  // For the type checker, if we reach here, it's a success.
  // However, redirect itself throws an error, so this return is effectively unreachable.
  // return { message: 'Sign up successful! Redirecting...', success: true };
}
