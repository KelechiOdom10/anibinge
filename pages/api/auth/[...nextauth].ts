import { UserInput } from "./../../../types/index";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/db";
import bcrypt from "bcrypt";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  site: process.env.NEXTAUTH_URL,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: { signIn: "/login" },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email",
          placeholder: "Enter Email Address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: UserInput) {
        const { email, password } = credentials;
        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            throw new Error("User does not exist");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
};
