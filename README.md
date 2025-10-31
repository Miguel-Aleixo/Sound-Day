Sistema de gerenciamento musical desenvolvido com Next.js, TypeScript (ES6+) e Tailwind CSS.

📦 O que é
O Sound-Day é uma aplicação web que permite aos administradores cadastrar artistas, músicas e trechos, vinculando cada música ao seu respectivo artista e gênero.
O sistema conta com um painel administrativo completo para criar, editar, excluir e visualizar informações de forma organizada e intuitiva.
É responsivo e foi desenvolvido para oferecer uma experiência de gerenciamento simples, moderna e eficiente.

🚀 Tecnologias utilizadas
Next.js: Framework React para construção de interfaces com renderização no servidor (SSR) e geração de sites estáticos (SSG).

TypeScript (ES6+): Linguagem de programação tipada para maior segurança e manutenção do código.

Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

Outras dependências: (Se houver outras bibliotecas ou ferramentas utilizadas, liste-as aqui.)

🧰 Funcionalidades principais
Gerenciamento de artistas: Cadastro e edição de artistas com informações detalhadas.
Controle de músicas: Associação de músicas aos artistas e gêneros.
Trechos de músicas: Criação e organização de trechos relacionados a cada faixa.
Painel administrativo: Interface intuitiva para gerenciar todos os dados do sistema.
Design responsivo: Layout adaptável para diferentes tamanhos de tela, proporcionando uma boa experiência em dispositivos móveis e desktops.

⚙️ Como executar

Pré-requisitos
Node.js (v14 ou superior)
npm ou Yarn como gerenciador de pacotes

Passos
Clone o repositório:

git clone https://github.com/devnkz/Sound-Day.git
cd Sound-Day


Instale as dependências:

npm install


ou

yarn install


Execute o servidor de desenvolvimento:

npm run dev


ou

yarn dev


Acesse a aplicação em http://localhost:3000

🗂️ Estrutura do projeto

/
├── public/           # Imagens e arquivos estáticos
├── src/
│   ├── components/   # Componentes reutilizáveis (ex: ArtistaCard, MusicaCard, Modal)
│   ├── app/          # Rotas e páginas do projeto (App Router)
│   ├── hooks/        # Hooks personalizados (ex: useMusicas, useArtistas)
│   ├── services/     # Conexão com API e funções de requisição
│   ├── styles/       # Estilos globais e configurações Tailwind
│   └── utils/        # Funções auxiliares (ex: formatações, validações)
├── .env.local        # Variáveis de ambiente locais (não comitar este arquivo)
├── tailwind.config.js # Configuração do Tailwind CSS
├── next.config.js     # Configuração do Next.js
└── package.json       # Dependências e scripts do projeto


⚙️ Variáveis de ambiente
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

NEXT_PUBLIC_API_URL=http://localhost:8080/api


📄 Licença
Este projeto está licenciado sob a MIT License.
