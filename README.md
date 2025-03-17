# 📒 Agenda de Contatos

Uma aplicação web para gerenciar contatos de forma simples e eficiente, desenvolvida com **React** e um backend em **Node.js**.

## 🚀 Funcionalidades
- 📌 Adicionar, editar e remover contatos.
- 🔍 Pesquisar contatos pelo nome.
- 📂 Organizar contatos em ordem alfabética.
- 🎨 Interface responsiva e moderna.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Banco de Dados:** JSON Server (para testes locais)

## 📂 Estrutura do Projeto
```
📦 agenda-contatos
├── 📂 src
│   ├── 📂 components
│   │   ├── ContactForm.js
│   │   ├── ContactList.js
│   ├── 📂 pages
│   │   ├── Home.js
│   │   ├── AddContact.js
│   ├── App.js
│   ├── index.js
│   ├── 📂 assets
├── 📂 public
├── package.json
├── README.md
```

## 📌 Como Rodar o Projeto
### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/seu-usuario/agenda-contatos.git
cd agenda-contatos
```
### 2️⃣ Instalar dependências
```sh
yarn install
# ou
npm install
```
### 3️⃣ Rodar o servidor backend (JSON Server)
```sh
yarn json-server --watch db.json --port 5000
# ou
npx json-server --watch db.json --port 5000
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

## 💡 Melhorias Futuras
- 📱 Melhorar a interface mobile.
- 📧 Adicionar campo de e-mail nos contatos.
- 🔔 Notificações para eventos importantes.