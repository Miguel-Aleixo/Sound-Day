import { MenuLateral } from "@/app/components/Gerais/menuLateral";
import { Botao } from "../../components/Gerais/botao";
import { Footer } from "../../components/Gerais/footer";
import { Header } from "../../components/Gerais/header";
import { Music } from "lucide-react";

export default function Home() {
  return (
    <main className="font-sans text-white bg-[url('/imagens/1.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen">

      {/* Header */}
      <Header />

      {/* Section */}
      <section className="flex md:items-center pt-12 md:pt-0 min-h-screen relative md:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10 md:py-32 realtive bottom-6 md:bottom-0">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-full text-xs font-semibold tracking-wider">
                NOVA EXPERIÊNCIA MUSICAL
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-blue-400">Descubra</span> um novo som todo dia
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Um refrão marcante, uma batida envolvente ou aquele verso que arrepia.
              No Sound Day você encontra trechos musicais que fazem o seu dia ter trilha sonora.
            </p>

            <div className="hidden md:flex flex-col sm:flex-row gap-4">
              <Botao text="Ouvir agora" icon={<Music />} variant="blueRounded" path="/" size="py-4 px-8" type="button"/>
              <Botao text='Explorar músicas' variant="transparent" path="/musicas" size="py-4 px-8" type="button"/>
            </div>

            <div className="md:hidden flex flex-col sm:flex-row gap-4">
              <Botao text='Explorar músicas' variant="transparent" path="/musicas" size="py-4 px-8" type="button"/>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <Footer />

    </main>
  );
}