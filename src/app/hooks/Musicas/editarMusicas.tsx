"use client"

import Cookies from 'js-cookie'

export function useEditarMusica() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('token');

  
  const editarMusica = async (id: number, titulo: string, artista: number = 0, genero: number = 0, linkVideo: string) => {
    
    console.log({
          tituloMusica: titulo,
          idAutor: artista,
          idTipoMusica: genero,
          linkVideo: linkVideo
        });

    try {
      const res = await fetch(`${URL}/musica/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify({
          tituloMusica: titulo,
          idAutor: artista,
          idTipoMusica: genero,
          linkVideo: linkVideo
        })
      })

      if (!res.ok) throw new Error("Erro ao editar música")

      return true
    } catch (err: any) {
      console.error(err.message)
      return false
    }
  }

  return { editarMusica }
}
