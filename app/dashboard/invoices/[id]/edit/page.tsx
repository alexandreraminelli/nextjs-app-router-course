import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/invoices/edit-form"
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"

/**
 * Página de editar faturas.
 * @author Next.js
 */
export default async function Page(props: { params: Promise<{ id: string }> }) {
  //
  const params = await props.params
  /** ID nos parâmetros que identifica a fatura a ser editada. */
  const id = params.id
  // Buscar fatura específica com base no ID
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id), // obter fatura
    fetchCustomers(), // obter consumidor
  ])

  // retorno do componente
  return (
    <main>
      {/* Breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          { label: "Edit Invoice", href: `/dashboard/invoices/${id}/edit`, active: true },
        ]}
      />

      {/* Formulário de editar fatura */}
      <Form invoice={invoice} customers={customers}></Form>
    </main>
  )
}
