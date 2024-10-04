import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";



export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({

            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                } else {
                    throw new Error("Invalid credentials");
                }
            },
        }),


    ],
    // debug: true, // Add this line to enable detailed logging
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})