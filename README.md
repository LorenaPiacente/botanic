<div align="center">
  <h1>🌿 Botanic — Gerenciador de Plantas</h1>

  <p><b>Sistema Fullstack para inventário botânico e paisagismo</b></p>

  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

---

## 📖 Sobre o Projeto

O **Botanic** é uma aplicação web desenvolvida para treinar a construção de um CRUD básico, unindo esse aprendizado à temática de paisagismo — uma área pela qual tenho grande interesse.

A proposta foi evoluir de uma lista estática para um sistema dinâmico com persistência de dados em nuvem, aplicando conceitos fundamentais de desenvolvimento fullstack em uma interface simples, funcional e agradável.

---

## ✨ Funcionalidades Principais

- ✅ **CRUD Completo** — Cadastre, visualize, edite e remova plantas  
- ☁️ **MongoDB Atlas** — Persistência em nuvem  
- 🔐 **Variáveis de Ambiente** — Segurança com `.env`  
- 🌱 **Seed Script** — População automática  

---

## 🛠️ Tecnologias

**Frontend**
- React
- Next.js
- Tailwind CSS

**Backend**
- Node.js
- API Routes (Next.js)
- MongoDB

---

## 🚀 Como Executar o Projeto

### 1. Clonar e instalar

```bash
git clone https://github.com/LorenaPiacente/botanic.git
cd botanic
npm install
```

### 2. Variáveis de ambiente

Crie `.env.local`:

```env
MONGODB_URI=sua_string_de_conexao_aqui
```

### 3. Seed do banco

```bash
node seed.js
```

### 4. Rodar o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📂 Estrutura

```bash
botanic/
├── src/app/api/
├── src/app/api/mongodb
├── seed.js
└── .env.local
```

---

## 👤 Autora

<div align="center">
  <img src="https://github.com/LorenaPiacente.png" width="100px" style="border-radius: 50%;" />
  <br /><br />
  <b>Lorena Piacente</b>
  <br /><br />

  <a href="https://lorenapiacente.netlify.app/">
    <img src="https://img.shields.io/badge/Portfólio-323330?style=for-the-badge&logo=netlify&logoColor=00C7B7" />
  </a>
  <a href="https://www.linkedin.com/in/lorena-piacente/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://github.com/LorenaPiacente">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</div>
