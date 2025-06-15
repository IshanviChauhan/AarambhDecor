
'use server';

import { auth, db } from '@/lib/firebase';
import { UserProfileSchema, AddressSchema } from '@/lib/schemas';
import type { UserProfile, Address } from '@/lib/types';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface FormState {
  message: string | null;
  errors?: Record<string, string[] | undefined> & { _form?: string[] };
  success: boolean;
  data?: any;
}

// --- User Profile Actions ---

export async function createUserProfileDocument(uid: string, email: string, firstName: string, lastName: string): Promise<void> {
  const profileDocRef = doc(db, 'userProfiles', uid);
  const newProfileData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
  await setDoc(profileDocRef, newProfileData, { merge: true }); // merge true in case some other process creates it
}


export async function getUserProfile(): Promise<UserProfile | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const profileDocRef = doc(db, 'userProfiles', user.uid);
  const profileSnap = await getDoc(profileDocRef);

  if (profileSnap.exists()) {
    const data = profileSnap.data();
    let firstName = data.firstName;
    let lastName = data.lastName;

    if (user.email === 'ishanvi.chauhan@gmail.com') {
      if (!firstName && !lastName && data.name === 'Ishanvi Chauhan') { // Legacy name field check
        firstName = 'Ishanvi';
        lastName = 'Chauhan';
      } else {
        firstName = firstName || 'Ishanvi';
        lastName = lastName || 'Chauhan';
      }
    }
    
    return { 
        uid: user.uid, 
        email: user.email || '', 
        firstName: firstName || null, 
        lastName: lastName || null 
    } as UserProfile;
  } else {
    // Create a basic profile if it doesn't exist
    // This case should be less common now with createUserProfileDocument on signup
    let newFirstName = '';
    let newLastName = '';
    if (user.email === 'ishanvi.chauhan@gmail.com') {
      newFirstName = 'Ishanvi';
      newLastName = 'Chauhan';
    } else if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        newFirstName = nameParts[0] || '';
        newLastName = nameParts.slice(1).join(' ') || '';
    }
    
    const newProfileData = { email: user.email || '', firstName: newFirstName, lastName: newLastName };
    await setDoc(profileDocRef, newProfileData);
    return { uid: user.uid, ...newProfileData } as UserProfile;
  }
}

export async function updateUserProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
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
    const dataToUpdate: { email: string; firstName?: string; lastName?: string } = { 
        email: user.email || '' 
    };

    let firstNameToSet = validation.data.firstName;
    let lastNameToSet = validation.data.lastName;

    if (user.email === 'ishanvi.chauhan@gmail.com') {
      firstNameToSet = firstNameToSet || 'Ishanvi'; // Default if empty
      lastNameToSet = lastNameToSet || 'Chauhan';   // Default if empty
    }
    
    dataToUpdate.firstName = firstNameToSet;
    dataToUpdate.lastName = lastNameToSet;

    const profileSnap = await getDoc(profileDocRef);
    if (profileSnap.exists()) {
        await updateDoc(profileDocRef, { 
            firstName: dataToUpdate.firstName, 
            lastName: dataToUpdate.lastName 
        });
    } else {
        await setDoc(profileDocRef, { 
            email: dataToUpdate.email, 
            firstName: dataToUpdate.firstName, 
            lastName: dataToUpdate.lastName 
        });
    }

    revalidatePath('/profile');
    return { message: 'Profile updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { message: 'Failed to update profile.', success: false, errors: { _form: ['Failed to update profile.'] } };
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
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
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
    const { id, ...addressData } = validation.data; 
    
    const payload: Record<string, any> = {};
    for (const key in addressData) {
        if (Object.prototype.hasOwnProperty.call(addressData, key)) {
            const typedKey = key as keyof typeof addressData;
            if (addressData[typedKey] !== undefined) { 
                 payload[typedKey] = addressData[typedKey];
            }
        }
    }

    await addDoc(addressesColRef, payload);
    revalidatePath('/profile');
    return { message: 'Shipping address added successfully!', success: true };
  } catch (error) {
    console.error('Error adding address:', error);
    return { message: 'Failed to add shipping address.', success: false, errors: { _form: ['Failed to add shipping address.'] } };
  }
}

export async function updateShippingAddress(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = auth.currentUser;
  if (!user) {
    return { message: 'User not authenticated.', success: false, errors: { _form: ['User not authenticated.'] } };
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
    return { message: 'Address ID is missing for update.', success: false, errors: { _form: ['Address ID is missing.'] } };
  }

  try {
    const addressDocRef = doc(db, 'userProfiles', user.uid, 'shippingAddresses', addressId);

    const payload: Record<string, any> = {};
    for (const key in addressData) {
        if (Object.prototype.hasOwnProperty.call(addressData, key)) {
            const typedKey = key as keyof typeof addressData;
             if (addressData[typedKey] !== undefined) { 
                 payload[typedKey] = addressData[typedKey];
            }
        }
    }
    if (Object.keys(payload).length > 0) {
        await updateDoc(addressDocRef, payload);
    }
    revalidatePath('/profile');
    return { message: 'Shipping address updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating address:', error);
    return { message: 'Failed to update shipping address.', success: false, errors: { _form: ['Failed to update shipping address.'] } };
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
