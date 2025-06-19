import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
    } & DefaultSession["user"]; // keep existing email, name, image
  }

  interface User extends DefaultUser { // User object passed to JWT and Session callbacks
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT { // Token stored in JWT
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  }
}
