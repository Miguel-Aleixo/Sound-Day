'use client'

import { useState } from "react"

export function useEditarTrecho() {
  const [sucessoEditarTrecho, setSucessoEditarTrecho] = useState(false)

  const editarTrecho = async (idMusica: string, idTrecho: string, trecho: string) => {

    try {
      const res = await fetch(`/api/musicas/${idMusica}/${idTrecho}`, {
        method: "PUT",
        body: JSON.stringify({id: idTrecho, trecho: trecho})
      })

      if (!res.ok) throw new Error("Erro ao editar trecho")
      setSucessoEditarTrecho(true)

    } catch (err: any) {
      setSucessoEditarTrecho(false)
      console.log(err.message || "Erro inesperado")
    }
  }

  return { editarTrecho, sucessoEditarTrecho}
}