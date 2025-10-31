"use client"

// Hooks 
import { useState } from 'react';
import { useListarGeneros } from '@/app/hooks/Generos/listarGeneros';
import { useListarArtistas } from '@/app/hooks/Artistas/listarArtistas';
import { useListarMusicas } from '@/app/hooks/Musicas/listarMusicas';
import { useDeletarGeneros } from '@/app/hooks/Generos/deletarGeneros';

// Icones
import { Disc, Plus, Edit, Trash2, Music } from "lucide-react";

// Compoenentes
import { Botao } from '@/app/components/Gerais/botao';
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { useEditarGenero } from '@/app/hooks/Generos/editarGeneros';
import { Modal } from '@/app/components/Dashboard/Musicas/modal';

export default function Generos() {

    // Modal
    const [modal, setModal] = useState<null | 'editar-genero'>(null)

    // Listagem
    const { generos, refetchListarGeneros } = useListarGeneros()
    const { artistas, refetchListarArtistas } = useListarArtistas()
    const { musicas, refetchListarMusicas } = useListarMusicas()

    // Deletar gênero
    const { deletarGenero } = useDeletarGeneros()

    const deletarGeneros = async (id: string) => {
        const confirmar = confirm("Deseja mesmo deletar?")
        if (!confirmar) return

        const sucesso = await deletarGenero(id)
        await refetchListarGeneros()

        if (sucesso) {
            alert('Gênero deletado com sucesso!')
        } else {
            alert('Erro ao deletar o gênero')
        }
    }

    // Editar gênero
    const [form, setForm] = useState({
        id: '',
        nome: '',
        descricao: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => {
        setForm({ ...form, [campo]: e.target.value });
    };

    const editarGeneros = (id: string, nome: string, descricao: string) => {
        setForm({
            id: id,
            nome: nome,
            descricao: descricao
        });
        setModal('editar-genero')
    }

    const { editarGenero } = useEditarGenero()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const sucesso = await editarGenero(form.id, form.nome, form.descricao)
        await refetchListarGeneros()

        if (sucesso) {
            alert("Gênero atualizado com sucesso!")
            setModal(null)
        } else {
            alert("Erro ao atualizar gênero.")
        }
    }

    // Expandir card
    const [expandedGenero, setExpandedGenero] = useState<number | null>(null);
    const toggleExpandGenero = (generoId: number) => {
        setExpandedGenero(expandedGenero === generoId ? null : generoId);
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
                    onChange={handleFormChange}
                />

                <div className="w-full mx-auto px-4 lg:px-8 py-8 pt-22 md:pt-28 pb-22 md:pb-0 mb-6">
                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Gêneros Musicais</h2>
                                <p className="text-zinc-400">Gerencie os gêneros do seu catálogo</p>
                            </div>
                        </div>

                        <div>
                            <Botao
                                text="Cadastrar Gênero"
                                icon={<Plus className="w-5" />}
                                variant="blue"
                                size="px-4 py-2"
                                type="button"
                                side="left"
                                path='generos/cadastro'
                            />
                        </div>
                    </div>

                    {/* Listagem de Gêneros */}
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                        {generos.map((genero) => {
                            const artistasDoGenero = artistas.filter(artista => artista.fkTipoMusica === genero.idTipoMusica);

                            return (
                                <div key={genero.idTipoMusica} className="border-b border-zinc-800 last:border-b-0">
                                    {/* Cabeçalho do Gênero */}
                                    <div
                                        className="flex items-center justify-between p-4 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                                        onClick={() => toggleExpandGenero(genero.idTipoMusica)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                                                <Disc className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white">{genero.nomeTipoMusica}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-sm bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                                                {artistasDoGenero.length} artistas
                                            </span>
                                            <div className="flex gap-2">
                                                <Botao
                                                    icon={<Edit className="w-5 h-5" />}
                                                    variant="custom"
                                                    size="text-zinc-400 hover:text-blue-400"
                                                    type="button"
                                                    onclick={(e) => {
                                                        e.stopPropagation()
                                                        editarGeneros(String(genero.idTipoMusica), genero.nomeTipoMusica, genero.descricaoTipoMusica)
                                                    }}
                                                />
                                                <Botao
                                                    icon={<Trash2 className="w-5 h-5" />}
                                                    variant="custom"
                                                    size="text-zinc-400 hover:text-red-400"
                                                    type="button"
                                                    onclick={(e) => {
                                                        e.stopPropagation()
                                                        deletarGeneros(String(genero.idTipoMusica))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detalhes do Gênero (expandível) */}
                                    {expandedGenero === genero.idTipoMusica && (
                                        <div className="bg-zinc-800/30 p-4 border-t border-zinc-800">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-blue-400 mb-2">Descrição</h4>
                                                    <p className="text-sm text-zinc-300 ml-1">{genero.descricaoTipoMusica}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex items-center gap-2 mb-2 text-blue-400">
                                                    <Music className="w-4 h-4" />
                                                    <h4 className="font-medium">Artistas Relacionados</h4>
                                                </div>
                                                <div className="space-y-2">
                                                    {artistasDoGenero.map((artista) => {
                                                        const musicasDoArtista = musicas.filter(musica => musica.nomeAutor === artista.nomeAutor)

                                                        return (
                                                            <div
                                                                key={artista.idAutor}
                                                                className="ml-1 my-3 rounded bg-zinc-900 border-2 border-zinc-800 p-2 hover:border-gray-800 transition"
                                                            >
                                                                <div>
                                                                    <p className="text-sm text-zinc-300">{artista.nomeAutor}</p>
                                                                    <p className="text-xs text-zinc-500">
                                                                        {musicasDoArtista.length} músicas
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                                <Botao variant='custom' size='text-blue-400 text-sm hover:text-blue-300 p-1' icon={<Plus className="w-4 h-4" />} text='Adicionar novo artista' path='artistas/cadastro' />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>

                    {/* Rodapé */}
                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-zinc-400">
                            Mostrando {generos.length} gêneros
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}