import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      allowedAttempts: 5,
      expiresIn: 300,
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "noreply <noreply@edutoolkit.tech>",
          to: [email],
          subject: "Your verification code",
          react: EmailTemplate({ pin: otp }),
        });
      },
    }),
  ],
});
