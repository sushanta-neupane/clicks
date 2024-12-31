// in auth.ts

import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const validUsername = process.env.NEXTAUTH_USERNAME;
        const validPassword = process.env.NEXTAUTH_PASSWORD;
        if (!credentials) {
          return null;
        }
        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          return {
            id: '1',
            name: validUsername,
            email: `${validUsername}@gmail.com`,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
