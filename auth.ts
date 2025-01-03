import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials" // provedor de credenciais do NextAuth.js
import { z } from "zod" // validação de email e senha

/**  */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // spreading do objeto `authConfig`
  providers: [
    Credentials({
      async authorize(credentials) {
        /** Validação de credenciais. */
        const parsedCredentials = z
          .object({
            email: z.string().email(), // validar email
            password: z.string().min(6), // validar senha (mínimo de 6 caracteres)
          })
          .safeParse(credentials) // parse seguro
      },
    }),
  ], // provedor de credenciais
})
