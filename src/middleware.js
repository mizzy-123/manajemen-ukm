import { NextResponse } from "next/server";

const legacyPrefixes = ["/dashboard"];

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("token");

  if (!isAuthenticated) {
    const redirectionResponse = middlewareGroup({ request, pathname });
    if (redirectionResponse) {
      return redirectionResponse;
    }
  } else if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

function middlewareGroup({ request, pathname }) {
  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null; // Jika tidak ada pengalihan yang diperlukan, kembalikan null.
}
