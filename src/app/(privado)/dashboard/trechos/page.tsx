"use client"

// Hooks
import { useState } from 'react';
import { useListarTrechos } from '@/app/hooks/Trechos/listarTrechos';
import { useDeletarTrecho } from '@/app/hooks/Trechos/deletarTrecho';
import { useEditarTrecho } from '@/app/hooks/Trechos/editarTrecho';
import { Modal } from '@/app/components/Dashboard/Musicas/modal';

// Icones
import { Quote, Plus, Edit, Trash2, Disc } from "lucide-react";

// Componentes 
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { Botao } from '@/app/components/Gerais/botao';

export default function Trechos() {
    // Modal
    const [modal, setModal] = useState<null | "editar-trecho">(null)

    // Listagem
    const { trechos, refetchListarTrechos } = useListarTrechos()

    console.log(trechos);


    // Deletar trechos
    const { deletarTrecho } = useDeletarTrecho()

    const deletarTrechos = async (id: number) => {
        const confirmar = confirm("Deseja mesmo deletar este trecho?")
        if (!confirmar) return

        const sucesso = await deletarTrecho(id)
        refetchListarTrechos()

        if (sucesso) {
            alert('Trecho deletado com sucesso!')
        } else {
            alert('Erro ao deletar o trecho')
        }
    }

    // // Editar trechos
    // const [form, setForm] = useState({
    //     idTrecho: 0,
    //     letraTrecho: '',
    //     tituloMusicas: [] as string[],
    // });

    // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, campo: string) => {
    //     setForm({ ...form, [campo]: e.target.value });
    // };

    // const handleMusicasChange = (musicas: string[]) => {
    //     setForm({ ...form, tituloMusicas: musicas });
    // };

    // const editarTrechos = (idTrecho: number, letraTrecho: string, tituloMusicas: string[]) => {
    //     setForm({
    //         idTrecho,
    //         letraTrecho,
    //         tituloMusicas
    //     });
    //     setModal('editar-trecho')
    // }

    // const { editarTrecho } = useEditarTrecho()
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()

    //     const sucesso = await editarTrecho(
    //         form.idTrecho, 
    //         form.letraTrecho, 
    //         form.tituloMusicas
    //     )
    //     refetchListarTrechos()

    //     if (sucesso) {
    //         alert("Trecho atualizado com sucesso!")
    //         setModal(null)
    //     } else {
    //         alert("Erro ao atualizar trecho.")
    //     }
    // }

    // Expandir card
    const [expandedTrecho, setExpandedTrecho] = useState<number | null>(null);
    const toggleExpandTrecho = (trechoId: number) => {
        setExpandedTrecho(expandedTrecho === trechoId ? null : trechoId);
    };

    // Formatar data
    const formatarData = (data: Date) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <main className="font-sans text-gray-200 min-h-screen bg-zinc-950 flex">
            {/* MenuLateral */}
            <MenuLateral />

            {/* Conteudo*/}
            <section className="flex w-full md:ml-64">
                {/* NavBar */}
                <NavBar />

                {/* Modal
                <Modal
                    tipo={modal as any}
                    aberto={modal !== null}
                    onFechar={() => setModal(null)}
                    onSubmit={handleSubmit}
                    form={form}
                    onChange={handleFormChange}
                    onMusicasChange={handleMusicasChange}
                /> */}

                <div className="w-full mx-auto px-4 lg:px-8 py-8 pt-22 md:pt-28 pb-28 md:pb-0 mb-6">
                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Trechos Musicais</h2>
                                <p className="text-zinc-400">Gerencie os trechos do seu catálogo</p>
                            </div>
                        </div>

                        <div>
                            <Botao
                                text="Cadastrar Trecho"
                                icon={<Plus className="w-5" />}
                                variant="blue"
                                size="px-4 py-2"
                                type="button"
                                side="left"
                                path='trechos/cadastro'
                            />
                        </div>
                    </div>

                    {/* Listagem de Trechos */}
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden ">
                        {trechos.map((trecho) => (
                            <div key={trecho.idTrecho} className="border-b border-zinc-800 last:border-b-0">
                                {/* Cabeçalho do Trecho */}
                                <div
                                    className="flex items-center justify-between p-4 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                                    onClick={() => toggleExpandTrecho(trecho.idTrecho)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                                            <Quote className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {trecho.letraTrecho}
                                            </h3>
                                            <p className="text-sm text-zinc-400">
                                                Criado em: {formatarData(trecho.dataCriacao)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Botao
                                            onclick={(e) => {
                                                e.stopPropagation()
                                                // editarTrechos(
                                                //     trecho.idTrecho, 
                                                //     trecho.letraTrecho, 
                                                //     trecho.tituloMusicas
                                                // )
                                            }}
                                            icon={<Edit className="w-5 h-5" />}
                                            variant="custom"
                                            size="text-zinc-400 hover:text-blue-400"
                                            type="button"
                                        />
                                        <Botao
                                            onclick={(e) => {
                                                e.stopPropagation()
                                                deletarTrechos(trecho.idTrecho)
                                            }}
                                            icon={<Trash2 className="w-5 h-5" />}
                                            variant="custom"
                                            size="text-zinc-400 hover:text-red-400"
                                            type="button"
                                        />
                                    </div>
                                </div>

                                {/* Detalhes do Trecho (expandível) */}
                                {expandedTrecho === trecho.idTrecho && (
                                    <div className="bg-zinc-800/30 p-4 border-t border-zinc-800">
                                        <div>
                                            <div className='flex gap-1'>
                                                <Disc className='text-blue-400 h-4 w-4 mt-1'/>
                                                <h4 className="font-medium text-blue-400 mb-2">Músicas Relacionadas</h4>
                                            </div>
                                            {trecho.tituloMusicas.length > 0 && (
                                                <ul className="text-sm text-zinc-300 space-y-2 ml-1 my-2">
                                                    {trecho.tituloMusicas.map(musica => (
                                                        <li className='rounded bg-zinc-900 border-2 border-zinc-800 p-2 hover:border-gray-800 transition' key={musica.idMusica}>{musica.tituloMusica}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Rodapé */}
                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-zinc-400">
                            Mostrando {trechos.length} trechos
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