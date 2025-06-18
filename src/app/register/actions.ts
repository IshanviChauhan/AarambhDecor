
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { SignUpSchemaWithAddress, type SignUpWithAddressInput } from '@/lib/schemas';
import type { UserProfile } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export interface RegisterUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignUpWithAddressInput | '_form', string[]>>;
  success: boolean;
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
    // password and confirmPassword are validated but not stored
    addressStreet,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountry
  } = validation.data;

  try {
    // Check if user with this email already exists in the userProfile collection
    const userProfileRef = collection(db, 'userProfile');
    const q = query(userProfileRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        message: 'An account with this email address already exists. Please try a different email or login.',
        success: false,
        errors: { email: ['This email address is already registered.'] }
      };
    }

    // Note: In a real app with Firebase Auth, you would first call
    // createUserWithEmailAndPassword(auth, email, password)
    // and then use the returned user's UID for the Firestore document ID.
    // Here, we simulate creating the profile data only. Password is NOT stored.

    const newUserProfileData: Omit<UserProfile, 'uid'> & { createdAt: any } = {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || null, // Store as null if empty
      address: {
        street: addressStreet,
        city: addressCity,
        state: addressState,
        postalCode: addressPostalCode,
        country: addressCountry,
      },
      createdAt: serverTimestamp(),
    };

    const userDocRef = await addDoc(userProfileRef, newUserProfileData);
    // console.log("User profile stored in Firestore userProfile collection with ID: ", userDocRef.id);

    // Optionally revalidate paths if this data is displayed elsewhere immediately
    // revalidatePath('/some-admin-users-page');
    
    return { 
      message: 'Registration successful! Your profile data has been stored (authentication is disabled).', 
      success: true 
    };

  } catch (error) {
    console.error('Error storing user profile to Firestore userProfile collection:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { 
      message: `Failed to register user: ${errorMessage}`, 
      success: false, 
      errors: { _form: [`Failed to register user due to a server error: ${errorMessage}`] } 
    };
  }
}

    