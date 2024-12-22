import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline"
// importação da biblioteca clsx
import clsx from "clsx"

/**
 * Componente que exibe o status de uma fatura.
 * A cor de fundo depende do valor do parâmetro `status`:
 * - `pending`: cinza
 * - `paid`: verde
 */
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx("inline-flex items-center rounded-full px-2 py-1 text-xs", {
        // classes condicionais com o clsx (verifica o valor de `status` e aplica as classes de cores de fundo e texto correspondentes)
        "bg-gray-100 text-gray-500": status === "pending",
        "bg-green-500 text-white": status === "paid",
      })}
    >
      {status === "pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  )
}
