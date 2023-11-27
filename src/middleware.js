import { NextResponse } from "next/server";

const legacyPrefixes = ["/dashboard"];

const admin = ["/dashboard/jadwal-piket", "/dashboard/formulir", "/dashboard/rapat", "/dashboard/data-presensi"];

const anggota = ["/dashboard/piket", "/dashboard/jadwal-rapat", "/dashboard/absen"];

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("token");
  const role = request.cookies.get("role");
  const adminMiddleware = middlewareGroupAdmin({ request, role, pathname });
  const anggotaMiddleware = middlewareGroupAnggota({ request, role, pathname });
  if (!isAuthenticated) {
    const redirectionResponse = middlewareGroup({ request, pathname });
    if (redirectionResponse) {
      return redirectionResponse;
    }
  } else if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (adminMiddleware) {
    return adminMiddleware;
  }

  if (anggotaMiddleware) {
    return anggotaMiddleware;
  }

  return NextResponse.next();
}

function middlewareGroup({ request, pathname }) {
  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null; // Jika tidak ada pengalihan yang diperlukan, kembalikan null.
}

function middlewareGroupAdmin({ request, role, pathname }) {
  if (admin.some((prefix) => pathname.startsWith(prefix)) && role.value != 2) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return null;
}

function middlewareGroupAnggota({ request, role, pathname }) {
  if (anggota.some((prefix) => pathname.startsWith(prefix)) && role.value != 3) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return null;
}
