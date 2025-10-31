"use client"

import { useState } from 'react';
import { Plus, X, } from "lucide-react";
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { Botao } from '@/app/components/Gerais/botao';
import Cookies from 'js-cookie'

export default function CadastroGenero() {
    const URL = process.env.NEXT_PUBLIC_API_URL
    const token = Cookies.get('token')

    const [form, setForm] = useState({
        nome: '',
        descricao: ''
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

            const res = await fetch(`${URL}/tipomusica`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nomeTipoMusica: form.nome,
                    descricaoTipoMusica: form.descricao
                }),


            });
            
            setForm({
                nome: '',
                descricao: ''
            })

            if (!res.ok) {
                alert("Erro ao criar gênero")
                return;
            } else {
                alert("Gênero criado")
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
                                    <h1 className="text-2xl font-bold text-white">Cadastrar Gênero</h1>
                                    <p className="text-zinc-400">Adicione um novo gênero ao catálogo</p>
                                </div>
                                <div className='md:hidden '>
                                    <Botao variant='blue' size='p-2' icon={<X className='h-7 w-7' />} path='/dashboard/generos' />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={HandleFormSubmit}>
                            <div className="flex flex-col gap-4">

                                {/* Nome */}
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Nome do Gênero
                                    </label>
                                    <input
                                        type="text"
                                        id="nome"
                                        value={form.nome}
                                        onChange={(e) => handleFormChange(e, 'nome')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Nome do gênero'
                                    />
                                </div>

                                <div>
                                    <label htmlFor="descricao" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Descrição do Gênero
                                    </label>
                                    <textarea
                                        id="descricao"
                                        value={form.descricao}
                                        onChange={(e) => handleFormChange(e, 'descricao')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                                        required
                                        placeholder='Descição do gênero'
                                    />
                                </div>


                            </div>

                            <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-gray-800">
                                <Botao
                                    text="Cadastrar Gênero"
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