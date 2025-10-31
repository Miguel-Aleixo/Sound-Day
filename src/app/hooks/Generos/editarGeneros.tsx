"use client"

import Cookies from 'js-cookie'

export function useEditarGenero() {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get('token');

    const editarGenero = async (id: string, nome: string, descricao: string) => {

        try {
            const res = await fetch(`${URL}/tipomusica/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    idTipoMusica: id,
                    nomeTipoMusica: nome,
                    descricaoTipoMusica: descricao
                })
            })

            if (!res.ok) throw new Error("Erro ao editar gênero")

            return true
        } catch (err: any) {
            console.error(err.message)
            return false
        }
    }
    return { editarGenero }
}
