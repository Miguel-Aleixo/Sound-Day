"use client"

import Cookies from 'js-cookie'

export function useDeletarMusicas() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const deletarMusica = async (id: number) => {
    try {

      const res = await fetch(`${URL}/musica/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
      })

      if (!res.ok) throw new Error("Erro ao deletar")

      return true
    } catch (err: any) {
      console.log(err.message || "Erro inesperado")
      return false
    }
  }

  return { deletarMusica }
}
