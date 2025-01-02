import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// Inicializando o NextAuth.js com o objeto autoConfig e exportando a propriedade auth
export default NextAuth(authConfig).auth

export const config = {
  /** Caminhos específicos pro middleware ser executado. */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
