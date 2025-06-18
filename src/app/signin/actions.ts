
'use server';

import type { UserCredential } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { SignInSchema } from '@/lib/schemas';
import { getUserProfile } from '@/app/profile/actions';


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
  // let userCredential: UserCredential | null = null; // Keep for potential future re-introduction

  try {
    // userCredential = await signInWithEmailAndPassword(auth, email, password); // Assign if re-introducing profile fetch
    await signInWithEmailAndPassword(auth, email, password); // For now, just ensure this succeeds
    // If the above line does not throw, login was successful.
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
      return { message: 'Invalid email or password. Please try again.', success: false, errors: { _form: ['Invalid email or password.'] } };
    }
    console.error('Firebase SignIn Error (Full):', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return { message: 'An unexpected error occurred during log in. Please try again.', success: false, errors: { _form: ['An unexpected error occurred.'] } };
  }
  
  // --- Temporarily comment out profile fetching and custom welcome message for debugging login ---
  /*
  let welcomeMessage = "Welcome!";
  // Ensure userCredential is assigned above if this block is re-enabled
  if (userCredential && userCredential.user) { 
    try {
      const profile = await getUserProfile(userCredential.user); 
      if (profile && profile.firstName) {
        welcomeMessage = `Welcome ${profile.firstName}!`;
      }
    } catch (profileError) {
      console.error("Error fetching user profile after login:", profileError);
      // Fallback to generic welcome message if profile fetch fails
    }
  } else {
    // This case indicates signInWithEmailAndPassword succeeded but didn't return a user credential,
    // or an error was caught but the flow unexpectedly continued.
    // The catch block above should typically return, preventing this.
    console.warn("Login appeared to succeed, but no user credential was available for profile fetch.");
  }

  redirect(`/?welcome_message=${encodeURIComponent(welcomeMessage)}`);
  */

  // --- Simple redirect to test core login ---
  console.log("Login successful, redirecting to /");
  redirect('/'); 
}

