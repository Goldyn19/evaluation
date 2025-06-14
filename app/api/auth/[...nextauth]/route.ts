import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        stateCode: { label: "State Code", type: "text" },
        lastName: { label: "Last Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.stateCode || !credentials?.lastName) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            stateCode: credentials.stateCode,
          },
        });

        if (user && user.lastName.toLowerCase() === credentials.lastName.toLowerCase()) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            stateCode: user.stateCode,
            lastName: user.lastName,
            role: user.role,
          } as User;
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
        token.stateCode = user.stateCode;
        token.lastName = user.lastName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.stateCode = token.stateCode;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 