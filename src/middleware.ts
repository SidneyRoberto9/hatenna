export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/profile"],
  matcher: ["/api/session"],
  //matcher: ["/((?!register|api|login).*)"],
};
