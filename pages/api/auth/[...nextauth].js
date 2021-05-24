import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/db";
import bcrypt from "bcrypt";

export default (req, res) =>
  NextAuth(req, res, {
    site: process.env.NEXTAUTH_URL,
    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.AUTH_SECRET,
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
      secret: process.env.JWT_SECRET,
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
      Providers.Email({
        server: `smtp://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}:587`,
        from: process.env.SMTP_FROM,
      }),
    ],
  });
