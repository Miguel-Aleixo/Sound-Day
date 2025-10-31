"use client"

import { useState } from 'react';
import { X } from "lucide-react";
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { useListarGeneros } from '@/app/hooks/Generos/listarGeneros';
import { useListarArtistas } from '@/app/hooks/Artistas/listarArtistas';
import { Botao } from '@/app/components/Gerais/botao';
import Cookies from 'js-cookie';

export default function CadastroMusica() {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get('token');

    const { artistas, refetchListarArtistas } = useListarArtistas();
    const { generos, refetchListarGeneros } = useListarGeneros();

    const [form, setForm] = useState({
        tituloMusica: '',
        artista: 0,
        genero: 0,
        linkVideo: '',
    });

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        field: string
    ) => {
        const value =
            e.target.type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : e.target.value;
        setForm({
            ...form,
            [field]: value,
        });
    };

    const HandleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch(`${URL}/musica`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    tituloMusica: form.tituloMusica,
                    idAutor: form.artista,
                    idTipoMusica: form.genero,
                    linkVideo: form.linkVideo,
                })
            });

            if (!res.ok) {
                alert("Erro ao criar música");
                return;
            } else {
                alert("Música criada");

                setForm({
                    tituloMusica: '',
                    artista: 0,
                    genero: 0,
                    linkVideo: '',
                });
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className="font-sans text-gray-200 min-h-screen bg-zinc-900 md:bg-zinc-950 flex">

            {/* MenuLateral */}
            <div className='hidden md:flex'>
                <MenuLateral />
            </div>

            {/* Conteúdo */}
            <section className="flex w-full md:ml-64">

                {/* NavBar */}
                <div className='hidden md:flex'>
                    <NavBar />
                </div>

                <div className="w-full my-auto md:my-0 md:px-4 lg:px-8 md:py-16 md:pt-26">
                    {/* Formulário */}
                    <div className="bg-zinc-900 rounded-xl md:border border-gray-800 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div className="flex w-full items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Cadastrar Música</h1>
                                    <p className="text-zinc-400">Adicione uma nova música ao catálogo</p>
                                </div>
                                <div className='md:hidden '>
                                    <Botao variant='blue' size='p-2' icon={<X className='h-7 w-7' />} path='/dashboard/musicas' />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={HandleFormSubmit}>
                            <div className="flex flex-col gap-4">
                                {/* Título */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Título da música
                                    </label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        value={form.tituloMusica}
                                        onChange={(e) => handleFormChange(e, 'tituloMusica')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Título da música'
                                    />
                                </div>

                                {/* Artista */}
                                <div>
                                    <label htmlFor="artista" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Artista/Banda
                                    </label>
                                    <select
                                        id="artista"
                                        value={form.artista}
                                        onChange={(e) => handleFormChange(e, 'artista')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                    >
                                        <option value="">Selecione um artista</option>
                                        {artistas.map((artista) => (
                                            <option key={artista.idAutor} value={artista.idAutor}>{artista.nomeAutor}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Gênero */}
                                <div>
                                    <label htmlFor="genero" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Gênero Musical
                                    </label>
                                    <select
                                        id="genero"
                                        value={form.genero}
                                        onChange={(e) => handleFormChange(e, 'genero')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                    >
                                        <option value="">Selecione um gênero</option>
                                        {generos.map((genero) => (
                                            <option key={genero.idTipoMusica} value={genero.idTipoMusica}>{genero.nomeTipoMusica}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Link do video */}
                                <div>
                                    <label htmlFor="link_video" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Link do video
                                    </label>
                                    <input
                                        type="text"
                                        id="link_video"
                                        value={form.linkVideo}
                                        onChange={(e) => handleFormChange(e, 'linkVideo')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Url do video da música'
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 mt-4 border-t border-gray-800">
                                <Botao
                                    text="Cadastrar Música"
                                    variant="blue"
                                    size="px-6 py-3"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
