
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { SignInSchema, type SignInInput } from '@/lib/schemas';

export interface SignInUserFormState {
  message: string | null;
  errors?: Partial<Record<keyof SignInInput | '_form', string[]>>;
  success: boolean;
  userId?: string; // Optionally return user ID or some indicator
}

export async function signInUserAction(prevState: SignInUserFormState, formData: FormData): Promise<SignInUserFormState> {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'), // Collected but not checked against a stored hash
  };

  const validation = SignInSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Invalid login data. Please check your input.',
      success: false,
    };
  }

  const { email } = validation.data;

  try {
    const userProfileRef = collection(db, 'userProfile');
    const q = query(userProfileRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        message: 'No account found with this email address. Please check your email or register.',
        success: false,
        errors: { email: ['No account found with this email.'] }
      };
    }

    // Password checking is skipped in this simulated environment.
    // If email exists, consider login successful.
    
    // In a real scenario, you'd compare the provided password with a stored hash.
    // const userDoc = querySnapshot.docs[0];
    // const userData = userDoc.data();
    // const passwordMatches = await comparePassword(password, userData.passwordHash); // Fictional function
    // if (!passwordMatches) {
    //   return { message: "Invalid password.", success: false, errors: { password: ["Incorrect password."]}};
    // }

    const userId = querySnapshot.docs[0].id; // Get the Firestore document ID

    return { 
      message: 'Login successful! Redirecting... (Password check was simulated)', 
      success: true,
      userId: userId
    };

  } catch (error) {
    console.error('Error during simulated login:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { 
      message: `Login failed: ${errorMessage}`, 
      success: false, 
      errors: { _form: [`Login failed due to a server error: ${errorMessage}`] } 
    };
  }
}
