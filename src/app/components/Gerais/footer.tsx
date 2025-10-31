import { Mail, Phone } from "lucide-react";
import { RedesSociais } from "./redesSociais";

export function Footer() {
    return (
        <footer className="flex bg-black/95 text-gray-400 px-6 py-12">
            <div className="max-w-7xl px-8 w-full mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:text-left md:items-start items-center text-center gap-8 mb-8">
                    <div>
                        <div className="flex items-center md:justify-start justify-center gap-2 mb-4">
                            <h3 className="text-white font-bold text-xl">Sound Day</h3>
                        </div>
                        <p className="text-gray-400 max-w-xs">
                            Sua dose diária de música boa. Trechos selecionados para inspirar, emocionar e marcar momentos.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Links rápidos</h4>
                        <ul className="space-y-3">
                            <li><a className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Início</a></li>
                            <li><a className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Músicas</a></li>
                            <li><a className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Contato</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex md:justify-start justify-center items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <p>contato@soundday.com</p>
                            </li>
                            <li className="flex md:justify-start justify-center items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <p>(11) 1234-5678</p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Redes sociais</h4>
                        <RedesSociais />
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} SoundDay. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}