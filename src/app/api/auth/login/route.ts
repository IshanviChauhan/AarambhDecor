
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SignInSchema, type SignInInput } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = SignInSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: 'Invalid input.', errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password } = validation.data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return NextResponse.json({ success: true, userId: userCredential.user.uid, message: 'Login successful!' }, { status: 200 });
    } catch (error: any) {
      console.error('API Login Error (Firebase Auth):', error);
      let errorMessage = 'Invalid email or password.';
      // More specific error handling based on Firebase error codes
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address format is invalid.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This user account has been disabled.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. Try again later.';
            break;
          default:
            errorMessage = 'An unexpected authentication error occurred.';
        }
      }
      return NextResponse.json({ success: false, message: errorMessage }, { status: 401 });
    }
  } catch (error) {
    console.error('API Login Error (Request/JSON Parsing):', error);
    return NextResponse.json({ success: false, message: 'An error occurred processing your request.' }, { status: 500 });
  }
}
