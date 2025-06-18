
'use server';

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, query, where, getDocs, collection } from 'firebase/firestore';
import { SignUpSchemaWithAddress, type SignUpWithAddressInput } from '@/lib/schemas';
import type { UserProfile } from '@/lib/types';
// revalidatePath is not strictly needed here unless another page immediately displays registered users.
// import { revalidatePath } from 'next/cache';

export interface RegisterUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignUpWithAddressInput | '_form', string[]>>;
  success: boolean;
  userId?: string; // To pass back the UID if needed
}

export async function registerUserAction(prevState: RegisterUserFormState, formData: FormData): Promise<RegisterUserFormState> {
  console.log("RegisterUserAction: Action invoked.");
  
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
    console.error("RegisterUserAction: Validation errors:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid registration data. Please check your input.',
      success: false,
    };
  }
  console.log("RegisterUserAction: Validation successful.");

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password, // Password will be used for Firebase Auth, not stored in Firestore
    addressStreet,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountry
  } = validation.data;

  try {
    // 1. Create user with Firebase Authentication
    console.log(`RegisterUserAction: Attempting to create Firebase Auth user for email: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`RegisterUserAction: Firebase Auth user created successfully. UID: ${user.uid}`);

    // 2. If Firebase Auth user creation is successful, create Firestore profile
    //    using the UID from Firebase Auth as the document ID.
    const userProfileRef = doc(db, 'userProfile', user.uid);

    const newUserProfileData: Omit<UserProfile, 'uid' | 'createdAt'> & { createdAt: any } = {
      email, // Email is stored for querying/display, but auth is the source of truth
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
      console.log(`RegisterUserAction: Attempting to set Firestore document for user: ${user.uid}`);
      await setDoc(userProfileRef, newUserProfileData);
      console.log(`RegisterUserAction: Firestore document set successfully for user: ${user.uid}`);
    } catch (firestoreError) {
      console.error(`RegisterUserAction: Error setting Firestore document for user ${user.uid} after auth creation:`, firestoreError);
      // If Firestore write fails, the user is created in Auth but not in DB.
      // This is a partial failure state. We should inform the user.
      return {
        message: `Account authentication created, but failed to save full profile. Please contact support. Auth UID: ${user.uid}`,
        success: false, // Indicate overall registration was not fully successful
        errors: { _form: [`Account authentication part succeeded, but profile setup failed. Error: ${firestoreError instanceof Error ? firestoreError.message : 'Unknown Firestore error'}`] },
        userId: user.uid, // Still provide UID for reference
      };
    }

    console.log("RegisterUserAction: Registration fully successful.");
    return {
      message: 'Registration successful! Your account has been created.',
      success: true,
      userId: user.uid, // Return the userId
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
          fieldErrors = { _form: [errorMessage] }; // This is a server/config issue
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
