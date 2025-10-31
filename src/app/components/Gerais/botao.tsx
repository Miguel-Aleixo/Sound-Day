"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

type BotaoProps = {
  text?: string
  icon?: ReactNode
  variant: "blueRounded" | "blue" | "transparent" | "custom"
  path?: string
  size?: string
  type?: "submit" | "button"
  side?: string
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const variants = {
  blueRounded:
    "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full w-fit transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/40 flex items-center gap-2",
  blue:
    "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/40 flex items-center justify-center gap-2",
  transparent:
    "bg-transparent border border-white/30 hover:border-white text-white font-bold rounded-full w-fit transition-all duration-300 cursor-pointer hover:bg-white/10",
  custom: "cursor-pointer transition-all duration-300 flex items-center gap-2"
}

export function Botao({
  text,
  icon,
  variant = "blueRounded",
  path,
  size,
  type = "button",
  side = "left",
  onclick
}: BotaoProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onclick) {
      onclick(e)
    } else if (type === "button" && path) {
      e.stopPropagation()
      router.push(path)
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${variants[variant]} ${size}`}
    >
      {side === "left" && icon && <span>{icon}</span>}
      {text}
      {side === "right" && icon && <span>{icon}</span>}
    </button>
  )
}
