
'use server';

// This action file (src/app/signup/actions.ts) is no longer needed
// as the registration functionality is handled by /register/actions.ts.
// This file can be safely deleted.

export interface SignUpFormState {
  message: string | null;
  errors?: {
    _form?: string[];
  };
  success: boolean;
}

export async function signUpWithEmail(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  console.warn("Old signUpWithEmail action called at /signup/actions.ts, but registration is handled by /register/actions.ts.");
  return {
    message: 'Registration functionality has moved. Please use the /register route.',
    success: false,
    errors: { _form: ['This sign-up endpoint is deprecated.'] }
  };
}
