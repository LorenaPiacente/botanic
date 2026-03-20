🌿 Botanic - Gerenciador de Plantas

O Botanic é uma aplicação web full-stack desenvolvida para o gerenciamento de inventário de plantas. O projeto permite visualizar, cadastrar, editar e remover espécies, integrando uma interface moderna em React com um banco de dados NoSQL na nuvem.



🚀 Tecnologias Utilizadas

Framework: Next.js (App Router)

Linguagem: JavaScript

Banco de Dados: MongoDB Atlas (NoSQL)

Estilização: CSS Modules / Tailwind

Segurança: Variáveis de Ambiente (.env)



🛠️ Funcionalidades

CRUD Completo: Criação, Leitura, Atualização e Exclusão de plantas.

Persistência Real: Dados salvos em um cluster remoto do MongoDB.

Segurança de Dados: Proteção de credenciais de banco de dados via variáveis de ambiente.

Seed Automático: Script para popular o banco de dados instantaneamente para demonstração.



🏁 Como Rodar o Projeto

1. Clonar o repositório

git clone [https://github.com/LorenaPiacente/botanic.git](https://github.com/LorenaPiacente/botanic.git)
cd botanic


2. Instalar dependências

npm install


3. Configurar Variáveis de Ambiente

Crie um arquivo chamado .env.local na raiz do projeto e adicione sua string de conexão do MongoDB:

MONGODB_URI=sua_string_de_conexao_aqui


4. Popular o Banco de Dados (Opcional)

Para iniciar o projeto já com algumas plantas de exemplo (como Costela-de-Adão e Xanadú), execute:

node seed.js


5. Iniciar o Servidor de Desenvolvimento

npm run dev


Acesse http://localhost:3000 no seu navegador.



📂 Estrutura de Pastas Relevante

/src/app/api/plantas: Endpoints da API (GET, POST, PUT, DELETE).

/src/app/api/mongodb.js: Configuração do cliente MongoDB.

seed.js: Script de automação para população inicial de dados.



👤 Autora

Lorena Piacente - Desenvolvedora Full-Stack em transição (Arquitetura & TI)
