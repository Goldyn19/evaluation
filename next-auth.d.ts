import { DefaultSession, DefaultJWT, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      stateCode?: string;
      lastName?: string;
      role?: string | null;
    } & DefaultSession["user"];
  }

  /**
   * Returned by `jwt` callback and received as a prop on the `SessionProvider` React Context
   */
  interface JWT extends DefaultJWT {
    stateCode?: string;
    lastName?: string;
    role?: string | null;
  }

  /**
   * The shape of the user object returned by the adapter.
   */
  interface User extends DefaultUser {
    stateCode: string;
    lastName: string;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * The shape of the user object that is returned from the `jwt` callback
   */
  interface JWT extends DefaultJWT {
    stateCode?: string;
    lastName?: string;
    role?: string | null;
  }
} 