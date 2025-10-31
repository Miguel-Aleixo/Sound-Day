'use client'

import { User, ChevronDown, LogOut } from "lucide-react";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { usePathname, useRouter } from "next/navigation";
import { useToken } from "@/app/hooks/Auth/verificarToken";

export function Dropdown() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [style, setStyle] = useState('');
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();
    const token = useToken();
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (pathname?.startsWith('/musicas') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/biblioteca' )) {
            setStyle('md:mr-71 mr-3');
        } else {
            setStyle('');
        }
    }, [pathname]);

    if (!isClient) return null;

    return (
        <>
            {token ? (
                <div className={`relative ${style}`}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 hover:bg-zinc-800 rounded-full p-2 transition-all duration-200 cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-400 mr-[1px]" />
                        </div>
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg border border-gray-800 overflow-hidden z-20">
                            <div className="py-1">
                                <a
                                    onClick={() => {
                                        router.push('/perfil')
                                    }}
                                    className="flex gap-2 items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer">
                                    <User className="h-4 w-4" /> Meu Perfil
                                </a>
                                <a
                                    onClick={() => {
                                        Cookies.remove('token');
                                        router.push('/');
                                    }}
                                    className="flex gap-2 items-center px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition-colors cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4" /> Sair
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative md:mr-71 mr-3">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 hover:bg-zinc-800 rounded-full p-2 transition-all duration-200"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-400 mr-[1px]" />
                        </div>
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg border border-zinc-700 overflow-hidden z-20">
                            <div className="py-1">
                                <a className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                    Entrar
                                </a>
                                <a className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                    Cadastrar
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
