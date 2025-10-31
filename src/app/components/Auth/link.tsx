"use client"

import { useRouter } from "next/navigation"

type LinkProps = {
    text: string
    text_link: string
    path: string
    size: string
}

export function Link({ text, text_link, path, size}: LinkProps) {
    const router = useRouter()

    return (
        <div className={`text-center text-gray-400 ${size}`}>
            {text} <a onClick={() => router.push(path)} className="relative text-blue-400 hover:after:w-full after:bg-blue-400 after:h-[1px] after:w-0 after:absolute after:left-0 after:-bottom-[2px] after:transiton-all after:duration-200 cursor-pointer">{text_link}</a>
        </div>
    )
}