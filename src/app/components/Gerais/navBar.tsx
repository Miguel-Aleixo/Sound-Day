"use client"

import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "./dropDown";
import { FaArrowLeft } from "react-icons/fa";
import { Botao } from "./botao";

export function NavBar() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <nav className='flex bg-zinc-900/80 backdrop-blur-sm p-1 justify-end items-center border-b border-gray-800 fixed w-full z-50'>
            {pathname.startsWith('/perfil') || pathname.startsWith('/musica_do_dia') ? (
                <div>
                    {pathname.startsWith('/perfil') ? (
                        <div className="w-full py-4 px-6 md:px-30">
                            <FaArrowLeft
                                onClick={() => router.back()}
                                className="text-blue-400 w-7 h-7 cursor-pointer" />
                        </div>
                    ) : (
                        <div className="w-full py-4 px-2 md:px-10">
                            <Botao variant="blue" type="button" path="/musicas" size="py-2 px-4" text="Mais músicas" />
                        </div>
                    )}
                </div>
            ) : (
                <Dropdown />
            )}
        </nav>
    )
}