// importação da fonte Inter e Lusitana do Google Fonts
import { Inter, Lusitana } from "next/font/google"

// especificar sub-conjunto da fonte
/** Fonte Inter. */
export const inter = Inter({
  subsets: ["latin"], // caracteres
})
/** Fonte Lusitana. */
export const lusitana = Lusitana({
  weight: ["400", "700"], // pesos da fonte
  subsets: ["latin"], // caracteres
})
