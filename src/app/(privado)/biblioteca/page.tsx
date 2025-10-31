import { MenuLateral } from "@/app/components/Gerais/menuLateral";
import { NavBar } from "@/app/components/Gerais/navBar";

export default function Biblioteca() {
    return (
        <main className="font-sans text-white min-h-screen bg-zinc-950 flex">
            {/* Menu lateral*/}
            <MenuLateral />

            {/* Conteúdo */}
            <section className="flex flex-col md:ml-64 w-full">

                {/* NavBar */}
                <NavBar />


            </section>
        </main>
    )
}