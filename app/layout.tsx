// importação do CSS global
import "@/app/ui/global.css"
// importação da fonte Inter
import { inter } from "@/app/ui/fonts"

/**
 * Componente de nível superior da aplicação.
 * @author Next.js
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        // aplicação da fonte
        className={`
        ${inter.className} antialiased
        `}
      >
        {children}
      </body>
    </html>
  )
}
