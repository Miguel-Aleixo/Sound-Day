"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from 'js-cookie';

type Musica = {
  idMusica: number,
  tituloMusica: string,
  nomeAutor: string,
  tipoMusica: string,
  linkVideo: string,
  trechos: string[]
}

type Trecho = {
    idTrecho: number,
    letraTrecho: string,
    tituloMusicas: Musica[],
    dataCriacao: Date
}

export function useListarTrechos() {
  const [trechos, setTrechos] = useState<Trecho[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const listarTrechos = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/trecho-musica`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar trechos");

      const data = await res.json();
      console.log(data);
      
      setTrechos(data);
    } catch (err) {
      console.log(err);
    }
  }, [URL, token]);

  useEffect(() => {
    listarTrechos();
  }, [listarTrechos]);

  return {
    trechos,
    refetchListarTrechos: listarTrechos,
  };
}
