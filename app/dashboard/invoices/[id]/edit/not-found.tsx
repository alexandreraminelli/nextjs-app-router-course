import Link from "next/link"
import { FaceFrownIcon } from "@heroicons/react/24/outline" // ícone

/** Mensagem de fatura não encontrada (404). */
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      {/* Ícone */}
      <FaceFrownIcon className="w-10 text-gray-400" />
      {/* Título */}
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      {/* Texto */}
      <p>Could not find the requested invoice.</p>
      {/* Link para voltar pra lista de faturas */}
      <Link
        href="/dashboard/invoices" // URL
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  )
}
