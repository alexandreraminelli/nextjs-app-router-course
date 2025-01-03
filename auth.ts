import type { User } from "@/app/lib/definitions" // tipo de dado de Usuário
import { sql } from "@vercel/postgres" // banco de dados
import bcrypt from "bcrypt" // criptografia de senha
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials" // provedor de credenciais do NextAuth.js
import { z } from "zod" // validação de email e senha
import { authConfig } from "./auth.config"

/** Consultar usuário no banco de dados. */
async function getUser(email: string): Promise<User | undefined> {
  try {
    /** Buscar usuário no banco de dados. */
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    return user.rows[0] // Retornar usuário
  } catch (error) {
    console.error("Failed to fetch user:", error) // msg de erro no console
    throw new Error("Failed to fetch user.")
  }
}

/**  */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // spreading do objeto `authConfig`
  providers: [
    // provedor de credenciais
    Credentials({
      async authorize(credentials) {
        /** Validação de credenciais. */
        const parsedCredentials = z
          .object({
            email: z.string().email(), // validar email
            password: z.string().min(6), // validar senha (mínimo de 6 caracteres)
          })
          .safeParse(credentials) // parse seguro

        if (parsedCredentials.success) {
          /* Se as credenciais forem válidas */
          const { email, password } = parsedCredentials.data // desestruturar credenciais
          /** Consultar usuário no db. */
          const user = await getUser(email)
          // Se o usuário não existir, retornar `null`
          if (!user) return null

          /** Verificar se hash da senha corresponde. */
          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user // Se as credenciais forem válidas, retornar usuário
        }
        // Se as credenciais não forem válidas,
        console.log("Invalid credentials")
        return null
      },
    }),
  ],
})
