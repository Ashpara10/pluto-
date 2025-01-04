import { eq } from "drizzle-orm";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { comparePasswords, register } from "./actions";
import { db } from "./db/drizzle";
import { users } from "./db/schema";
import { getUserByEmail } from "./db/user";
import { generatePassword } from "./utils";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
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
    async signIn({ user, profile }) {
      const { data, error } = await getUserByEmail(
        profile?.email || (user?.email as string)
      );
      // console.log({ data, error });
      if (!data) {
        const { data: newUser, error } = await register({
          email: user.email as string,
          name: user.name as string,

          password: generatePassword(user.email as string),
        });
        // console.log({ newUser, error });
        if (error) {
          return false;
        }
        if (!newUser) {
          return false;
        }
        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const u = await getUserByEmail(user.email!);
        if (!u.data) {
          return token;
        }
        token.id = u.data.id;
        token.picture = u.data.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
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
