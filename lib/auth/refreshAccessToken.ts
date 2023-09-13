import { JWT } from "next-auth/jwt";

/**
 * Takes an existing token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property.
 */
const refreshAccessToken = async (currentJwtToken: JWT) => {
  try {
    /**
     * Construct the url to get a new access token
     * https://developers.google.com/identity/protocols/oauth2/web-server#offline
     */
    const getGoogleOAuth2TokenUrl =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: currentJwtToken.refreshToken as string,
      })

    // Request a new access token from refresh token
    const response = await fetch(getGoogleOAuth2TokenUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    })
    const refreshedTokens = await response.json()

    // Handle degenerate case
    if (!response.ok) throw refreshedTokens

    return {
      ...currentJwtToken,

      /**
       * Set `access_token` back to the response, because
       * NextAuth's GoogleProvider listens to `access_token` internally.
       * Without this line, it's not going to work.
       */
      access_token: refreshedTokens.access_token,
      accessToken: refreshedTokens.access_token,

      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? currentJwtToken.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.error(error)
    return { ...currentJwtToken, error: 'RefreshAccessTokenError' }
  }
};

export default refreshAccessToken
