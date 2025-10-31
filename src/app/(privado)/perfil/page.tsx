"use client"

// Hooks
import { useState } from "react";
import { useListarUsuarios } from "@/app/hooks/Usuarios/listarUsuarios";
import { useToken } from "@/app/hooks/Auth/verificarToken";

// Icones
import { HiOutlineMusicalNote, HiOutlineHeart } from "react-icons/hi2";
import { User } from "lucide-react";

// Componenetes
import { Botao } from "@/app/components/Gerais/botao";
import { Modal } from "@/app/components/Dashboard/Musicas/modal";
import { NavBar } from "@/app/components/Gerais/navBar";

export default function PerfilUsuario() {

    // Modal
    const [modal, setModal] = useState<null | 'editar-perfil'>(null)

    // Listagem de usuarios
    const usuarios = useListarUsuarios()

    // Token
    const token = useToken()

    const editarPerfil = (id: string, nome: string, email: string, senha: string) => {

        setForm({
            id: id,
            nome: nome,
            email: email,
            senha: senha,
        });

        setModal('editar-perfil')
    }

    const handleSubmit = () => {

    }

    const [form, setForm] = useState({
        id: '',
        nome: '',
        email: '',
        senha: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => {
        setForm({ ...form, [campo]: e.target.value });
    };


    const musicasFavoritas = [
        { id: 1, titulo: "Bohemian Rhapsody", artista: "Queen", duracao: "5:55" },
        { id: 2, titulo: "Imagine", artista: "John Lennon", duracao: "3:04" },
        { id: 3, titulo: "Billie Jean", artista: "Michael Jackson", duracao: "4:54" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white pb-20">
            <NavBar />

            {/* Cabeçalho */}
            <div className="h-64 border-b border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent"></div>

                <div className="w-full mx-auto px-4 md:px-28 relative z-10 h-full flex pb-8">
                    {usuarios.filter(usuario => usuario.emailUsuario === token?.sub).map(usuario => (
                        <div key={usuario.idUsuario} className="flex flex-col md:flex-row md:items-end md:justify-between justify-end gap-6  w-full">
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                                    <User className="h-10 w-10 text-blue-400 ml-[1px]" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4">
                                        <h1 className="text-3xl font-bold">{usuario.nomeUsuario}</h1>
                                    </div>

                                    <p className="text-zinc-400 mt-1">{usuario.emailUsuario}</p>
                                </div>
                            </div>

                            <div>
                                <Botao
                                    text="Editar Perfil"
                                    variant="blue"
                                    size="py-2 px-6"
                                    onclick={() => editarPerfil(String(usuario.idUsuario), usuario.nomeUsuario, usuario.emailUsuario, usuario.senhaUsuario)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                tipo={modal as any}
                aberto={modal !== null}
                onFechar={() => setModal(null)}
                onSubmit={handleSubmit}
                form={form}
                onChange={handleFormChange}
            />


            {/* Conteúdo */}
            <div className="w-full mx-auto px-4 md:px-28 mt-8">
                <div className="">
                    {/* Coluna principal */}
                    <div>
                        {/* Músicas favoritas */}
                        <section className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
                            <div className="flex items-center justify-between mb-6 px-1">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <HiOutlineHeart className="text-blue-400 mb-[1px]" />
                                    Músicas Favoritas
                                </h2>
                                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition">
                                    Ver todas
                                </button>
                            </div>

                            <div className="space-y-3">
                                {musicasFavoritas.map(musica => (
                                    <div
                                        key={musica.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-zinc-800 p-2 rounded-md text-blue-400">
                                                <HiOutlineMusicalNote className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{musica.titulo}</h3>
                                                <p className="text-sm text-zinc-400">{musica.artista}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}