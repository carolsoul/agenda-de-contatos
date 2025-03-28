# 📒 Agenda de Contatos

Uma aplicação web para gerenciar contatos de forma simples e eficiente, desenvolvida com **React**.

## 🚀 Funcionalidades
- 📌 Adicionar, editar e remover contatos.
- 🔍 Pesquisar contatos pelo nome.
- 📂 Organizar contatos em ordem alfabética.
- 🎨 Interface responsiva e moderna.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, CSS
- **Backend:**

## 📂 Estrutura do Projeto
```
📦 agenda-contatos
├── 📂 backend
│   ├── 📂 database
│   ├── 📂 .env
│   ├── 📂 server.js
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📂 assets
│   │   ├── logo-orbita-green.svg
│   ├── 📂 components
│   │   ├── ContactForm.js
│   │   ├── ContactList.js
│   │   ├── PasswordRecovery.js
│   ├── 📂 pages
│   │   ├── AddContact.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Sign.js
│   ├── App.css
│   ├── App.js
│   ├── ContactForm.css
│   ├── Home.css
│   ├── index.css
│   ├── index.js
│   ├── Login.css
│   ├── PasswordRecovery.css
│   ├── Sign.css
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