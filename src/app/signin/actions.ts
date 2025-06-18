
'use server';

// This file's functionality is removed as authentication is disabled.

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
  console.warn("signInWithEmail action called, but authentication is disabled.");
  return {
    message: 'Sign-in functionality is currently disabled.',
    success: false,
    errors: { _form: ['Sign-in is disabled.'] }
  };
}
