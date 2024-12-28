import {
  fetchCardData,
  fetchLatestInvoices, // função que obtém as faturas mais recentes no db
} from "@/app/lib/data"
import { Card } from "@/app/ui/dashboard/cards"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import { lusitana } from "@/app/ui/fonts"
import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // skeleton do gráfico de receitas
import { Suspense } from "react"; // streaming de componente

/**
 * Página de dashboard.
 *
 * Componente assíncrono (`async`): permite usar `await` para buscar dados.
 *
 * @author Alexandre Raminelli
 */
export default async function Page() {
  /** Dados das faturas mais recentes. */
  const latestInvoices = await fetchLatestInvoices()
  // Dados dos cards | obtidos via desestruturação
  const {
    /** Total de faturas pagas. */
    totalPaidInvoices,
    /** Total de faturas pendentes. */
    totalPendingInvoices,
    /** Quantidade de faturas. */
    numberOfInvoices,
    /** Quantidade de consumidores */
    numberOfCustomers,
  } = await fetchCardData()

  // retorno do componente
  return (
    <main>
      {/* Título */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
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
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}
