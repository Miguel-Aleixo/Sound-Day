import { useToken } from "@/app/hooks/Auth/verificarToken";
import { Botao } from "./botao";
import { Dropdown } from "./dropDown";

export function Header() {
  const token = useToken()

  return (
      <header className="hidden md:block fixed w-full z-35 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <nav className="flex justify-between items-center py-4 md:py-6 px-6 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">

            <h1 className="text-3xl font-bold tracking-tight text-blue-400">
              Sound <span>Day</span>
            </h1>
          </div>

          {token ? (
            <Dropdown />
          ) : (
            <div className="flex gap-3">
              <Botao text="Cadastrar" variant="transparent" path="/cadastro" size="py-3 px-4" type="button" />
              <Botao text="Entrar" variant="blueRounded" path="/login" size="py-3 px-4" type="button" />
            </div>
          )}

        </nav>
      </header>
  )
}