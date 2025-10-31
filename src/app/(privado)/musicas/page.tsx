"use client";

import { Heart, Share2, Disc, SearchIcon } from "lucide-react";
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useListarMusicas } from "@/app/hooks/Musicas/listarMusicas";
import { NavBar } from "@/app/components/Gerais/navBar";

export default function Musicas() {
    const {musicas, refetchListarMusicas} = useListarMusicas()

    return (
        <main className="font-sans text-white min-h-screen bg-zinc-950 flex">
            {/* Menu lateral*/}
            <MenuLateral />

            {/* Conteúdo */}
            <section className="flex flex-col md:ml-64 w-full">

                {/* NavBar */}
                <NavBar />

                <div className="pt-22 pb-27 md:pb-6 md:pt-26 px-4 md:px-8">
                
                    {/* Músicas */}
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-blue-500"></div>
                                <h2 className="text-xl md:text-2xl font-bold">Mais músicas</h2>
                            </div>

                            {/* Filtragem */}
                            <div className="relative w-full md:w-96">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar músicas ou artistas..."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-10 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none"
                                />
                            </div>
                        </div>

                        {/* Carrossel */}
                        <div className="relative">
                            <Carousel opts={{ align: "start", slidesToScroll: "auto" }}>
                                <CarouselContent className="py-2 -ml-4">
                                    {musicas.map(musica => (
                                            <CarouselItem
                                                key={musica.idMusica}
                                                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                            >
                                                <div className="h-full bg-zinc-900 rounded-lg p-5 border border-zinc-800 hover:border-blue-400/30 transition-all hover:-translate-y-1 group">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                                                                {musica.tituloMusica}
                                                            </h3>
                                                            <p className="text-blue-400 text-sm mt-1">
                                                                {musica.nomeAutor}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs text-red-400 flex items-center gap-1 mt-2 mr-2">
                                                            <Heart className="w-3 h-3 fill-current" /> 
                                                        </span>
                                                    </div>

                                                    <div className="mb-4">
                                                        <span className="inline-block bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded">
                                                            {musica.tipoMusica}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="mb-4 p-3 bg-zinc-800/50 rounded border border-zinc-700 group-hover:border-blue-400/30 transition-colors">
                                                            {musica.trechos.map(trecho => (
                                                                <p key={trecho} className="text-zinc-300 italic text-sm">"{trecho}"</p>
                                                            ))}
                                                        </div>

                                                        <div className="flex justify-end gap-2 relative bottom-27">
                                                            <button className="p-2 rounded-full hover:bg-zinc-800 transition-all">
                                                                <Heart className="w-4 h-4 hover:text-red-500 transition-all" />
                                                            </button>
                                                            <button className="p-2 rounded-full hover:bg-zinc-800 transition-all">
                                                                <Share2 className="w-4 h-4 hover:text-blue-500 transition-all" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                </CarouselContent>

                                <CarouselPrevious className="left-0 opacity-0 hover:opacity-100 bg-zinc-900 text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-white ml-2" />
                                <CarouselNext className="right-0 opacity-0 hover:opacity-100 bg-zinc-900 text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-white mr-2" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}