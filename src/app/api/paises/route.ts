import { NextResponse } from "next/server";

const paises = [
  { nome: "Brasil", bandeira: "🇧🇷" },
  { nome: "Estados Unidos", bandeira: "🇺🇸" },
  { nome: "Canadá", bandeira: "🇨🇦" },
  { nome: "Argentina", bandeira: "🇦🇷" },
  { nome: "México", bandeira: "🇲🇽" },
  { nome: "Portugal", bandeira: "🇵🇹" },
  { nome: "Espanha", bandeira: "🇪🇸" },
  { nome: "França", bandeira: "🇫🇷" },
  { nome: "Alemanha", bandeira: "🇩🇪" },
  { nome: "Itália", bandeira: "🇮🇹" },
  { nome: "Reino Unido", bandeira: "🇬🇧" },
  { nome: "Japão", bandeira: "🇯🇵" },
  { nome: "China", bandeira: "🇨🇳" },
  { nome: "Coreia do Sul", bandeira: "🇰🇷" },
  { nome: "Índia", bandeira: "🇮🇳" },
  { nome: "Austrália", bandeira: "🇦🇺" },
  { nome: "África do Sul", bandeira: "🇿🇦" },
  { nome: "Egito", bandeira: "🇪🇬" },
  { nome: "Rússia", bandeira: "🇷🇺" },
  { nome: "Suécia", bandeira: "🇸🇪" }
];

export async function GET() {
  return NextResponse.json(paises);
}
