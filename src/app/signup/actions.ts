
'use server';

// This file's functionality is removed as authentication is disabled.

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
  console.warn("signUpWithEmail action called, but authentication is disabled.");
  return {
    message: 'Sign-up functionality is currently disabled.',
    success: false,
    errors: { _form: ['Sign-up is disabled.'] }
  };
}
