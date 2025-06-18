
// This page component (src/app/signup/page.tsx) is deprecated.
// Registration functionality is handled by /register.
// This file now redirects to /register.

import { redirect } from 'next/navigation';

export default function DeprecatedSignUpPage() {
  redirect('/register');
  // It's good practice to return null or a minimal component if redirect might not happen instantaneously,
  // though Next.js redirect is usually effective immediately.
  return null;
}
