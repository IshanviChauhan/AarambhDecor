import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) { // Check if user exists and has a password
          throw new Error('Invalid email or password.');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password.');
        }
        // Return an object that matches the User type defined in next-auth.d.ts
        return { 
          id: user.id.toString(), // Ensure id is a string for NextAuth token
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          phone: user.phone 
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Using JWT for session management
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page path
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // user.id comes from authorize func, should be string
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string | null | undefined;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET, // Uses JWT_SECRET from .env
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
