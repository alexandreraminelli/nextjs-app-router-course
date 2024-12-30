"use client" // componente cliente

import { useEffect } from "react"

/** Interface do componente `Error`. */
interface ErrorProps {
  /** Instância nativa do objeto `Error` do JavaScript. */
  error: Error & { digest?: string }
  /** Função que redefine o limite de erro. Quando executada, a função tentará renderizar novamente o segmento de rota. */
  reset: () => void
}
/**
 * UI de fallback para exibir os erros pro usuário.
 */
export default function Error({ error, reset }: ErrorProps) {
  // Registre o erro em um serviço de relatório de erros
  useEffect(() => {
    console.error(error)
  }, [error])

  // retorno do componente
  return (
    <main className="flex h-full flex-col items-center justify-center">
      {/* Título */}
      <h2 className="text-center">Something went wrong!</h2>
      {/* Botão */}
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" // estilo
        onClick={() => reset()} // Tentar recuperar tentando renderizar novamente a rota das faturas
      >
        Try again
      </button>
    </main>
  )
}
