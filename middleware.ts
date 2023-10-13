export { default } from "next-auth/middleware"
import type { NextRequest } from 'next/server'


export const config = { matcher: ["/admin"] }
