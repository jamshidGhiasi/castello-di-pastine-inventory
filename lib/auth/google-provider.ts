import type { User, JWT } from "next-auth"

export const GOOGLE_PROVIDER_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/spreadsheets'
];

export interface JWTWithGoogleOAuth extends JWT {
  user?: User
  error?: string
  accessTokenExpires: number
  accessToken?: JWT['access_token']
}
