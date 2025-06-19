
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = ['/profile', '/add-product'];
  // Routes that authenticated users should be redirected away from
  const authRoutes = ['/signin', '/register'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthenticatedCookie === 'true') {
    // If authenticated and trying to access signin/register, redirect to profile
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  } else {
    // If not authenticated and trying to access a protected route, redirect to signin
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*', // Matches /profile and any sub-paths like /profile/settings
    '/add-product/:path*', // Matches /add-product and any sub-paths
    '/signin/:path*', // Matches /signin and any sub-paths
    '/register/:path*', // Matches /register and any sub-paths
  ],
};
