
'use server';

import { auth, db } from '@/lib/firebase';
import { UserProfileSchema, AddressSchema } from '@/lib/schemas';
import type { UserProfile, Address } from '@/lib/types';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface FormState {
  message: string | null;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
  data?: any;
}

// --- User Profile Actions ---
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const profileDocRef = doc(db, 'userProfiles', user.uid);
  const profileSnap = await getDoc(profileDocRef);

  if (profileSnap.exists()) {
    return { uid: user.uid, email: user.email || '', ...profileSnap.data() } as UserProfile;
  } else {
    // Create a basic profile if it doesn't exist
    let profileName = user.displayName || '';
    if (user.email === 'ishanvi.chauhan@gmail.com') {
      profileName = 'Ishanvi Chauhan';
    }
    const newProfile: UserProfile = { uid: user.uid, email: user.email || '', name: profileName };
    await setDoc(profileDocRef, { email: newProfile.email, name: newProfile.name });
    return newProfile;
  }
}

export async function updateUserProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = UserProfileSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid data. Please check your input.',
      success: false,
    };
  }

  try {
    const profileDocRef = doc(db, 'userProfiles', user.uid);
    // Ensure only 'name' is updated if it's provided and valid
    const dataToUpdate: { name?: string } = {};
    if (validation.data.name) {
      dataToUpdate.name = validation.data.name;
    }
    
    if (Object.keys(dataToUpdate).length > 0) {
      await updateDoc(profileDocRef, dataToUpdate);
    } else if (! (await getDoc(profileDocRef)).exists()) { // if profile doesn't exist, create it
        // If profile doesn't exist, check if it's the mock user email for specific name setting
        let profileName = validation.data.name || user.displayName || '';
        if (user.email === 'ishanvi.chauhan@gmail.com' && !validation.data.name) {
            profileName = 'Ishanvi Chauhan';
        }
        await setDoc(profileDocRef, { email: user.email, name: profileName });
    }


    revalidatePath('/profile');
    return { message: 'Profile updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { message: 'Failed to update profile.', success: false };
  }
}


// --- Shipping Address Actions ---
export async function getShippingAddresses(): Promise<Address[]> {
  const user = auth.currentUser;
  if (!user) return [];

  const addressesColRef = collection(db, 'userProfiles', user.uid, 'shippingAddresses');
  const addressesSnap = await getDocs(addressesColRef);
  
  return addressesSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Address));
}

export async function addShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = AddressSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid address data. Please check your input.',
      success: false,
    };
  }

  try {
    const addressesColRef = collection(db, 'userProfiles', user.uid, 'shippingAddresses');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...addressData } = validation.data; // Exclude 'id' if present from Zod
    await addDoc(addressesColRef, addressData);
    revalidatePath('/profile');
    return { message: 'Shipping address added successfully!', success: true };
  } catch (error) {
    console.error('Error adding address:', error);
    return { message: 'Failed to add shipping address.', success: false };
  }
}

export async function updateShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validation = AddressSchema.safeParse(rawFormData);
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid address data. Please check your input.',
      success: false,
    };
  }

  const { id: addressId, ...addressData } = validation.data;

  if (!addressId) {
    return { message: 'Address ID is missing for update.', success: false };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);
    await updateDoc(addressDocRef, addressData);
    revalidatePath('/profile');
    return { message: 'Shipping address updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating address:', error);
    return { message: 'Failed to update shipping address.', success: false };
  }
}

export async function deleteShippingAddress(addressId: string): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false };
  }
  if (!addressId) {
     return { message: 'Address ID is missing for deletion.', success: false };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);
    await deleteDoc(addressDocRef);
    revalidatePath('/profile');
    return { message: 'Shipping address deleted successfully!', success: true };
  } catch (error) {
    console.error('Error deleting address:', error);
    return { message: 'Failed to delete shipping address.', success: false };
  }
}

