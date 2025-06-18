import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User, NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        stateCode: { label: "State Code", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.stateCode || !credentials?.lastName) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { stateCode: credentials.stateCode },
        });

        if (user && user.lastName.toLowerCase() === credentials.lastName.toLowerCase()) {
          const authenticatedUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            stateCode: user.stateCode,
            lastName: user.lastName,
            role: user.role,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any; // temporary cast because User from next-auth may not match your DB schema fully
          return authenticatedUser;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as User;
        token.stateCode = extendedUser.stateCode;
        token.lastName = extendedUser.lastName;
        token.role = extendedUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).stateCode = token.stateCode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).lastName = token.lastName;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
