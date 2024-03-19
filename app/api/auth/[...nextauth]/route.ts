import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //...add more providers here
  ],

  session: async function ({
    session,
  }: {
    session: { user: { email: string } };
  }) {
    const sessionUser = await User.findOne({ email: session.user.email });
  },

  signIn: async function ({
    profile,
  }: {
    profile: { email: string; name: string; picture: string };
  }) {
    try {
      await connectToDB();

      //check if a user already exist
      const userExists = await User.findOne({ email: profile.email });

      //if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
