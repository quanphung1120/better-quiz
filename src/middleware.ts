import { withSupabaseMiddleware } from "./middlewares/supabaseMiddleware";
import { chain } from "./utils/middleware-chain";

const middlewares = [withSupabaseMiddleware];
export default chain(middlewares)



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
