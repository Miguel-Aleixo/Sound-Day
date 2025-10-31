"use client"

import { Input } from "@/app/components/Auth/input";
import { Link } from "@/app/components/Auth/link";
import { Botao } from "@/app/components/Gerais/botao";
import { RedesSociais } from "@/app/components/Gerais/redesSociais";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Cadastro() {

    const URL = process.env.NEXT_PUBLIC_API_URL

    const [Form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    const FormEdit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setForm({
            ...Form,
            [name]: event.target.value
        })
    }

    const HandleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nomeUsuario", Form.nome);
        formData.append("emailUsuario", Form.email);
        formData.append("senhaUsuario", Form.senha);

        try {
            const res = await fetch(`${URL}/auth/register-admin`, {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                alert("Erro ao criar conta")
                return;
            }

            window.location.href = '/login'

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="font-sans text-white min-h-screen bg-[url('/imagens/1.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Conteúdo principal */}
            <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

                {/* Seção esquerda - Ilustrativa */}
                <section className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-r from-blue-900/90 to-blue-800/80">
                    <div className="max-w-md">
                        <div className="mb-8">
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-full text-xs font-semibold tracking-wider">
                                JUNTE-SE À COMUNIDADE
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            <span className="text-blue-400">Crie sua conta</span> e descubra novos sons
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Faça parte da comunidade Sound Day e tenha acesso a recomendações personalizadas, playlists exclusivas e muito mais.
                        </p>

                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="w-8 h-px bg-blue-400"></div>
                            <span className="text-sm">Conecte-se com</span>
                        </div>

                        <RedesSociais />
                    </div>
                </section>

                {/* Seção direita - Formulário */}
                <section className="w-full min-h-screen md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-black/80 via-black/90 to-black">
                    <form onSubmit={HandleFormSubmit} className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Cadastre-se</h2>
                            <p className="text-gray-400">Preencha seus dados para criar sua conta</p>
                        </div>

                        <div className="space-y-6">

                            <Input type="text" placeholder="Nome completo"
                                icon={<User className="w-5 h-5 text-gray-500" />}
                                color="bg-gray-900/50 border-gray-700"
                                value={Form.nome} onChange={(e) => { FormEdit(e, 'nome') }} />

                            <Input type="email" placeholder="Seu melhor email"
                                icon={<Mail className="w-5 h-5 text-gray-500" />}
                                color="bg-gray-900/50 border-gray-700"
                                value={Form.email} onChange={(e) => { FormEdit(e, 'email') }} />

                            <Input type="password" placeholder="Crie uma senha segura"
                                icon={<Lock className="w-5 h-5 text-gray-500" />}
                                color="bg-gray-900/50 border-gray-700"
                                value={Form.senha} onChange={(e) => { FormEdit(e, 'senha') }} />


                            <Botao text="Criar conta" icon={<ArrowRight className="w-5" />} variant="blue" size="py-3" type="submit" side="right" />
                        </div>

                        <Link text="Já tem uma conta? " text_link="Faça login" path="/login" size="" />
                    </form>
                </section>
            </div>
        </main>
    )
}