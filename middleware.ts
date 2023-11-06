import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from 'next/server'

function BasicAuthMiddleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  // Check if the basicAuth header is present
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === process.env.BASIC_AUTH_USERNAME && pwd === process.env.BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  } else {
    // Redirect user to set the basic auth header via api route
    url.pathname = '/api/basic-auth'
    return NextResponse.rewrite(url)
  }
}

/**
 * Wrap the BasicAuthMiddleware with withAuth and only invoke it when we're not in the admin page
 */
export const middleware = withAuth(BasicAuthMiddleware, {
  callbacks: {
    authorized: async ({ token, req }) => {
      const { pathname } = req.nextUrl
      const isAdmin = pathname.startsWith('/admin')

      /**
       * BasicAuthMiddleware will only be called if this callback returns true.
       * Authorized the user if not admin page so that we can run the basic auth middleware.
       */
      if (!isAdmin) return true

      // If we're in the admin routes, then we need to check if the user is authenticated
      const hasToken = Boolean(token)
      return hasToken
    }
  },
})
