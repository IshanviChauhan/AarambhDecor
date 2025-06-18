
'use server';

import { auth } from '@/lib/firebase'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SignInSchema, type SignInInput } from '@/lib/schemas';

export interface SignInUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignInInput | '_form', string[]>>;
  success: boolean;
  userId?: string;
}

export async function signInUserAction(prevState: SignInUserFormState, formData: FormData): Promise<SignInUserFormState> {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validation = SignInSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid login data. Please check your input.',
      success: false,
    };
  }

  const { email, password } = validation.data;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // If successful, Firebase Auth handles the session internally.

    return {
      message: 'Login successful! You will be redirected shortly.',
      success: true,
      userId: userCredential.user.uid, // Ensure userId is part of the successful state
    };

  } catch (error: any) {
    console.error('Firebase Authentication Error:', error);
    let errorMessage = 'Login failed. Please try again.';
    let fieldErrors: Partial<Record<keyof SignInInput | '_form', string[]>> = { _form: [errorMessage] };

    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        fieldErrors = { _form: [errorMessage] };
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        fieldErrors = { email: [errorMessage] };
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
        fieldErrors = { _form: [errorMessage] };
        break;
      default:
        errorMessage = `Login failed: ${error.message || 'An unknown server error occurred.'}`;
        fieldErrors = { _form: [errorMessage] };
        break;
    }

    return {
      message: errorMessage,
      success: false,
      errors: fieldErrors,
    };
  }
}
