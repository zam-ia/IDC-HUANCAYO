import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { isAdminRole } from "@/lib/roles";

export default withAuth(
  function proxy(req) {
    const { token } = req.nextauth;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !isAdminRole(token?.role)) {
      return NextResponse.redirect(new URL("/campus", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/campus/classroom/:path*",
    "/admin/:path*",
    "/cuenta/:path*",
  ],
};
