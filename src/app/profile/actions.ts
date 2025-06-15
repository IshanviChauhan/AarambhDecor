
'use server';

import { auth, db } from '@/lib/firebase';
import { UserProfileSchema, AddressSchema } from '@/lib/schemas';
import type { UserProfile, Address, Order } from '@/lib/types';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
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
  const newProfileData: UserProfile = { // Explicitly type for clarity
    uid: uid,
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
    const data = profileSnap.data() as Partial<UserProfile>; // Cast for easier access
    let firstName = data.firstName;
    let lastName = data.lastName;

    if (user.email === 'ishanvi.chauhan@gmail.com') {
      firstName = firstName || 'Ishanvi'; // Default if undefined or empty
      lastName = lastName || 'Chauhan';   // Default if undefined or empty
    }
    
    return { 
        uid: user.uid, 
        email: user.email || '', 
        firstName: firstName || null, // Ensure null if empty
        lastName: lastName || null  // Ensure null if empty
    } as UserProfile;
  } else {
    // This case should be less common now with createUserProfileDocument on signup
    // However, let's ensure it still creates a basic profile if somehow missed.
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
    
    const newProfileData: UserProfile = { uid: user.uid, email: user.email || '', firstName: newFirstName || null, lastName: newLastName || null };
    await setDoc(profileDocRef, newProfileData);
    return newProfileData;
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
    const dataToUpdate: Partial<Pick<UserProfile, 'firstName' | 'lastName'>> = {};


    let firstNameToSet = validation.data.firstName;
    let lastNameToSet = validation.data.lastName;

    if (user.email === 'ishanvi.chauhan@gmail.com') {
      firstNameToSet = firstNameToSet || 'Ishanvi'; // Default if empty
      lastNameToSet = lastNameToSet || 'Chauhan';   // Default if empty
    }
    
    // Only include fields if they are provided (or defaulted for the mock user)
    if (firstNameToSet) dataToUpdate.firstName = firstNameToSet;
    if (lastNameToSet) dataToUpdate.lastName = lastNameToSet;


    const profileSnap = await getDoc(profileDocRef);
    if (profileSnap.exists()) {
        await updateDoc(profileDocRef, dataToUpdate);
    } else {
        // Should not happen if createUserProfileDocument runs correctly on signup
        // but as a fallback, create it with email as well
        await setDoc(profileDocRef, { 
            email: user.email || '', 
            ...dataToUpdate 
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

// --- Order History Actions (Placeholder) ---
export async function getOrderHistory(): Promise<Order[]> {
  const user = auth.currentUser;
  if (!user) return [];

  // This is a placeholder. In a real application, you'd query a 'orders' collection
  // likely filtered by userId and ordered by date.
  // For example:
  // const ordersColRef = collection(db, 'userProfiles', user.uid, 'orders');
  // const q = query(ordersColRef, orderBy('orderDate', 'desc'));
  // const ordersSnap = await getDocs(q);
  // return ordersSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Order));
  
  console.warn("getOrderHistory is a placeholder and does not fetch real order data yet.");
  return Promise.resolve([]); // Return empty array for now
}
