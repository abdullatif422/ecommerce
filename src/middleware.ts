import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // or check for a session
  console.log("🚀 ~ middleware ~ token:", token);
  const url = request.nextUrl;

  // Define paths that require authentication
  const authRoutes = ["/home/dashboard", "/home/invoice", "/home/orders"];

  // Check if the user is trying to access an authorized route without a token
  if (authRoutes.includes(url.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the user is trying to access an unauthorized route (like login) with a token
  if (url.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/home/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home/:path*", "/login"],
};
