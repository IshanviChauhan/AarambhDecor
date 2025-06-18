
'use server';

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { SignUpSchemaWithAddress, type SignUpWithAddressInput } from '@/lib/schemas';
import type { UserProfile } from '@/lib/types';

export interface RegisterUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignUpWithAddressInput | '_form', string[]>>;
  success: boolean;
  userId?: string;
}

export async function registerUserAction(prevState: RegisterUserFormState, formData: FormData): Promise<RegisterUserFormState> {
  console.log("RegisterUserAction: TOP OF ACTION INVOKED. PrevState keys:", Object.keys(prevState || {}));
  
  const formDataEntries: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    formDataEntries[key] = value;
  }
  console.log("RegisterUserAction: FormData entries received:", formDataEntries);

  const rawFormData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    addressStreet: formData.get('addressStreet'),
    addressCity: formData.get('addressCity'),
    addressState: formData.get('addressState'),
    addressPostalCode: formData.get('addressPostalCode'),
    addressCountry: formData.get('addressCountry'),
  };

  const validation = SignUpSchemaWithAddress.safeParse(rawFormData);

  if (!validation.success) {
    console.error("RegisterUserAction: Server-side validation errors:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid registration data. Please check your input.',
      success: false,
    };
  }
  console.log("RegisterUserAction: Server-side validation successful.");

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    addressStreet,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountry
  } = validation.data;

  try {
    console.log(`RegisterUserAction: Attempting to create Firebase Auth user for email: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`RegisterUserAction: Firebase Auth user created successfully. UID: ${user.uid}`);

    const userProfileRef = doc(db, 'userProfile', user.uid);

    const newUserProfileData: Omit<UserProfile, 'uid' | 'createdAt'> & { createdAt: any } = {
      email,
      firstName,
      lastName,
      phoneNumber: phoneNumber || null,
      address: { 
        street: addressStreet,
        city: addressCity,
        state: addressState,
        postalCode: addressPostalCode,
        country: addressCountry,
      },
      createdAt: serverTimestamp(),
    };

    try {
      console.log(`RegisterUserAction: Attempting to set Firestore document for user: ${user.uid} with data:`, newUserProfileData);
      await setDoc(userProfileRef, newUserProfileData);
      console.log(`RegisterUserAction: Firestore document set successfully for user: ${user.uid}`);
    } catch (firestoreError) {
      console.error(`RegisterUserAction: Error setting Firestore document for user ${user.uid} after auth creation:`, firestoreError);
      try {
        await user.delete();
        console.log(`RegisterUserAction: Successfully deleted Firebase Auth user ${user.uid} after Firestore failure.`);
      } catch (deleteError) {
        console.error(`RegisterUserAction: CRITICAL - Failed to delete Firebase Auth user ${user.uid} after Firestore failure. Manual cleanup may be needed. Delete error:`, deleteError);
      }
      const errorMessage = firestoreError instanceof Error ? firestoreError.message : 'Unknown Firestore error';
      return {
        message: `Account authentication created, but failed to save full profile. The authentication record has been rolled back. Please try again. Error: ${errorMessage}`,
        success: false,
        errors: { _form: [`Account authentication part succeeded, but profile setup failed. The operation was rolled back. Error: ${errorMessage}`] },
        userId: undefined,
      };
    }

    console.log("RegisterUserAction: Registration fully successful.");
    return {
      message: 'Registration successful! Your account has been created.',
      success: true,
      userId: user.uid,
    };

  } catch (error: any) {
    console.error('RegisterUserAction: Error during Firebase Auth user creation or other issues:', error);
    let errorMessage = 'Failed to register user. Please try again.';
    let fieldErrors: Partial<Record<keyof SignUpWithAddressInput | '_form', string[]>> = { _form: [errorMessage] };

    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already registered. Please try logging in or use a different email.';
          fieldErrors = { email: [errorMessage] };
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          fieldErrors = { email: [errorMessage] };
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          fieldErrors = { _form: [errorMessage] }; 
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. Please choose a stronger password.';
          fieldErrors = { password: [errorMessage] };
          break;
        default:
          errorMessage = `Registration failed due to an authentication error: ${error.message || 'An unknown server error occurred.'}`;
          fieldErrors = { _form: [errorMessage] };
          break;
      }
    } else if (error instanceof Error) {
         errorMessage = `Registration failed: ${error.message}`;
         fieldErrors = { _form: [errorMessage] };
    }

    return {
      message: errorMessage,
      success: false,
      errors: fieldErrors,
    };
  }
}
