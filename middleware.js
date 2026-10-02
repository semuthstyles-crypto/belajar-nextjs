import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Latihan 1. Logger (hanya untuk request ke /api/...)
  if (pathname.startsWith("/api/")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // Latihan 3. Maintenance Mode (semua halaman kecuali /maintenance)
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Latihan 2. Auth Guard (hanya untuk halaman /favorites)
  if (pathname === "/favorites" || pathname.startsWith("/favorites/")) {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // semua path, kecuali file internal Next.js
};