import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/jwt";

const protectedRoutes = ["/"];
const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookiesKey = req.cookies.get("access_token")?.value;

  const isAuth = await decrypt(cookiesKey).then((res) => {
    return !!res?.userId
  }) || false;

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
  }

  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}