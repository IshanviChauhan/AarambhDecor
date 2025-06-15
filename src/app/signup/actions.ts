
'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { SignUpSchema } from '@/lib/schemas';
import type { SignUpInput } from '@/lib/schemas';

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
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return { message: 'This email is already in use. Please try another one.', success: false, errors: { _form: ['This email is already in use.'] } };
    }
    console.error('Firebase SignUp Error:', error);
    return { message: 'An unexpected error occurred during sign up. Please try again.', success: false, errors: { _form: ['An unexpected error occurred.'] } };
  }
  
  redirect('/');
  // return { message: 'Sign up successful! Redirecting...', success: true };
}
