import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ Added "/" to the array to make the landing page public
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isOrgRoute = createRouteMatcher(["/orgs(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // ✅ Redirect logged-in users away from landing page
  if (req.nextUrl.pathname === "/" && userId) {
    if (!orgId) {
      return NextResponse.redirect(new URL("/orgs", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url)); // or your main app route
  }

  // 1. Public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 2. Not logged in → force sign in
  if (!userId) {
    await auth.protect();
  }

  // 3. Allow org page if no org
  if (isOrgRoute(req) && !orgId) {
    return NextResponse.next();
  }

  // 4. Logged in but no org → redirect
  if (userId && !orgId) {
    return NextResponse.redirect(new URL("/orgs", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};