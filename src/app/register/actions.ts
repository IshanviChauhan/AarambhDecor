
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
    console.error("Validation errors:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid registration data. Please check your input.',
      success: false,
    };
  }

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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

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

    await setDoc(userProfileRef, newUserProfileData);

    return {
      message: 'Registration successful! Your account has been created.',
      success: true,
      userId: user.uid, // Return the userId
    };

  } catch (error: any) {
    console.error('Error during registration:', error);
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
          errorMessage = `Registration failed: ${error.message || 'An unknown server error occurred.'}`;
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
