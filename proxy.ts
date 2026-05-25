import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const { token } = req.nextauth;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && token?.role !== "admin") {
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
