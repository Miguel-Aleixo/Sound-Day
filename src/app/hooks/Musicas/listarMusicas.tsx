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

export function useListarMusicas() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const listarMusicas = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/musica`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar músicas");

      const data = await res.json();
      console.log(data);
      
      setMusicas(data);
    } catch (err) {
      console.log(err);
    }
  }, [URL, token]);

  useEffect(() => {
    listarMusicas();
  }, [listarMusicas]);

  return {
    musicas,
    refetchListarMusicas: listarMusicas,
  };
}
