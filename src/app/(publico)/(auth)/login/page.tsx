"use client"

import { Input } from "@/app/components/Auth/input";
import { Link } from "@/app/components/Auth/link";
import { Botao } from "@/app/components/Gerais/botao";
import { RedesSociais } from "@/app/components/Gerais/redesSociais";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import Cookies from 'js-cookie'
import { useToken } from "@/app/hooks/Auth/verificarToken";
import { useRouter } from "next/navigation";

export default function Login() {
    const URL = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()

    const [Form, setForm] = useState({
        email: '',
        senha: ''
    })

    const FormEdit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setForm({
            ...Form,
            [name]: event.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`${URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailUsuario: Form.email,
                    senhaUsuario: Form.senha
                }),
            });

            if (!res.ok) {
                alert("Email ou senha incorretos");
                return;
            }

            const data = await res.json();

            Cookies.set('token', data.token, {expires: 1})
            const token = useToken()
            const isAdmin = token?.roles?.includes("ROLE_ADMIN");

            if(isAdmin) {
                router.push('/dashboard')
            } else {
                router.push('/musicas')
            }

        } catch (err) {
            console.log(err);
        }
    };

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
                                BEM-VINDO DE VOLTA
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            <span className="text-blue-400">Entre</span> na sua conta
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Acesse sua conta para continuar descobrindo novos sons e playlists personalizadas.
                        </p>

                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="w-8 h-px bg-blue-400"></div>
                            <span className="text-sm">Entre com</span>
                        </div>

                        <RedesSociais />
                    </div>
                </section>

                {/* Seção direita - Formulário */}
                <section className="w-full min-h-screen md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-black/80 via-black/90 to-black">
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Login</h2>
                            <p className="text-gray-400">Use suas credenciais para acessar</p>
                        </div>

                        <div className="space-y-6">

                            <Input type="email" placeholder="Seu email cadastrado"
                                icon={<Mail className="w-5 h-5 text-gray-500" />}
                                color="bg-gray-900/50 border-gray-700"
                                value={Form.email} onChange={(e) => { FormEdit(e, 'email') }} />

                            <Input type="password" placeholder="Sua senha"
                                icon={<Lock className="w-5 h-5 text-gray-500" />}
                                color="bg-gray-900/50 border-gray-700"
                                value={Form.senha} onChange={(e) => { FormEdit(e, 'senha') }} />


                            <Botao text="Entrar" icon={<ArrowRight className="w-5" />} variant="blue" size="py-3" type="submit" side="right" />
                        </div>

                        <Link text="Não tem uma conta? " text_link="Cadastre-se" path="/cadastro" size="" />
                    </form>
                </section>
            </div>
        </main>
    )
}