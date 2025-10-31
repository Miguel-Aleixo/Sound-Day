"use client"

import { X } from "lucide-react"
import { Botao } from "@/app/components/Gerais/botao"

type ModalType = "editar-musica" | "editar-trecho" | 'editar-artista' | 'editar-genero' | 'editar-perfil'

type Props = {
  tipo: ModalType
  aberto: boolean
  onFechar: () => void
  onSubmit: (e: React.FormEvent) => void
  form: any
  artistas?: any[]
  generos?: any[]
  paises?: any[]
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => void
  handleImagemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, campo: string) => void
}

export function Modal({ tipo, aberto, onFechar, onSubmit, form, artistas = [], generos = [], paises = [], onChange }: Props) {
  if (!aberto) return null

  const tituloModal = {
    "editar-musica": "Editar Música",
    "editar-trecho": "Editar Trecho",
    "editar-artista": "Editar Artista",
    "editar-genero": "Editar Gênero",
    "editar-perfil": "Editar Perfil"
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center md:items-center md:justify-center">
      <div className="bg-zinc-900 p-6 w-full h-full md:h-auto md:w-[500px] md:rounded-lg md:border border-zinc-700 relative overflow-y-auto">

        <div className="absolute right-6 top-6">
          <Botao variant="blue" size="p-1" onclick={onFechar} icon={<X className="w-8 h-8" />} />
        </div>

        <h2 className="text-xl font-bold mb-4 mt-2 text-white">{tituloModal[tipo]}</h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {tipo === "editar-musica" && (
            <>
              <label className="text-sm text-zinc-300">
                Título:
                <input
                  type="text"
                  value={form.tituloMusica}
                  onChange={(e) => onChange(e, 'tituloMusica')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <div>
                <label className="text-sm text-zinc-300">Artista/Banda</label>
                <select
                  value={form.artista}
                  onChange={(e) => onChange(e, 'artista')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                >
                  <option value="">Selecione um artista</option>
                  {artistas.map((artista) => (
                    <option key={artista.idAutor} value={artista.nomeAutor}>{artista.nomeAutor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-zinc-300">Gênero Musical</label>
                <select
                  value={form.genero}
                  onChange={(e) => onChange(e, 'genero')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                >
                  <option value="">Selecione um gênero</option>
                  {generos.map((genero) => (
                    <option key={genero.idTipoMusica} value={genero.nomeTipoMusica}>{genero.nomeTipoMusica}</option>
                  ))}
                </select>
              </div>

              <label className="text-sm text-zinc-300">
                Link do video:
                <input
                  type="text"
                  value={form.linkVideo}
                  onChange={(e) => onChange(e, 'linkVideo')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>
            </>
          )}

          {tipo === "editar-trecho" && (
            <label className="text-sm text-zinc-300">
              Trecho:
              <input
                type="text"
                value={form.trecho}
                onChange={(e) => onChange(e, 'trecho')}
                className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
              />
            </label>
          )}

          {tipo === "editar-artista" && (
            <>
              <label className="text-sm text-zinc-300">
                Nome do Artista
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => onChange(e, 'nome')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Pais do Artista
                <input
                  type="text"
                  value={form.pais}
                  onChange={(e) => onChange(e, 'pais')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">Gênero do Artista</label>
              <select
                value={form.genero}
                onChange={(e) => onChange(e, 'genero')}
                className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
              >
                <option value="">Selecione um gênero</option>
                {generos.map((genero) => (
                  <option key={genero.idTipoMusica} value={genero.idTipoMusica}>{genero.nomeTipoMusica}</option>
                ))}
              </select>

              <label className="text-sm text-zinc-300">
                Imagem do Artista
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Biografia do Artista
                <textarea
                  value={form.descricao}
                  rows={4}
                  onChange={(e) => onChange(e, 'descricao')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>
            </>

          )}

          {tipo === "editar-genero" && (
            <>
              <label className="text-sm text-zinc-300">
                Nome do Gênero
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => onChange(e, 'nome')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Descrição do Gênero
                <textarea
                  value={form.descricao}
                  rows={4}
                  onChange={(e) => onChange(e, 'descricao')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>
            </>
          )}

          {tipo === "editar-perfil" && (
            <>
              <label className="text-sm text-zinc-300">
                Seu nome
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => onChange(e, 'nome')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Seu email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange(e, 'email')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Sua senha
                <input
                  type="password"
                  value={form.senha}
                  onChange={(e) => onChange(e, 'senha')}
                  className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded text-white outline-none"
                />
              </label>

            </>
          )}

          <div className="flex justify-end">
            <Botao
              text="Salvar Alterações"
              variant="blue"
              size="px-4 py-2"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
