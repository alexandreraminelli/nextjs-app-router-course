"use client" // componente cliente

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline" // ícone de pesquisa

/** Componente da caixa de pesquisa.
 * @author Next.js
 */
export default function Search({ placeholder }: { placeholder: string }) {
  /**
   * Função que
   * @param term Termo da pesquisa
   *
   * @author Alexandre Raminelli
   */
  function handleSearch(term: string) {
    console.log(term)
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
