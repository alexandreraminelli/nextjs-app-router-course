import AcmeLogo from "@/app/ui/acme-logo" // logo da  Acme
import LoginForm from "@/app/ui/login-form" // formulário de login

/** Página de login. */
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Header */}
        <header className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          {/* Logo */}
          <div className="w-32 text-white md:max-w-36">
            <AcmeLogo />
          </div>
        </header>
        {/* Formulário de login */}
        <LoginForm />
      </div>
    </main>
  )
}
