"use client" // componente cliente

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline" // ícone de pesquisa
import { useSearchParams } from "next/navigation"

/** Componente da caixa de pesquisa.
 * @author Next.js
 */
export default function Search({ placeholder }: { placeholder: string }) {
  /**  */
  const searchParams = useSearchParams()

  /**
   * Função que captura a entrada da caixa de pesquisa e atribui eles ao parâmetros de pesquisa.
   * @param term Termo da pesquisa
   *
   * @author Alexandre Raminelli
   */
  function handleSearch(term: string) {
    /** Parâmetros de pesquisa. Uma instância de `URLSearchParams`. */
    const params = new URLSearchParams(searchParams)

    if (term) {
      /* se entrada tiver texto */
      // definir a entrada como parâmetro de pesquisa
      params.set("query", term)
    } else {
      /* se entrada estiver vazia */
      // apagar parâmetros
      params.delete("query")
    }
  }

  // retorno do componente
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* Rótulo (para SEO) */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* Entrada da Pesquisa */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" // classes CSS
        placeholder={placeholder} // texto de placeholder
        // Quando ocorrer uma mudança no elemento:
        onChange={(e) => {
          handleSearch(e.target.value) // passar texto do input como parâmetro na função `handleSearch`
        }}
      />

      {/* Ícone de pesquisa */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
