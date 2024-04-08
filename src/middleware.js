import { NextResponse } from "next/server";

export default function middleware(req) {
  const { origin, pathname } = req.nextUrl;
  const verify = req.cookies.get("userInfo");

  // if (pathname === "/signup" || pathname === "/login") {
  //   return NextResponse.next();
  // }

  // if (!verify && pathname === "/") {
  //   return NextResponse.redirect(new URL("/login", origin));
  // }

  // if (!verify) {
  //   return NextResponse.redirect(new URL("/login", origin));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)(.+)"],
};
