import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, createAccessToken } from "@/lib/access";

export function proxy(request: NextRequest) {
  const secret = process.env.ACCESS_SECRET;
  const password = process.env.ACCESS_PASSWORD;
  if (!secret || !password) return NextResponse.next();
  const valid = request.cookies.get(ACCESS_COOKIE)?.value === createAccessToken(secret);
  if (valid || request.nextUrl.pathname.startsWith("/access")) return NextResponse.next();
  const accessUrl = new URL("/access", request.url);
  return NextResponse.redirect(accessUrl);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"] };

