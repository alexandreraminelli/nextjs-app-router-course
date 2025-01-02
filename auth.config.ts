import type { NextAuthConfig } from "next-auth"

/**
 * Objeto com as opções de configuração do NextAuth.js.
 */
export const authConfig = {
  /** Especificar rotas para páginas personalizadas de login, logout e erro. */
  pages: {
    /** Rota pra página de login. */
    signIn: "/login",
  },
}
