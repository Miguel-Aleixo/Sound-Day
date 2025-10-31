"use client"

import Cookies from 'js-cookie'

export function useEditarArtista() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const editarArtista = async (id: number, nome: string, genero: number, pais: string, descricao: string) => {

    try {
      const res = await fetch(`${URL}/autor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nomeAutor: nome,
          fkTipoMusica: genero,
          paisAutor: pais,
          descricaoAutor: descricao
        })
      })

      if (!res.ok) throw new Error("Erro ao editar artista")

      return true
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return { editarArtista }
}
