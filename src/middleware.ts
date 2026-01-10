// export { auth as middleware } from "@/auth"

// --------------------------------------------
import { auth } from "@/auth";

export default auth((req) => {
  //-- For custom login page redirection
  // if (!req.auth && req.nextUrl.pathname !== "/login") {
  //   const newUrl = new URL("/login", req.nextUrl)
  //   return Response.redirect(newUrl)
  // }

  //--For default login page redirection
  if (!req.auth) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl)

    // Optional but recommended:

    // After login, user returns to the original page
    // signInUrl.searchParams.set("callbackUrl", req.nextUrl.href)

    // Or, redirect to the home page or specific route after login
    signInUrl.searchParams.set("callbackUrl", "/")
    return Response.redirect(signInUrl)
  }
})

export const config = {
  matcher: [
    "/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)",
  ],
}
