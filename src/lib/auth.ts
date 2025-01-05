import { eq } from "drizzle-orm";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { comparePasswords } from "./actions";
import { db } from "./db/drizzle";
import { AuthProvider, users } from "./db/schema";
import { getUserByEmail } from "./db/user";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      activeWorkspace: null | {
        id: string;
        name: string;
        slug: string;
      };
    } & DefaultSession["user"];
  }
}

export const auth = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn(params) {
      const { user, account } = params;
      try {
        // Check if user exists
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email as string))
          .limit(1);

        if (!existingUser[0]) {
          console.log("inserting user");
          await db.insert(users).values({
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
            ...(account && {
              authProvider: account?.provider as AuthProvider,
            }),
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt(params) {
      const { token, trigger, session } = params;
      const { data, error } = await getUserByEmail(token?.email as string);
      if (trigger === "update" && session) {
        token.activeWorkspace = session.user?.activeWorkspace;
      }
      token.id = data?.id;
      token.picture = data?.image;

      return token;
    },
    async session(params) {
      const { session, token } = params;
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.picture as string;
        session.user.activeWorkspace = token.activeWorkspace as any;
      }
      return session;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email))
          .limit(1);
        // console.log({ u: user[0] });
        if (!user[0]) {
          throw new Error(`User ${credentials?.email} not found`);
        }
        const passwordMatch = await comparePasswords(
          credentials?.password,
          user[0]?.passwordHash as string
        );
        if (!passwordMatch) {
          throw new Error(`User ${credentials?.email} not macth`);
        }

        return user[0];
      },
    }),
  ],
} satisfies NextAuthOptions;

export const getServerAuthSession = async () => {
  return getServerSession(auth);
};
