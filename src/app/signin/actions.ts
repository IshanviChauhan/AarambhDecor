
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { SignInSchema } from '@/lib/schemas';
import type { SignInInput } from '@/lib/schemas';


export interface SignInFormState {
  message: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success: boolean;
}

export async function signInWithEmail(prevState: SignInFormState, formData: FormData): Promise<SignInFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validation = SignInSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid data. Please check your input.',
      success: false,
    };
  }

  const { email, password } = validation.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
      return { message: 'Invalid email or password. Please try again.', success: false, errors: { _form: ['Invalid email or password.'] } };
    }
    console.error('Firebase SignIn Error:', error);
    return { message: 'An unexpected error occurred during sign in. Please try again.', success: false, errors: { _form: ['An unexpected error occurred.'] } };
  }
  
  redirect('/');
  // return { message: 'Sign in successful! Redirecting...', success: true };
}
