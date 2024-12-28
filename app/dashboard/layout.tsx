import SideNav from "@/app/ui/dashboard/sidenav"

// Configurar o PPR na rota
export const experimental_ppr = true

/** Interface dos props de `Layout`. */
interface LayoutProps {
  /** Filho do componente */
  children: React.ReactNode
}
/** Layout da página de dashboard. */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar */}
      <div className="w-full flex-none md:w-64"></div>
      <SideNav />

      {/* Main content */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {/* Filhos */}
        {children}
      </div>
    </div>
  )
}
