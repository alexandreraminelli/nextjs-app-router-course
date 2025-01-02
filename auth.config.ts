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
  callbacks: {
    // Verificar se a solicitação está autorizada a acessar a página
    authorized({
      auth, // sessão do usuário
      request: { nextUrl }, // solicitação
    }) {
      /** Se usuário está logado (realizou a autenticação). */
      const isLoggedIn = !!auth?.user
      /** Se usuário está nas páginas de dashboard. */
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")

      if (isOnDashboard) {
        /* Se estiver nas páginas de dashboard. */
        // Se estiver logado
        if (isLoggedIn) return true
        // Se não estiver logado
        return false // Redireciona para a página de login
      } else if (isLoggedIn) {
        /* não estiver na página de dashboard e estiver logado */
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
  },
  // Array das diferentes opções de login:
  providers: [],
} satisfies NextAuthConfig
