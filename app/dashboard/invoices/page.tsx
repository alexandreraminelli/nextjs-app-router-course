import { lusitana } from "@/app/ui/fonts" // fonte Lusitana
import { CreateInvoice } from "@/app/ui/invoices/buttons" // botão de criar fatura
import Table from "@/app/ui/invoices/table"
import Pagination from "@/app/ui/invoices/pagination"
import Search from "@/app/ui/search" // barra de pesquisa
import { InvoicesTableSkeleton } from "@/app/ui/skeletons" // skeleton do componente Table
import { Suspense } from "react" // rotas dinâmicas otimizadas
import { fetchInvoicesPages } from "@/app/lib/data"

/** Página de faturas. */
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  /* variáveis para pesquisa */
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  /* variáveis para paginação */
  const totalPages = await fetchInvoicesPages(query)

  // retorno do componente
  return (
    <div className="w-full">
      {/* Cabeçalho */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      {/* Ações rápidas */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Barra de pesquisa */}
        <Search placeholder="Search invoices..." />
        {/* Botão de criar fatura */}
        <CreateInvoice />
      </div>

      {/* Tabela de faturas com resultado da pesquisa */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      {/* Paginação: dividir os resultados em mais de uma página */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
