# 📒 Agenda de Contatos

Uma aplicação web para gerenciar contatos de forma simples e eficiente, desenvolvida com **React**.

## 🚀 Funcionalidades
- 📌 Adicionar, editar e remover contatos.
- 🔍 Pesquisar contatos pelo nome.
- 📂 Organizar contatos em ordem alfabética.
- 🎨 Interface responsiva e moderna.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, CSS
- **Backend:** Node.js, API REST
- **Banco de Dados:** MySQL

## 📂 Estrutura do Projeto
```
📦 agenda-contatos
├── 📂 backend
│   ├── 📂 config
│   │   ├── db.js
│   ├── 📂 controllers
│   │   ├── authController.js
│   │   ├── contactController.js
│   ├── 📂 database
│   │   ├── Banco de dados
│   │   ├── init.sql
│   ├── 📂 middleware
│   │   ├── authMiddleware.js
│   ├── 📂 models
│   │   ├── Contact.js
│   │   ├── User.js
│   ├── 📂 routes
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   ├── 📂 .env
│   ├── 📂 server.js
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📂 assets
│   │   ├── img_password_1.png
│   │   ├── img_password_2.png
│   │   ├── img_password_3.png
│   │   ├── logo-orbita-green.svg
│   ├── 📂 components
│   │   ├── ContactForm.js
│   │   ├── ContactList.js
│   │   ├── EmailVerification.js
│   │   ├── NewPassword.js
│   │   ├── PasswordRecovery.js
│   ├── 📂 pages
│   │   ├── AddContact.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   ├── App.css
│   ├── App.js
│   ├── ContactForm.css
│   ├── EmailVerification.css
│   ├── Home.css
│   ├── index.css
│   ├── index.js
│   ├── Login.css
│   ├── NewPassword.css
│   ├── PasswordRecovery.css
│   ├── Register.css
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
```

## 📌 Como Rodar o Projeto
### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/carolsoul/agenda-contatos.git
cd agenda-contatos
```
### 2️⃣ Instalar dependências
```sh
yarn install
# ou
npm install
```
### 4️⃣ Rodar o projeto React
```sh
yarn start
# ou
npm start
```
Acesse **http://localhost:3000** no navegador.

## 📜 Padrões de Commit
Seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- **feat:** Adicionar nova funcionalidade.
- **fix:** Corrigir um erro.
- **docs:** Alterações na documentação.
- **style:** Ajustes de formatação (espaços, indentação, etc.).
- **refactor:** Melhorias no código sem alterar funcionalidades.
- **test:** Adição ou modificação de testes.
- **chore:** Outras mudanças que não afetam o código-fonte.