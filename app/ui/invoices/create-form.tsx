"use client"

import { CustomerField } from "@/app/lib/definitions"
import Link from "next/link" // componente do <Link>
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline" // ícones
import { Button } from "@/app/ui/button" // componente do botão
import { createInvoice, State } from "@/app/lib/actions"
import { useActionState } from "react"

export default function Form({ customers }: { customers: CustomerField[] }) {
  /** Objeto de estado inicial */
  const initialState: State = { message: null, errors: {} }
  //
  const [state, formAction] = useActionState(createInvoice, initialState)

  // retorno do componente
  return (
    <form
      action={formAction} // Server Action
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue="" // valor padrão
              aria-describedby="customer-error" // relação entre o elemento e o container da msg de erro (usando o ID)
              // Estilos:
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {/* Msg de erro de cliente */}
          <div
            id="customer-error" // ID usado no `aria-describedby`
            aria-live="polite" // informar ao leitor de tela quando o erro na div é atualizado
            aria-atomic="true"
          >
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                aria-describedby="amount-error" // relação entre o elemento e o container da msg de erro (usando o ID)
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {/* Msg de erro de valor */}
            <div
              id="amount-error" // ID usado no `aria-describedby`
              aria-live="polite" // informar ao leitor de tela quando o erro na div é atualizado
              aria-atomic="true"
            >
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p key={error} className="text-red-500 text-sm">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Set the invoice status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div
              className="flex gap-4"
              aria-describedby="status-error" // relação entre o elemento e o container da msg de erro (usando o ID)
            >
              <div className="flex items-center">
                <input id="pending" name="status" type="radio" value="pending" className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                <label htmlFor="pending" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="paid" name="status" type="radio" value="paid" className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                <label htmlFor="paid" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {/* Msg de erro de status */}
          <div
            id="status-error" // ID usado no `aria-describedby`
            aria-live="polite" // informar ao leitor de tela quando o erro na div é atualizado
            aria-atomic="true"
          >
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  )
}
