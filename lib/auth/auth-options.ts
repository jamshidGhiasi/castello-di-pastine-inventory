import type { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import refreshAccessToken from "@/lib/auth/refreshAccessToken"
import { GOOGLE_PROVIDER_SCOPES, JWTWithGoogleOAuth } from "@/lib/auth/google-provider"

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: "code",
          scope: GOOGLE_PROVIDER_SCOPES.join(" ")
        },
      }
    })
  ],
  callbacks: {
    async jwt(props) {
      const { token, user, account } = props

      // Initial sign in
      if (account && user) {
        // Return our constructed token object with Google OAuth info
        return {
          access_token: account.access_token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account as unknown as { expires_in: number }).expires_in * 1000,
          refreshToken: account.refresh_token,
          user
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token as unknown as JWTWithGoogleOAuth).accessTokenExpires) return token

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session(props) {
      const { session, token } = props
      const nextSession = {
        ...session,
        user: token.user as User,
        access_token: token.access_token,
        accessToken: token.accessToken,
        error: token.error,
      }
      return nextSession
    }
  },
}

export default authOptions;
