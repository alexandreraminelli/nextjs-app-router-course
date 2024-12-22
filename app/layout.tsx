// importação do CSS global
import "@/app/ui/global.css"

/**
 * Componente de nível superior da aplicação.
 * @author Next.js
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
