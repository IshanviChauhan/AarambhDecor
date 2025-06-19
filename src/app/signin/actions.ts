
'use server';

// This file's functionality has been removed as user sign-in is no longer part of the application.

export interface SignInUserFormState {
  message: string | null;
  errors?: Record<string, string[]>;
  success: boolean;
  userId?: string;
}

export async function signInUserAction(prevState: SignInUserFormState, formData: FormData): Promise<SignInUserFormState> {
  console.warn("signInUserAction called, but user sign-in functionality has been removed.");
  return {
    message: 'User sign-in functionality has been removed from this application.',
    success: false,
    errors: { _form: ['User sign-in is disabled.'] },
  };
}
