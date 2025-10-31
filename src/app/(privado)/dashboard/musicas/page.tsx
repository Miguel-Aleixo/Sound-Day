"use client"

// Hooks
import { useState } from 'react';
import { useListarArtistas } from '@/app/hooks/Artistas/listarArtistas';
import { useListarGeneros } from '@/app/hooks/Generos/listarGeneros';
import { useListarMusicas } from '@/app/hooks/Musicas/listarMusicas';
import { useDeletarMusicas } from '@/app/hooks/Musicas/deletarMusicas';
import { useEditarMusica } from '@/app/hooks/Musicas/editarMusicas';

// Icones
import { Music, Plus, ListMusic, Edit, Trash2, X } from "lucide-react";

// Componentes 
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { Botao } from '@/app/components/Gerais/botao';
import { Modal } from '@/app/components/Dashboard/Musicas/modal';

export default function Musicas() {

    // Modal
    const [modal, setModal] = useState<null | "editar-musica">(null)

    // Listagem
    const { generos, refetchListarGeneros } = useListarGeneros()
    const { artistas, refetchListarArtistas } = useListarArtistas()
    const { musicas, refetchListarMusicas } = useListarMusicas()

    // Deletar músicas
    const { deletarMusica } = useDeletarMusicas()

    const deletarMusicas = async (id: number) => {
        const confirmar = confirm("Deseja mesmo deletar?")
        if (!confirmar) return

        const sucesso = await deletarMusica(id)
        refetchListarMusicas()

        if (sucesso) {
            alert('Música deletada com sucesso!')
        } else {
            alert('Erro ao deletar a música')
        }
    }

    // Editar músicas
    const [form, setForm] = useState({
        id: 0,
        tituloMusica: '',
        artista: '',
        genero: '',
        linkVideo: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => {
        setForm({ ...form, [campo]: e.target.value });
    };

    const editarMusicas = (id: number, tituloMusica: string, artista: string, genero: string, linkVideo: string) => {
    
        setForm({
            id: id,
            tituloMusica: tituloMusica,
            artista: artista,
            genero: genero,
            linkVideo: linkVideo
        });
        setModal('editar-musica')
    }

    const { editarMusica } = useEditarMusica()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const idArtista = artistas.find(a => a.nomeAutor === form.artista)
        const idGenero = generos.find(g => g.nomeTipoMusica === form.genero)
        
        const sucesso = await editarMusica(form.id, form.tituloMusica, idArtista?.idAutor, idGenero?.idTipoMusica, form.linkVideo)
        refetchListarMusicas()

        if (sucesso) {
            alert("Música atualizada com sucesso!")
            setModal(null)
        } else {
            alert("Erro ao atualizar música.")
        }
    }

    // Expandir card
    const [expandedMusic, setExpandedMusic] = useState<number | null>(null);
    const toggleExpandMusic = (musicId: number) => {
        setExpandedMusic(expandedMusic === musicId ? null : musicId);
    };

    return (
        <main className="font-sans text-gray-200 min-h-screen bg-zinc-950 flex">
            {/* MenuLateral */}
            <MenuLateral />

            {/* Conteudo*/}
            <section className="flex w-full md:ml-64">

                {/* NavBar */}
                <NavBar />

                {/* Modal */}
                <Modal
                    tipo={modal as any}
                    aberto={modal !== null}
                    onFechar={() => setModal(null)}
                    onSubmit={handleSubmit}
                    form={form}
                    artistas={artistas}
                    generos={generos}
                    onChange={handleFormChange}
                />

                <div className="w-full mx-auto px-4 lg:px-8 py-8 pt-22 md:pt-28 pb-28 md:pb-0 mb-6">

                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Músicas</h2>
                                <p className="text-zinc-400">Gerencie seu catálogo musical</p>
                            </div>
                        </div>

                        <div>
                            <Botao text="Cadastrar Música" icon={<Plus className="w-5" />} variant="blue" size="px-4 py-2" type="button" side="left" path='musicas/cadastro' />
                        </div>
                    </div>

                    {/* Listagem de Músicas */}
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                        {musicas.map((musica) => {

                            return (
                                <div key={musica.idMusica} className="border-b border-zinc-800 last:border-b-0">
                                    {/* Cabeçalho da Música */}
                                    <div
                                        className="flex items-center justify-between p-4 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                                        onClick={() => toggleExpandMusic(musica.idMusica)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                                                <Music className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white">{musica.tituloMusica}</h3>
                                                <p className="text-sm text-blue-400">{musica.nomeAutor}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-sm bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                                                {musica.tipoMusica}
                                            </span>
                                            <div className="flex gap-2">
                                                <Botao onclick={(e) => {
                                                    e.stopPropagation()
                                                    editarMusicas(musica.idMusica, musica.tituloMusica, musica.nomeAutor, musica.tipoMusica, musica.linkVideo)
                                                }} icon={<Edit className="w-5 h-5" />} variant="custom" size="text-zinc-400 hover:text-blue-400" type="button" />
                                                <Botao onclick={(e) => {
                                                    e.stopPropagation()
                                                    deletarMusicas(musica.idMusica)
                                                }} icon={<Trash2 className="w-5 h-5" />} variant="custom" size="text-zinc-400 hover:text-red-400" type="button" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trechos da Música (expandível) */}
                                    {expandedMusic === musica.idMusica && (
                                        <div className="bg-zinc-800/30 p-4 border-t border-zinc-800">
                                            <div className="flex items-center gap-2 mb-4 text-blue-400">
                                                <ListMusic className="w-4 h-4" />
                                                <h4 className="font-medium">Trechos Cadastrados</h4>
                                            </div>

                                            {musica.trechos.length > 0 ? (
                                                <ul className="text-sm text-zinc-300 space-y-2">
                                                    {musica.trechos.map(trecho => (
                                                        <li key={trecho} className='ml-1 rounded bg-zinc-900 border-2 border-zinc-800 p-2 hover:border-gray-800 transition'>
                                                            <span className="text-zinc-400">"{trecho}"</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-zinc-500">Nenhum trecho cadastrado.</p>
                                            )}


                                            <button
                                                className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"

                                            >
                                                <Plus className="w-4 h-4" />
                                                Adicionar novo trecho
                                            </button>

                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Rodapé */}
                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-zinc-400">
                            Mostrando {musicas.length} músicas
                        </span>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            Carregar mais...
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}