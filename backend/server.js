import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { EventEmitter } from "events";

EventEmitter.defaultMaxListeners = 20;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Timeout para requisições lentas
app.use((req, res, next) => {
  res.setTimeout(5000, () => {
    res.status(408).send("Request Timeout");
  });
  next();
});

// Conexão com o banco de dados
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Testando conexão
db.query("SELECT 1")
  .then(() => console.log("Banco conectado com sucesso!"))
  .catch(err => console.error("Erro na conexão com o banco:", err));

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificar conexão SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error("Erro ao conectar com o serviço de e-mail:", error);
  } else {
    console.log("Servidor de e-mail pronto para enviar mensagens:", success);
  }
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Rota para buscar os dados do usuário
app.get("/usuario", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "user_id não fornecido" });
  }

  try {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

app.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);

    if (!result.length) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(result[0]); // Retorna apenas o objeto do usuário
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno ao buscar usuário" });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    console.log("Recebendo requisição de login...");

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "O corpo da requisição está vazio ou mal formado." });
    }

    const { email, password } = req.body;
    console.log(`E-mail recebido: ${email}`);

    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    console.log("Resultados da consulta:", rows);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const user = rows[0];
    console.log("Senha armazenada no banco:", user.senha);

    // Comparação da senha
    const passwordMatch = await bcrypt.compare(password, user.senha);
    console.log("Comparação da senha:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    console.log("Login bem-sucedido!");
    res.json({ message: "Login realizado com sucesso!", user: { id: user.id, nome: user.nome } });

  } catch (error) {
    console.error("Erro ao processar login:", error);
    res.status(500).json({ message: "Erro interno no servidor", details: error.message });
  }
});

// Registro de usuário
app.post("/register", async (req, res) => {
  const { nome, phone, email, password } = req.body;

  if (!nome || !phone || !email || !password) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  try {
    const [rows] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ success: false, message: "E-mail já cadastrado." });
    }

    // 🔹 Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO usuarios (nome, user_phone, email, senha) VALUES (?, ?, ?, ?)", [nome, phone, email, hashedPassword]);

    res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ success: false, message: "Erro interno no servidor." });
  }
});


// Trocar senha
app.put("/usuario/NewPassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "E-mail, senha antiga e nova senha são obrigatórios" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(oldPassword, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha antiga incorreta" });
    }

    if (await bcrypt.compare(newPassword, user.senha)) {
      return res.status(400).json({ message: "A nova senha não pode ser igual à antiga" });
    }

    // 🔹 Criptografa a nova senha antes de salvar
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db.query("UPDATE usuarios SET senha = ? WHERE email = ?", [hashedPassword, email]);

    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar a senha" });
  }
});

app.get("/contatos", async (req, res) => {
  try {
    const { usuario_id } = req.query; // Pegando o usuário da URL

    if (!usuario_id) {
      return res.status(400).json({ message: "Erro: usuário não especificado!" });
    }

    const [result] = await db.query("SELECT * FROM contatos WHERE usuario_id = ?", [usuario_id]);

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    res.status(500).json({ message: "Erro interno ao buscar contatos." });
  }
});


app.post("/contatos", async (req, res) => {
  try {
    const { usuario_id, contact_name, phone, email, address, photo, favorite, category } = req.body;
    
    // Define um valor padrão para `group` (caso não seja enviado pelo frontend)
    const group = "green"; // Ou "purple", conforme sua lógica de alternância

    const [result] = await db.query(
      "INSERT INTO contatos (usuario_id, contact_name, phone, email, address, photo, favorito, category, `group`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [usuario_id, contact_name, phone, email, address, photo, favorite, category, group]
    );

    res.status(201).json({ message: "Contato adicionado com sucesso!", contact_id: result.insertId });
  } catch (error) {
    console.error("Erro ao adicionar contato:", error);
    res.status(500).json({ message: "Erro interno ao adicionar contato." });
  }
});

app.get("/contatos/usuario/:usuario_id", async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const [result] = await db.query("SELECT * FROM contatos WHERE usuario_id = ?", [usuario_id]);

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    res.status(500).json({ message: "Erro interno ao buscar contatos." });
  }
});

app.get("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recebido na API:", req.params.id);
    const [result] = await db.query("SELECT * FROM contatos WHERE id = ?", [id]);

    console.log("Resultado da query:", result); // ✅ Veja no console se há dados

    if (!result.length) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    res.json(result[0]); // ✅ Retorna apenas o objeto do contato
  } catch (error) {
    console.error("Erro ao buscar contato:", error);
    res.status(500).json({ message: "Erro interno ao buscar contato" });
  }
});

app.put("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body; // Pegando apenas o campo que precisa ser atualizado

    console.log("ID recebido para favoritar:", id); // ✅ Veja no console se o ID está correto
    console.log("Novo status de favorito:", favorite); // ✅ Confirme se o valor está correto

    const [result] = await db.query("UPDATE contatos SET favorito = ? WHERE id = ?", [favorite, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    res.json({ message: "Contato atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar contato:", error);
    res.status(500).json({ message: "Erro interno ao atualizar contato." });
  }
});

app.delete("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID recebido para exclusão:", id); // ✅ Veja no console se o ID está correto

    const [result] = await db.query("DELETE FROM contatos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    res.json({ message: "Contato excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
    res.status(500).json({ message: "Erro interno ao excluir contato." });
  }
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
