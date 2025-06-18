import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware function can be empty for basic protection
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow access to login page
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        
        // For admin routes, require admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }
        
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}