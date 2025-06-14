import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Check if the user's role is not 'ADMIN'
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      // Redirect to login page if not authorized, or to a custom unauthorized page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if a token exists (user is logged in) AND the role is 'ADMIN'
        // This callback runs *before* the middleware function above,
        // effectively handling the authentication check first.
        return token?.role === "ADMIN";
      },
    },
    // Specify the pages where NextAuth should handle authentication redirects
    pages: {
      signIn: "/login", // Redirects to /login if not authenticated
    },
  }
);

// Define the paths where this middleware should run
export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to /admin and all its sub-paths
}; 