import Pagination from "@/app/ui/invoices/pagination"
import Search from "@/app/ui/search" // barra de pesquisa
import Table from "@/app/ui/invoices/table"
import { CreateInvoice } from "@/app/ui/invoices/buttons" // botão de criar fatura
import { lusitana } from "@/app/ui/fonts" // fonte Lusitana
import { InvoicesTableSkeleton } from "@/app/ui/skeletons" // skeleton do componente Table
import { Suspense } from "react"

/** Página de faturas. */
export default function Page() {
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

      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}

      <div className="mt-5 flex w-full justify-center">{/* <Pagination totalPages={totalPages} /> */}</div>
    </div>
  )
}
