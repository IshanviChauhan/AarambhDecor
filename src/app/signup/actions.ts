
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
    // Enhanced error logging
    console.error('Firebase SignUp Authentication Error (Full):', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return { message: 'An unexpected error occurred during sign up (authentication phase). Please try again.', success: false, errors: { _form: ['An unexpected error occurred during authentication.'] } };
  }
  
  if (user) {
    try {
      await createUserProfileDocument(user.uid, user.email || email, firstName, lastName);
    } catch (profileError: any) {
        console.error('Error creating user profile document in Firestore (Full):', JSON.stringify(profileError, Object.getOwnPropertyNames(profileError)));
        // If profile creation fails, return an error. This is a critical step.
        return { 
            message: 'Your account was created, but we failed to save your profile information. Please contact support or try completing your profile later.', 
            success: false, 
            errors: { _form: ['Failed to save profile information to database.'] } 
        };
    }
  } else {
    return { message: 'User authentication succeeded but user object is not available. Please try again.', success: false, errors: { _form: ['User data not available after authentication.'] } };
  }

  redirect('/');
}

