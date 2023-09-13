import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth/auth-options"
import { JWTWithGoogleOAuth } from "@/lib/auth/google-provider"

/**
 * Fetch next auth access token from RSCs
 */
const fetchAccessTokenFromServer = async () => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.user?.access_token || (session as unknown as JWTWithGoogleOAuth)?.accessToken
  return accessToken
}

export default fetchAccessTokenFromServer
