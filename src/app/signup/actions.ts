
'use server';

import { createUserWithEmailAndPassword, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { SignUpSchema } from '@/lib/schemas';
import type { SignUpInput } from '@/lib/schemas';
import { createUserProfileDocument } from '@/app/profile/actions';

export interface SignUpFormState {
  message: string | null;
  errors?: {
    firstName?: string[];
    lastName?: string[];
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

  const { email, password, firstName, lastName } = validation.data;
  let user: User | null = null;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return { message: 'This email is already in use. Please try another one.', success: false, errors: { _form: ['This email is already in use.'], email: ['This email is already in use.'] } };
    }
    console.error('Firebase SignUp Error:', error);
    return { message: 'An unexpected error occurred during sign up. Please try again.', success: false, errors: { _form: ['An unexpected error occurred.'] } };
  }
  
  if (user) {
    try {
      await createUserProfileDocument(user.uid, user.email || email, firstName, lastName);
    } catch (profileError) {
        console.error('Error creating user profile document:', profileError);
        // Even if profile creation fails, user is authenticated. Might want to handle this more gracefully.
        // For now, we'll proceed with redirect as auth was successful.
    }
  }

  redirect('/');
}
