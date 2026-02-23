import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

const hasEnv = (v?: string) => typeof v === "string" && v.length > 0;

export const auth = betterAuth({
    basePath: "/api/auth",
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(/* data, request */) {
            // TODO: send email with reset link (e.g. Resend, SendGrid)
        },
    },
    socialProviders: {
        ...(hasEnv(process.env.GOOGLE_CLIENT_ID) && hasEnv(process.env.GOOGLE_CLIENT_SECRET)
            ? {
                google: {
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                },
            }
            : {}),
        ...(hasEnv(process.env.APPLE_CLIENT_ID) && hasEnv(process.env.APPLE_CLIENT_SECRET)
            ? {
                apple: {
                    clientId: process.env.APPLE_CLIENT_ID!,
                    clientSecret: process.env.APPLE_CLIENT_SECRET!,
                },
            }
            : {}),
    },
    plugins: [nextCookies()],
    session: {
        cookieCache: {
            enabled: true,
        },
    },
    database: new Pool({
        connectionString: process.env.DATABASE_URL!,
    }),
});
