import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/spreadsheets'
];
const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    accessTokenUrl: 'https://oauth2.googleapis.com/token',
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: "code",
                    scope: SCOPES.join(" ")
                },
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user, account, profile, session}) {
            return token
        },
        async session({ session, token }) {
            return session
        }
    }
}
export default authOptions;