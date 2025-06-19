export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/profile/:path*",
    "/add-product/:path*",
    // Add any other routes you want to protect with NextAuth.js middleware
  ] 
};