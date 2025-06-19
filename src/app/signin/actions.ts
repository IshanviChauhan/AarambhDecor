
'use server';

import { auth } from '@/lib/firebase'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SignInSchema, type SignInInput } from '@/lib/schemas';

export interface SignInUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignInInput | '_form', string[]>>;
  success: boolean;
  userId?: string; // To pass the UID back to the client
}

export async function signInUserAction(prevState: SignInUserFormState, formData: FormData): Promise<SignInUserFormState> {
  console.log("SignInUserAction (Server Action): Action invoked.");
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  console.log("SignInUserAction (Server Action): Raw form data:", rawFormData);

  const validation = SignInSchema.safeParse(rawFormData);

  if (!validation.success) {
    console.error("SignInUserAction (Server Action): Server-side validation failed:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid login data. Please check your input.',
      success: false,
    };
  }
  console.log("SignInUserAction (Server Action): Server-side validation successful.");

  const { email, password } = validation.data;

  try {
    console.log(`SignInUserAction (Server Action): Attempting to sign in user: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`SignInUserAction (Server Action): User ${userCredential.user.uid} signed in successfully.`);
    return {
      message: 'Login successful! You will be redirected shortly.',
      success: true,
      userId: userCredential.user.uid,
    };

  } catch (error: any) {
    console.error('SignInUserAction (Server Action): Firebase Authentication Error:', error);
    let errorMessage = 'Login failed. An unexpected error occurred. Please try again.';
    let fieldErrors: Partial<Record<keyof SignInInput | '_form', string[]>> = { _form: [errorMessage] };

    // Handle specific Firebase Auth error codes
    // error.code is Firebase specific, error.type would be NextAuth specific
    if (error.code) {
        switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found': // Older SDKs might differentiate
        case 'auth/wrong-password': // Older SDKs might differentiate
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            // For security, we don't reveal if it's the email or password that's wrong.
            fieldErrors = { _form: [errorMessage] };
            break;
        case 'auth/invalid-email':
            errorMessage = 'The email address format is not valid.';
            fieldErrors = { email: [errorMessage] };
            break;
        case 'auth/user-disabled':
            errorMessage = 'This user account has been disabled.';
            fieldErrors = { _form: [errorMessage] };
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can try again later or reset your password.';
            fieldErrors = { _form: [errorMessage] };
            break;
        default:
            // This covers other unexpected Firebase errors
            errorMessage = `Login failed: ${error.message || 'An unknown server error occurred.'}`;
            fieldErrors = { _form: [errorMessage] };
            break;
        }
    } else {
        // This covers non-Firebase errors, or if error.code is somehow not present
         fieldErrors = { _form: [errorMessage] };
    }


    return {
      message: errorMessage,
      success: false,
      errors: fieldErrors,
    };
  }
}
