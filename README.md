# 🎓 Profácil - Sistema de Gestão Escolar

> **Transformando dados educacionais em ações estratégicas.**

O **Profácil** é um sistema web acadêmico desenvolvido para simplificar a gestão escolar. Ele centraliza as rotinas de Professores, Coordenadores, Alunos e Responsáveis em uma única plataforma intuitiva, oferecendo ferramentas como: painéis de desempenho (*dashboards*), *kanban* de atividades, controle de notas, histórico escolar e acompanhamento de risco pedagógico.

---

## Tecnologias Utilizadas

O projeto utiliza uma arquitetura moderna dividida em camadas, operando sob o modelo *Single Page Application* (SPA) e API RESTful.

### Frontend (Interface do Usuário)
* **React + Vite**
* **Tailwind CSS / Mantine UI**
* **JavaScript / TypeScript**

### Backend (Regras de Negócio e API)
* **Node.js + Express**
* **TypeScript**
* **Prisma ORM**

### Banco de Dados
* **PostgreSQL**

---

## ⚙️ Pré-requisitos

Antes de iniciar, você precisa ter as seguintes ferramentas instaladas na sua máquina:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [PostgreSQL](https://www.postgresql.org/) rodando na máquina ou em nuvem

---

## Estrutura do Repositório

```text
profacil/
├── client-mantine/   # Frontend React + Mantine UI + Vite
├── server/           # Backend Node.js + Express + Prisma
└── guidelines.md     # Regras de contribuição e GitFlow
```

---

## Tutorial: Como rodar o projeto localmente

Siga o passo a passo abaixo para ligar o sistema completo (Backend e Frontend) no seu computador.

### 1. Clonar o repositório
Abra o seu terminal e rode o comando:
```bash
git clone https://github.com/joseaugusto-bp/ProFacil-.git
cd ProFacil-
```

### 2. Rodando o Backend (API)
Abra o terminal e execute os comandos abaixo para iniciar a comunicação com o banco de dados.

```bash
# Entre na pasta do backend
cd server

# Instale as dependências
npm install

# Envie a estrutura do Prisma para criar as tabelas no PostgreSQL
npx prisma migrate dev --name init

# Ligue o servidor de desenvolvimento
npm run dev
```

### 3. Rodando o Frontend (Interface)
Abra um **segundo terminal** (mantenha o backend rodando no primeiro) e faça as instalações do front:

```bash
# Na raiz do projeto, entre na pasta do frontend
cd client-mantine

# Instale as dependências
npm install

# Ligue o servidor de desenvolvimento do Vite
npm run dev
```

Pronto! Acesse o link fornecido pelo Vite no terminal (geralmente `http://localhost:5173`) para visualizar o sistema.
