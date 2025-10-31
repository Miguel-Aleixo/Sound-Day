"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from 'js-cookie';

type Genero = {
  idTipoMusica: number,
  nomeTipoMusica: string,
  descricaoTipoMusica: string,
}

export function useListarGeneros() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const listarGeneros = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/tipomusica`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!res.ok) throw new Error("Erro ao carregar gêneros");

      const data = await res.json();
      setGeneros(data);
    } catch (err) {
      console.log(err);
    }
  }, [URL, token]);

  useEffect(() => {
    listarGeneros();
  }, [listarGeneros]);

  return {
    generos,
    refetchListarGeneros: listarGeneros,
  };
}
