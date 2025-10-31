"use client"

// Hooks
import { useState } from 'react';
import { useListarGeneros } from '@/app/hooks/Generos/listarGeneros';
import { useListarArtistas } from '@/app/hooks/Artistas/listarArtistas';
import { useListarMusicas } from '@/app/hooks/Musicas/listarMusicas';

// Icones
import { User, Plus, Edit, Trash2, Disc } from "lucide-react";

// Componentes
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { Botao } from '@/app/components/Gerais/botao';
import { useDeletarArtistas } from '@/app/hooks/Artistas/deletarArtistas';
import { useEditarArtista } from '@/app/hooks/Artistas/editarArtistas';
import { Modal } from '@/app/components/Dashboard/Musicas/modal';
import { useListarPaises } from '@/app/hooks/Artistas/listarPaises';

export default function Artistas() {

    // Modal
    const [modal, setModal] = useState<null | 'editar-artista'>(null)

    // Listagem 
    const { generos, refetchListarGeneros } = useListarGeneros()
    const { artistas, refetchListarArtistas } = useListarArtistas()
    const { musicas, refetchListarMusicas } = useListarMusicas()
    const { paises, refetchListarPaises } = useListarPaises()

    // Deletar artista
    const { deletarArtista } = useDeletarArtistas()

    const deletarArtistas = async (id: string) => {
        const confirmar = confirm("Deseja mesmo deletar?")
        if (!confirmar) return

        const sucesso = await deletarArtista(id)
        refetchListarArtistas()

        if (sucesso) {
            alert('Artista deletado com sucesso!')
        } else {
            alert('Erro ao deletar o artista')
        }
    }

    // Editar artista
    const [form, setForm] = useState({
        id: 0,
        nome: '',
        genero: 0,
        pais: '',
        descricao: '',
        imagem: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => {
        setForm({ ...form, [campo]: e.target.value });
    };

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm({
            ...form,
            imagem: file,
        });
    };

    const editarArtistas = (id: number, nome: string, genero: number, pais: string, descricao: string, imagem: string) => {
        setForm({
            id: id,
            nome: nome,
            genero: genero,
            pais: pais,
            descricao: descricao,
            imagem: imagem
        });
        setModal('editar-artista')
    }

    const { editarArtista } = useEditarArtista()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const sucesso = await editarArtista(form.id, form.nome, form.genero, form.pais, form.descricao)
        refetchListarArtistas()

        if (sucesso) {
            alert("Artista atualizado com sucesso!")
            setModal(null)
        } else {
            alert("Erro ao atualizar artista.")
        }
    }

    // Expandir card
    const [expandedArtist, setExpandedArtist] = useState<number | null>(null);
    const toggleExpandArtist = (artistId: number) => {
        setExpandedArtist(expandedArtist === artistId ? null : artistId);
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
                    generos={generos}
                    paises={paises}
                    onChange={handleFormChange}
                    handleImagemChange={handleImagemChange}
                />

                <div className="w-full mx-auto px-4 lg:px-8 py-8 pt-22 md:pt-28 pb-22 md:pb-0 mb-6">
                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Artistas</h2>
                                <p className="text-zinc-400">Gerencie seu catálogo de artistas</p>
                            </div>
                        </div>

                        <div>
                            <Botao
                                text="Cadastrar Artista"
                                icon={<Plus className="w-5" />}
                                variant="blue"
                                size="px-4 py-2"
                                type="button"
                                side="left"
                                path='artistas/cadastro'
                            />
                        </div>
                    </div>

                    {/* Listagem de Artistas */}
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                        {artistas.map(artista => {
                            const generoArtista = generos.find(genero => genero.idTipoMusica === artista.fkTipoMusica)
                            const genero = generoArtista?.nomeTipoMusica

                            return (
                                <div key={artista.idAutor} className="border-b border-zinc-800 last:border-b-0">
                                    {/* Cabeçalho do Artista */}
                                    <div
                                        className="flex items-center justify-between p-4 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                                        onClick={() => toggleExpandArtist(artista.idAutor)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white">{artista.nomeAutor}</h3>
                                                <p className="text-sm text-blue-400">{genero}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-sm bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                                                {artista.paisAutor}
                                            </span>
                                            <div className="flex gap-2">
                                                <Botao
                                                    icon={<Edit className="w-5 h-5" />}
                                                    variant="custom"
                                                    size="text-zinc-400 hover:text-blue-400"
                                                    type="button"
                                                    onclick={(e) => {
                                                        e.stopPropagation()
                                                        editarArtistas(artista.idAutor, artista.nomeAutor, artista.fkTipoMusica, artista.paisAutor, artista.descricaoAutor, artista.imagemUsuario)
                                                    }}
                                                />
                                                <Botao
                                                    icon={<Trash2 className="w-5 h-5" />}
                                                    variant="custom"
                                                    size="text-zinc-400 hover:text-red-400"
                                                    type="button"
                                                    onclick={(e) => {
                                                        e.stopPropagation()
                                                        deletarArtistas(String(artista.idAutor))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detalhes do Artista (expandível) */}
                                    {expandedArtist === artista.idAutor && (
                                        <div className="bg-zinc-800/30 p-4 border-t border-zinc-800">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-blue-400 mb-2">Informações</h4>
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-zinc-300"><span className="font-medium">Gênero:</span> {genero}</p>
                                                        <p className="text-sm text-zinc-300"><span className="font-medium">País:</span> {artista.paisAutor}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-blue-400 mb-2">Biografia</h4>
                                                    <p className="text-sm text-zinc-300">{artista.descricaoAutor}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex items-center gap-2 mb-2 text-blue-400">
                                                    <Disc className="w-4 h-4" />
                                                    <h4 className="font-medium">Músicas</h4>
                                                </div>
                                                <div className="space-y-2 my-3 ">
                                                    {musicas.filter(musica => musica.nomeAutor === artista.nomeAutor).map(musica => (
                                                        <div
                                                            key={musica.idMusica}
                                                            className='ml-1 rounded bg-zinc-900 border-2 border-zinc-800 p-2 hover:border-gray-800 transition'
                                                        >
                                                            <div>
                                                                <p className="text-sm text-zinc-300">{musica.tituloMusica}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Botao variant='custom' size='text-blue-400 text-sm hover:text-blue-300 p-1' icon={<Plus className="w-4 h-4" />} text='Adicionar nova música' path='musicas/cadastro' />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Rodapé */}
                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-zinc-400">
                            Mostrando {artistas.length} artistas
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}