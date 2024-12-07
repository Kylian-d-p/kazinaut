import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { env } from "./lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Nodemailer({
    server: {
      host: env.EMAIL_SERVER_HOST,
      port: env.EMAIL_SERVER_PORT,
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: env.EMAIL_FROM,
  })],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
});
