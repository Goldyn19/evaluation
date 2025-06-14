import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    stateCode: string;
    lastName: string;
  }

  interface Session {
    user: {
      stateCode: string;
      lastName: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    stateCode: string;
    lastName: string;
  }
} 