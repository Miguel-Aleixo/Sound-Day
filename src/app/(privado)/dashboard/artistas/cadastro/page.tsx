"use client"

import { useState } from 'react';
import { Plus, X, } from "lucide-react";
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { useListarGeneros } from '@/app/hooks/Generos/listarGeneros';
import { Botao } from '@/app/components/Gerais/botao';
import Cookies from 'js-cookie'
import { useListarPaises } from '@/app/hooks/Artistas/listarPaises';

export default function CadastroArtista() {

    const URL = process.env.NEXT_PUBLIC_API_URL
    const token = Cookies.get('token')

    const { generos, refetchListarGeneros } = useListarGeneros();
    const { paises, refetchListarPaises } = useListarPaises();

    const [form, setForm] = useState({
        nome: '',
        genero: 0,
        pais: '',
        descricao: '',
        imagem: null as File | null,
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

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm({
            ...form,
            imagem: file,
        });
    };

    const HandleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nomeAutor", form.nome);
        formData.append("fkTipoMusica", form.genero !== null ? form.genero.toString() : "");
        formData.append("paisAutor", form.pais);
        formData.append("descricaoAutor", form.descricao);
        formData.append("imagemUsuario", form.imagem as Blob);

        try {
            const res = await fetch(`${URL}/autor`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            setForm({
                nome: '',
                genero: 0,
                pais: '',
                descricao: '',
                imagem: null
            })

            if (!res.ok) {
                alert("Erro ao criar artista")
                return;
            } else {
                alert("Artista criado")
            }

        } catch (err) {
            console.log(err)
        }
    }


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
                                    <h1 className="text-2xl font-bold text-white">Cadastrar Artista</h1>
                                    <p className="text-zinc-400">Adicione um novo artista ao catálogo</p>
                                </div>
                                <div className='md:hidden '>
                                    <Botao variant='blue' size='p-2' icon={<X className='h-7 w-7' />} path='/dashboard/artistas' />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={HandleFormSubmit}>
                            <div className="flex flex-col gap-4">

                                {/* Nome */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Nome do Artista
                                    </label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        value={form.nome}
                                        onChange={(e) => handleFormChange(e, 'nome')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Nome do artista'
                                    />
                                </div>

                                {/* Pais */}
                                <div>
                                    <label htmlFor="pais" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Pais do Artista
                                    </label>
                                    <select
                                        id="pais"
                                        value={form.pais}
                                        onChange={(e) => handleFormChange(e, 'pais')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                    >
                                        <option value="">Selecione um pais</option>
                                        {paises.map((pais) => (
                                            <option key={pais.nome} value={pais.nome}>{pais.nome}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Gênero */}
                                <div>
                                    <label htmlFor="genero" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Gênero do Artista
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

                                {/* Imagem */}
                                <div>
                                    <label htmlFor="imagem" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Imagem do Artista
                                    </label>
                                    <input
                                        type="file"
                                        id="imagem"
                                        accept="image/*"
                                        onChange={handleImagemChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Biografia */}
                                <div>
                                    <label htmlFor="descricao" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Biografia do Artista
                                    </label>
                                    <textarea
                                        id="descricao"
                                        value={form.descricao}
                                        onChange={(e) => handleFormChange(e, 'descricao')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Biografia do artista'
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-gray-800">
                                <Botao
                                    text="Cadastrar Artista"
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