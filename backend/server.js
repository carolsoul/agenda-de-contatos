import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Teste de conexão
db.connect()
  .then(() => console.log("Conectado ao MySQL"))
  .catch((err) => console.error("Erro ao conectar ao MySQL:", err));

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Listar todos os contatos
app.get("/contatos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contatos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contatos" });
  }
});

// Adicionar um novo contato
app.post("/contatos", async (req, res) => {
  const { contact_name, phone, email, address, category, favorite } = req.body;

  if (!contact_name || !phone || !email) {
    return res.status(400).json({ error: "Nome, telefone e e-mail são obrigatórios" });
  }

  const firstLetter = contact_name[0].toUpperCase();
  const groupColor = firstLetter.charCodeAt(0) % 2 === 0 ? "green" : "purple";

  try {
    const result = await db.query(
      "INSERT INTO contatos (contact_name, phone, email, address, `group`, category, favorite) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [contact_name, phone, email, address, groupColor, category, favorite]
    );
    res.status(201).json({ message: "Contato adicionado!", id: result[0].insertId });
  } catch (error) {
    console.error("Erro ao adicionar contato:", error);
    res.status(500).json({ error: "Erro ao adicionar contato" });
  }
});

// Buscar um contato por ID
app.get("/contatos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM contatos WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contato" });
  }
});

// Atualizar um contato
app.put("/contatos/:id", async (req, res) => {
  const { id } = req.params;
  const { contact_name, phone, email, address, favorite, category } = req.body;

  try {
    await db.query(
      "UPDATE contatos SET contact_name = ?, phone = ?, email = ?, address = ?, favorite = ?, category = ? WHERE id = ?",
      [contact_name, phone, email, address, favorite, category, id]
    );
    res.json({ message: "Contato atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar contato" });
  }
});

// Excluir um contato
app.delete("/contatos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM contatos WHERE id = ?", [id]);
    res.json({ message: "Contato excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir contato" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
