import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const adminPath = ["/dashboard"];
const authenticationPath = ["/login", "/register"];
const checkoutPath = ["/checkout"];
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const isAuthRoute = authenticationPath.includes(pathname);
  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.url));
  if (!isLoggedIn && checkoutPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!isLoggedIn && adminPath.some((path) => pathname.startsWith(path)))
    return NextResponse.redirect(new URL("/login", req.url));
  if (adminPath.some((path) => pathname.startsWith(path))) {
    // Check if the user is logged in and is an admin
    if (!isLoggedIn || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // Continue the request if the user has the correct role
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/checkout"],
};
