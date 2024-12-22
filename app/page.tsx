import AcmeLogo from "@/app/ui/acme-logo"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
// importação da fonte Lusitana
import { lusitana } from "@/app/ui/fonts"
// importação do componente que otimiza imagens
import Image from "next/image"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Conteúdo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* Logo */}
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Texto de boas-vindas com fonte Lusitana. */}
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link href="/login" className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Hero Image Desktop */}
          <Image
            src={"/hero-desktop.png"} // URL da imagem (nas pasta `/public`)
            alt="Hero Image" // Texto alternativo
            // Tamanho da imagem
            width={1000}
            height={760}
            // classes CSS
            className="hidden md:block" // visível apenas em telas grandes
          />
          {/* Hero Image Mobile */}
          <Image src={"/hero-mobile.png"} alt="Hero Image" width={560} height={620} className="block md:hidden" />
        </div>
      </div>
    </main>
  )
}
