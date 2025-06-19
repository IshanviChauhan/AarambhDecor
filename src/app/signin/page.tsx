// This file is deprecated. Redirect or show message.
// For now, let's make it a redirect to the new auth page to avoid confusion.
import { redirect } from 'next/navigation';

export default function DeprecatedSignInPage() {
  redirect('/auth/signin'); // Redirect to the new NextAuth sign-in page
  return null;
}

// The problematic 'export const config' has been removed from this file.
