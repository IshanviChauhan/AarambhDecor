
'use server';

// This file's functionality has been removed as user registration is no longer part of the application.

export interface RegisterUserFormState {
  message: string | null;
  errors?: Record<string, string[]>;
  success: boolean;
  userId?: string;
}

export async function registerUserAction(prevState: RegisterUserFormState, formData: FormData): Promise<RegisterUserFormState> {
  console.warn("registerUserAction called, but user registration functionality has been removed.");
  return {
    message: 'User registration functionality has been removed from this application.',
    success: false,
    errors: { _form: ['User registration is disabled.'] },
  };
}
