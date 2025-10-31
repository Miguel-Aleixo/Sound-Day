"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from 'js-cookie'

type Artista = {
  idAutor: number,
  nomeAutor: string,
  fkTipoMusica: number,
  paisAutor: string,
  descricaoAutor: string,
  imagemUsuario: string
}

export function useListarArtistas() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const listarArtistas = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/autor`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar artistas");

      const data = await res.json();
      console.log(data);
      setArtistas(data);
    } catch (err) {
      console.log(err);
    }
  },  [URL, token]);

  useEffect(() => {
    listarArtistas();
  }, [listarArtistas]);

  return {
    artistas,
    refetchListarArtistas: listarArtistas,
  };
}
