import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const adminPath = ["/dashboard"];
const authenticationPath = ["/login", "/register"];
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const isAuthRoute = authenticationPath.includes(pathname);

  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.url));

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
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
