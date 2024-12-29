import Form from "@/app/ui/invoices/create-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs" // componente que exibe a posição atual pro usuário
import { fetchCustomers } from "@/app/lib/data" // função que obtém os dados dos consumidores

/**
 * Componente da página de criar faturas.
 * @author Next.js
 */
export default async function Page() {
  /**  */
  const customers = await fetchCustomers()

  // retorno do componente
  return (
    <main>
      {/* Caminho pra página */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          { label: "Create Invoice", href: "/dashboard/invoices/create", active: true },
        ]}
      />

      {/* Formulário que adiciona uma fatura */}
      <Form customers={customers} />
    </main>
  )
}
