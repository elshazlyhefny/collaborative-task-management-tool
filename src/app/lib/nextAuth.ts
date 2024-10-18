import { type AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter }  from "@auth/prisma-adapter"
import prisma from "@/app/utils/connect";
import { UserWithId } from "@/app/lib/user";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {   
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }
        })
        // ...add more providers here
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        session({ session, token }) {
            if (token.id) {
                session.user = {
                    ...session.user,
                    id: token.id
                } as UserWithId & { id: string };
            }
            return session;
        }
    }

}