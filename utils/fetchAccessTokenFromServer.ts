import {getServerSession} from "next-auth";
import authOptions from "@/lib/auth-options";

/**
 * Fetch next auth access token from RSCs
 */
const fetchAccessTokenFromServer = async () => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.user?.access_token
  return accessToken
}

export default fetchAccessTokenFromServer
