"use client";

import { NavBar } from "@/app/components/Gerais/navBar";
import { useListarMusicas } from "@/app/hooks/Musicas/listarMusicas";
import { Star, Share2, Disc, Play } from "lucide-react";

export default function MusicaDoDia() {

    const {musicas, refetchListarMusicas} = useListarMusicas()

    const musicaDoDia = {
        titulo: "Nome da Música",
        artista: "Artista da Música",
        genero: "Pop",
        curtidas: 1245,
        trecho: "Este é um trecho emocionante da música do dia...",
        descricao: "Uma descrição breve sobre por que esta música foi escolhida hoje."
    };

    return (
        <main className="font-sans text-white min-h-screen bg-zinc-950">
            <NavBar />
            {/* Card da Música do Dia */}
            <section className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-2xl bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 hover:border-blue-400/30 transition-all shadow-2xl shadow-blue-400/10">
                    {/* Cabeçalho */}
                    <div className="text-center mb-6">
                        <h1 className="text-blue-400 text-sm font-semibold tracking-widest">MÚSICA DO DIA</h1>
                        <div className="w-16 h-[2px] bg-blue-500 mx-auto my-3"></div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Capa do álbum */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-55 h-55 bg-gradient-to-br from-blue-400/20 to-zinc-800 rounded-lg flex items-center justify-center">
                                <Disc className="w-16 h-16 text-blue-400 animate-spin-slow" />
                            </div>
                        </div>

                        {/* Detalhes da música */}
                        <div className="flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition-colors">
                                        {musicaDoDia.titulo}
                                    </h2>
                                    <p className="text-blue-400 text-lg mt-1">
                                        {musicaDoDia.artista}
                                    </p>
                                </div>
                                <span className="text-sm text-yellow-400 flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-current mt-2 mr-2" />
                                </span>
                            </div>

                            <div className="mb-6">
                                <span className="inline-block bg-blue-400/10 text-blue-400 text-sm px-3 py-1 rounded-full">
                                    {musicaDoDia.genero}
                                </span>
                            </div>

                            {/* Trecho destacado */}
                            <div className="mb-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                <p className="text-zinc-300 italic">"{musicaDoDia.trecho}"</p>
                            </div>

                            {/* Botões */}
                            <div className="flex justify-end gap-3">

                                <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-all">
                                    <Star className="w-5 h-5 hover:text-yellow-500 transition-all" />
                                </button>
                                <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-all">
                                    <Share2 className="w-5 h-5 hover:text-blue-500 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="mt-8 pt-6 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold mb-3 text-center md:text-left">✨ Por que ouvir hoje?</h3>
                        <p className="text-zinc-400 text-center md:text-left">
                            {musicaDoDia.descricao}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}