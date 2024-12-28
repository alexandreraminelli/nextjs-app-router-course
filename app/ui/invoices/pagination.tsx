"use client" // componente cliente

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline" // ícones de seta
import clsx from "clsx" // classes CSS condicionais
import Link from "next/link"
import { generatePagination } from "@/app/lib/utils"
import {
  usePathname, // obter URL atual
  useSearchParams, // obter parâmetros de pesquisa
} from "next/navigation"

/**
 * Componente de paginação.
 *
 * @param param0
 * @returns
 *
 * @author Next.js
 */
export default function Pagination({ totalPages }: { totalPages: number }) {
  /* Variáveis de pesquisa */
  /** URL atual. */
  const pathname = usePathname()
  /** Parâmetros de pesquisa. */
  const searchParams = useSearchParams()
  /** Página atual. */
  const currentPage = Number(searchParams.get("page")) || 1

  const allPages = generatePagination(currentPage, totalPages)

  /**
   * Função que cria e atualiza a URL da página.
   */
  const createPageURL = (pageNumber: number | string) => {
    /** Instância dos parâmetros de pesquisa atuais. */
    const params = new URLSearchParams(searchParams)
    // Atualiza parâmetro "página" para o número da página fornecido
    params.set("page", pageNumber.toString())
    // retornar URL com os parâmetros
    return `${pathname}?${params.toString()}`
  }

  // retorno do componente
  return (
    <>
      {/*  NOTE: Uncomment this code in Chapter 11 */}

      <div className="inline-flex">
        <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined

            if (index === 0) position = "first"
            if (index === allPages.length - 1) position = "last"
            if (allPages.length === 1) position = "single"
            if (page === "...") position = "middle"

            return <PaginationNumber key={page} href={createPageURL(page)} page={page} position={position} isActive={currentPage === page} />
          })}
        </div>

        <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
      </div>
    </>
  )
}

function PaginationNumber({ page, href, isActive, position }: { page: number | string; href: string; position?: "first" | "last" | "middle" | "single"; isActive: boolean }) {
  const className = clsx("flex h-10 w-10 items-center justify-center text-sm border", {
    "rounded-l-md": position === "first" || position === "single",
    "rounded-r-md": position === "last" || position === "single",
    "z-10 bg-blue-600 border-blue-600 text-white": isActive,
    "hover:bg-gray-100": !isActive && position !== "middle",
    "text-gray-300": position === "middle",
  })

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({ href, direction, isDisabled }: { href: string; direction: "left" | "right"; isDisabled?: boolean }) {
  const className = clsx("flex h-10 w-10 items-center justify-center rounded-md border", {
    "pointer-events-none text-gray-300": isDisabled,
    "hover:bg-gray-100": !isDisabled,
    "mr-2 md:mr-4": direction === "left",
    "ml-2 md:ml-4": direction === "right",
  })

  const icon = direction === "left" ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
