"use client";

import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export function useListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL
  const token = Cookies.get('token')

  interface Usuario {
    idUsuario: number
    nomeUsuario: string
    emailUsuario: string
    senhaUsuario: string
    dataCriacao: string
  }

  useEffect(() => {
    async function listarUsuarios() {
      try {
        const res = await fetch(`${URL}/auth`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Erro ao carregar usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.log(err);
      }
    }

    listarUsuarios();
  }, []);

  return usuarios;
}
