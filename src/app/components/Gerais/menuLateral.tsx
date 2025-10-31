'use client'

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  AudioLines,
  Music,
  Disc,
  BarChart2,
  LogOut,
  Home,
  Library,
  Plus,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useToken } from "@/app/hooks/Auth/verificarToken";

export function MenuLateral() {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [menuAtual, setMenuAtual] = useState<Menu[]>([]);

  type Menu =
    | {
      label: string;
      icon: React.ReactNode;
      path: string;
      subLabel?: undefined;
      subPath?: undefined;
    }
    | {
      label: string;
      icon: React.ReactNode;
      path: string;
      subLabel: string;
      subPath: string;
    };

  const menuDashboard: Menu[] = [
    {
      label: "Geral",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      label: "Trechos",
      icon: <AudioLines className="w-5 h-5" />,
      path: "/dashboard/trechos",
      subLabel: "Cadastrar trecho",
      subPath: "/dashboard/trechos/cadastro"
    },
    {
      label: "Músicas",
      icon: <Music className="w-5 h-5" />,
      path: "/dashboard/musicas",
      subLabel: "Cadastrar música",
      subPath: "/dashboard/musicas/cadastro"
    },
    {
      label: "Artistas",
      icon: <Disc className="w-5 h-5" />,
      path: "/dashboard/artistas",
      subLabel: "Cadastrar artista",
      subPath: "/dashboard/artistas/cadastro"
    },
    {
      label: "Gêneros",
      icon: <BarChart2 className="w-5 h-5" />,
      path: "/dashboard/generos",
      subLabel: "Cadastrar gênero",
      subPath: "/dashboard/generos/cadastro"
    },
    {
      label: "Voltar",
      icon: <LogOut className="w-5 h-5" />,
      path: "/musicas",
    },
  ];

  const menuMusicasBase: Menu[] = [
    {
      label: "Inicio",
      icon: <Home className="w-5 h-5" />,
      path: "/",
    },
    {
      label: "Músicas",
      icon: <Music className="w-5 h-5" />,
      path: "/musicas",
    },
    {
      label: "Sua Biblioteca",
      icon: <Library className="w-5 h-5" />,
      path: "/biblioteca",
    },
    {
      label: "Dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      path: "/dashboard",
    },
  ];

  useEffect(() => {
    setIsClient(true);

    const token = useToken();
    const isDashboard = pathname?.startsWith("/dashboard");
    const isAdmin = token?.roles?.includes("ROLE_ADMIN");

    if (isDashboard) {
      setMenuAtual(menuDashboard);
    } else {
      const menuMusicasVerificado = [...menuMusicasBase];

      if (!isAdmin) {
        menuMusicasVerificado.pop(); 
      }

      setMenuAtual(menuMusicasVerificado);
    }
  }, [pathname]);

  if (!isClient) return null;

  return (
    <div className="md:w-64 w-full bg-zinc-900 border-t md:border-r border-gray-800 p-2 md:p-6 fixed bottom-0 md:h-full z-50">
      <div className="mb-10 hidden md:flex">
        <h1 className="text-2xl font-bold text-blue-400">Sound Day</h1>
      </div>

      <nav className="flex md:flex-col space-y-1 justify-between">
        {menuAtual.map((item) => (
          <div key={item.label} className="space-y-1 flex md:flex-col">
            <a
              onClick={() => router.push(item.path)}
              className={`flex flex-col md:flex-row items-center gap-3 md:p-3 px-3 pt-2 rounded-lg cursor-pointer transition-all duration-300 
              ${pathname === item.path
                  ? "md:bg-gray-800 text-blue-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {item.icon}
              <span className="text-xs md:text-base">{item.label}</span>
            </a>
            {item.subPath && pathname.startsWith(item.path) && (
              <a
                onClick={() => router.push(item.subPath)}
                className={`hidden md:flex relative left-4 flex-col md:flex-row items-center gap-3 md:p-3 px-3 pt-2 rounded-lg cursor-pointer transition-all duration-300 
              ${pathname === item.subPath
                    ? "md:bg-gray-800 text-blue-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Plus className="w-5 h-5" />
                <span className="text-xs md:text-base">{item.subLabel}</span>
              </a>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
