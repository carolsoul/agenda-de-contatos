# 📒 Agenda de Contatos


Aplicação web para cadastro e login de usuários, com foco em organização de contatos de forma prática, moderna e intuitiva desenvolvida com **React** e **Node.js**.

## 🚀 Funcionalidades
- ✅ Cadastro de novo usuário com validações de e-mail e senha.
- 🔐 Login com verificação de credenciais simulada.
- 📂 Organizar contatos em ordem alfabética, filtros por data de criação e categoria.
- ⚠️ Feedback visual de erros e sucessos.
- 🧩 Ícones intuitivos nos campos de formulário.
- 🚀 Navegação entre páginas com React Router.
- 📱 Estilo limpo e responsivo

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, CSS
- **Backend:** Node.js, API REST
- **Banco de Dados:** MySQL

## 📂 Estrutura do Projeto
```
📦 agenda-contatos
├── 📂 backend
│   ├── 📂 node_modules
│   ├── .env
│   ├── .sql
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
├── 📂 frontend
│   ├── 📂 node_modules
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   │   ├── img_password_1.png
│   │   │   ├── img_password_2.png
│   │   │   ├── img_password_3.png
│   │   │   ├── logo-orbita-green.svg
│   │   ├── 📂 components
│   │   │   ├── AuthContext.js
│   │   │   ├── ContactForm.js
│   │   │   ├── ContactList.js
│   │   │   ├── EmailVerification.js
│   │   │   ├── NewPassword.js
│   │   │   ├── PasswordRecovery.js
│   │   ├── 📂 pages
│   │   │   ├── AddContact.js
│   │   │   ├── ContactDetails.js
│   │   │   ├── EditContact.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── ContactDetails.css
│   │   ├── ContactForm.css
│   │   ├── EditContact.css
│   │   ├── EmailVerification.css
│   │   ├── Home.css
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── Login.css
│   │   ├── NewPassword.css
│   │   ├── PasswordRecovery.css
│   │   ├── Register.css
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
├── gerarHash.js
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
Acesse **http://localhost:3001** no navegador.

## 📜 Padrões de Commit
Seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- **feat:** Adicionar nova funcionalidade.
- **fix:** Corrigir um erro.
- **docs:** Alterações na documentação.
- **style:** Ajustes de formatação (espaços, indentação, etc.).
- **refactor:** Melhorias no código sem alterar funcionalidades.
- **test:** Adição ou modificação de testes.
- **chore:** Outras mudanças que não afetam o código-fonte.