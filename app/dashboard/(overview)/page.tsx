import CardWrapper from "@/app/ui/dashboard/cards"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import { lusitana } from "@/app/ui/fonts"
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from "@/app/ui/skeletons" // componentes de skeleton
import { Suspense } from "react" // streaming de componente

/**
 * Página de dashboard.
 *
 * Componente assíncrono (`async`): permite usar `await` para buscar dados.
 *
 * @author Alexandre Raminelli
 */
export default async function Page() {
  // retorno do componente
  return (
    <main>
      {/* Título */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      {/* Lista de cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cards */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Gráfico de receitas */}
        <Suspense
          fallback={<RevenueChartSkeleton />} // skeleton enquanto componente filho ainda não foi carregado
        >
          {/* Gráfico quando os dados forem carregados */}
          <RevenueChart />
        </Suspense>
        {/* Lista das faturas mais recentes */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          {/* Componente com renderização pronta */}
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}
