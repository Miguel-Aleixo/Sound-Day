'use client'

import Cookies from 'js-cookie'

export function useDeletarTrecho() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  const deletarTrecho = async (id: number) => {
    try {
      const res = await fetch(`${URL}/trecho-musica/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      if (!res.ok) throw new Error("Erro ao deletar trecho")
      return true

    } catch (err: any) {
      console.log(err.message || "Erro inesperado")
      return false
    }
  }

  return { deletarTrecho }
}