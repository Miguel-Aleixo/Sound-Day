"use client";

import { useListarArtistas } from "@/app/hooks/Artistas/listarArtistas";
import { useListarGeneros } from "@/app/hooks/Generos/listarGeneros";
import { useListarMusicas } from "@/app/hooks/Musicas/listarMusicas";
import { useListarTrechos } from "@/app/hooks/Trechos/listarTrechos";
import { useListarUsuarios } from "@/app/hooks/Usuarios/listarUsuarios";
import { Users, Disc, BarChart2, ArrowUpRight, Music, AudioLines } from "lucide-react";

export function MetricasPrincipais() {
  const usuarios = useListarUsuarios()
  const {generos, refetchListarGeneros} = useListarGeneros()
  const {artistas, refetchListarArtistas} = useListarArtistas()
  const {musicas, refetchListarMusicas} = useListarMusicas()
  const {trechos, refetchListarTrechos} = useListarTrechos()

  const metricas = [
    {
      title: "Total de trechos",
      value: trechos.length,
      icon: <AudioLines className="w-5 h-5" />,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Músicas Catalogadas",
      value: musicas.length,
      icon: <Music className="w-5 h-5" />,
      change: "+24%",
      trend: "up",
    },
    {
      title: "Artistas Cadastrados",
      value: artistas.length,
      icon: <Disc className="w-5 h-5" />,
      change: "+7%",
      trend: "up",
    },
    {
      title: "Gêneros Musicais",
      value: generos.length,
      icon: <BarChart2 className="w-5 h-5" />,
      change: "+2",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricas.map((metrica, index) => (
        <div
          key={index}
          className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-all duration-300">
                {metrica.title}
              </p>
              <h3 className="text-2xl font-bold mt-2 text-white">
                {metrica.value}
              </h3>
            </div>
            <div
              className={`p-2 rounded-lg ${
                metrica.trend === "up"
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-900/30 text-red-400"
              }`}
            >
              {metrica.icon}
            </div>
          </div>
          <p
            className={`mt-4 text-sm flex items-center ${
              metrica.trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            <ArrowUpRight
              className={`w-4 h-4 mr-1 ${
                metrica.trend === "up" ? "" : "rotate-90"
              }`}
            />
            {metrica.change} em relação ao mês passado
          </p>
        </div>
      ))}
    </div>
  );
}
