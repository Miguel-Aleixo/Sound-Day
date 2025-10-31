"use client"

import { useState } from 'react';
import { X } from "lucide-react";
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { Botao } from '@/app/components/Gerais/botao';
import Cookies from 'js-cookie';
import { useListarMusicas } from '@/app/hooks/Musicas/listarMusicas';

export default function CadastroTrecho() {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get('token');

    const { musicas, refetchListarMusicas } = useListarMusicas()

    const [form, setForm] = useState({
        letraTrecho: '',
        idsMusica: 0,
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
            const res = await fetch(`${URL}/trecho-musica`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    letraTrecho: form.letraTrecho,
                    idsMusica: [form.idsMusica]
                })
            });

            if (!res.ok) {
                alert("Erro ao criar trecho");
                return;
            } else {
                alert("Trecho criada");

                setForm({
                    letraTrecho: '',
                    idsMusica: 0,
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
                                    <h1 className="text-2xl font-bold text-white">Cadastrar Trecho</h1>
                                    <p className="text-zinc-400">Adicione uma novo trecho ao catálogo</p>
                                </div>
                                <div className='md:hidden '>
                                    <Botao variant='blue' size='p-2' icon={<X className='h-7 w-7' />} path='/dashboard/musicas' />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={HandleFormSubmit}>
                            <div className="flex flex-col gap-4">
                                {/* Trecho */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Trecho da música
                                    </label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        value={form.letraTrecho}
                                        onChange={(e) => handleFormChange(e, 'letraTrecho')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Trecho da música'
                                    />
                                </div>

                                {/* Musica */}
                                <div>
                                    <label htmlFor="musica" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Música
                                    </label>
                                    <select
                                        id="musica"
                                        value={form.idsMusica}
                                        onChange={(e) => handleFormChange(e, 'idsMusica')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                    >
                                        <option value="">Selecione uma música</option>
                                        {musicas.map((musica) => (
                                            <option key={musica.idMusica} value={musica.idMusica}>{musica.tituloMusica}</option>
                                        ))}
                                    </select>
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
