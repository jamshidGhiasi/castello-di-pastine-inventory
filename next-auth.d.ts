import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: User
       
    }
    interface User {
        access_token?: string
    }
    interface Account {}
    interface Profile {}
    interface JWT {
        /** OpenID ID Token */
        access_token?: string 
        idToken?: string
      }

}