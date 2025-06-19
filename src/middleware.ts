
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated');
  const isAuthenticated = isAuthenticatedCookie?.value === 'true';

  const authRoutes = ['/signin', '/register'];
  // Routes that require authentication
  const protectedRoutes = ['/profile', '/add-product']; 

  if (isAuthenticated) {
    // If authenticated and trying to access /signin or /register, redirect to profile
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  } else {
    // If not authenticated and trying to access a protected route, redirect to signin
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Allow request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to these specific paths and their sub-paths
    '/profile/:path*',
    '/profile', // ensure /profile itself is matched
    '/add-product/:path*',
    '/add-product', // ensure /add-product itself is matched
    '/signin',
    '/register',
  ],
};
