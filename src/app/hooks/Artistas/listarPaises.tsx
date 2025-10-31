"use client";

import { useEffect, useState, useCallback } from "react";

type Pais = {
  nome: string;
  bandeira: string;
};

export function useListarPaises() {
  const [paises, setPaises] = useState<Pais[]>([]);

  const listarPaises = useCallback(async () => {
    try {
      const res = await fetch('/api/paises');

      if (!res.ok) throw new Error("Erro ao carregar países");

      const data = await res.json();
      setPaises(data);
    } catch (err) {
      console.error("Erro ao listar países:", err);
    }
  }, []);

  useEffect(() => {
    listarPaises();
  }, [listarPaises]);

  return {
    paises,
    refetchListarPaises: listarPaises,
  };
}
