
// This action file (src/app/signup/actions.ts) is deprecated.
// Registration functionality is handled by /register/actions.ts.
// This file can be safely deleted.

'use server';

export interface OldSignUpFormState {
  message: string | null;
  errors?: {
    _form?: string[];
  };
  success: boolean;
}

export async function oldSignUpWithEmailAction(prevState: OldSignUpFormState, formData: FormData): Promise<OldSignUpFormState> {
  console.warn("Deprecated signUpWithEmail action called at /signup/actions.ts. Registration is handled by /register/actions.ts.");
  return {
    message: 'Registration functionality has moved. Please use the /register route.',
    success: false,
    errors: { _form: ['This sign-up endpoint is deprecated. Please navigate to /register.'] }
  };
}
