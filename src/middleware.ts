export { auth as middleware } from "@/utils/auth"
// Protect specific routes
export const config = {
    matcher: ['/dashboard/:path*', '/settings/:path*'], // Protect multiple routes
}
