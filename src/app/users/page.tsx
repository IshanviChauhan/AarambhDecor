
// This page (/src/app/users/page.tsx) is deprecated and no longer used.
// User profile functionality is at /profile.
// Registration is at /register.
// Sign-in is at /signin.
// This file can be safely deleted or kept as a redirect if absolutely necessary,
// but it's better to remove dead code.

import { redirect } from 'next/navigation';

export default function DeprecatedUsersPage() {
  // Redirect to the homepage or another relevant page
  redirect('/'); 
  // Or return null if you prefer not to redirect and just want it to be a dead end
  // return null; 
}
