import { type AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter }  from "@auth/prisma-adapter"
import prisma from "@/app/utils/connect";

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
        
        // ...add more providers here
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;
      
            return session;
          },
    }

}