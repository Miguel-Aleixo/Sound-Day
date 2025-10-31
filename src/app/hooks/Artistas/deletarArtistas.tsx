"use client"

import Cookies from 'js-cookie'

export function useDeletarArtistas() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const deletarArtista = async (id: string) => {
    try {
      const res = await fetch(`${URL}/autor/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error("Erro ao deletar")

      return true
    } catch (err: any) {
      return false
      console.log(err.message || "Erro inesperado")
    }
  }

  return { deletarArtista }
}
