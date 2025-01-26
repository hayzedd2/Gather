import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prismaDb} from "./db"
export const auth = betterAuth({
  database: prismaAdapter(prismaDb, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn:true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
