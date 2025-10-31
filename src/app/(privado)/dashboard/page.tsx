import { BarChart2 } from "lucide-react";
import { NavBar } from '@/app/components/Gerais/navBar';
import { MenuLateral } from '@/app/components/Gerais/menuLateral';
import { MetricasPrincipais } from "@/app/components/Dashboard/Geral/metricasPrincipais";

export default function Dashboard() {

    return (
        <main className="font-sans text-gray-200 min-h-screen bg-zinc-950 flex">
            {/* MenuLateral */}
           <MenuLateral />

            {/* Conteudo*/}
            <section className="flex w-full md:ml-64">

                {/* NavBar */}
                <NavBar />

                <div className="w-full mx-auto px-4 md:px-8 py-8 pt-22 md:pt-28 pb-22 md:pb-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Visão Geral</h2>
                            <p className="text-zinc-400">Estatísticas completas do Sound Day</p>
                        </div>
                       
                    </div>

                    {/* Métricas Principais */}
                    <MetricasPrincipais />

                    {/* Gráfico e Atividades */}
                    <div className="w-full gap-8 mb-8">
                        {/* Gráfico de Ouvintes */}
                        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Ouvintes Mensais</h3>
                                <div className="flex gap-2">
                                    <button className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                                        Mensal
                                    </button>
                                    <button className="text-xs bg-zinc-800/50 text-zinc-400 px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                                        Anual
                                    </button>
                                </div>
                            </div>

                            {/* Gráfico */}
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart2 className="w-10 h-10 mx-auto text-blue-400 mb-2" />
                                    <p className="text-zinc-400">Gráfico de crescimento de ouvintes</p>
                                    <p className="text-sm text-zinc-500 mt-1">Dados atualizados em tempo real</p>
                                </div>
                            </div>
                        </div>
                      
                    </div>

             
                </div>
            </section>
        </main>
    );
}