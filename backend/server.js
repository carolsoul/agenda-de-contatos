import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { EventEmitter } from "events";
import { text } from "stream/consumers";

EventEmitter.defaultMaxListeners = 20;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Timeout para requisições lentas
app.use((req, res, next) => {
  res.setTimeout(5000, () => {
    return res.status(408).send("Request Timeout");
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

// E-mail com o código de recuperação de senha
async function enviarCodigo(email, codigo) {
  try {
    const mailOptions = {
      from: '"Suporte - Órbita" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: "Código de Recuperação",
      text: `Seu código de recuperação é:
      
      ${codigo}. 
      
      Digite-o na página de verificação para redefinir sua senha.
              
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Código de recuperação enviado para: ${email}`);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

// E-mail de boas-vindas
const enviarBoasVindas = async (email, nome) => {
  const mailOptions = {
    from: '"Órbita" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: "Seu cadastro foi concluído com sucesso!",
    html: `
        <main>
          <h1 style="color: #7D00FF;">Bem-vindo(a) à sua nova agenda de contatos</h1>
    
          <h2>Olá, ${nome}! 👋</h2>

           <p> Estamos felizes por tê-lo(a) conosco.</p>
           <p>Agora você tem acesso a uma plataforma completa para gerenciar seus contatos sem complicações.</p>
           <br>
            <div class="benefits">
              <h3 style="color: #7D00FF;">O que você ganha ao usar nossa plataforma?</h3>
              <ul>
                <li>📞 Organização eficiente dos seus contatos.</li>
                <br>
                <li>⭐ Marcação de favoritos para acesso rápido.</li>
                <br>
                <li>🔍 Busca avançada para encontrar informações rapidamente.</li>
                <br>
                <li>🛠 Interface intuitiva e fácil de usar.</li>
              </ul>
            </div>

            <br>

            <h3>Comece agora explorando tudo o que podemos oferecer!</h3>

            <br> 
            <p>Se precisar de ajuda, estamos sempre por aqui.</p>
           <p>Atenciosamente, <br> Equipe de Suporte Orbita</p>

           <br>

           <footer style="background-color: #2B2B2B; text-align: center; padding: 10px; font-size: 15px; color: #FFF;">
            <p>&copy; 2025 Órbita. Todos os direitos reservados.</p>
          </footer>
        </main>
           `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado para:", email);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};

// Função para gerar um código aleatório de 5 dígitos
const generateVerificationCode = () => {
  return Math.floor(10000 + Math.random() * 90000); // Gera um número entre 10000 e 99999
};


// Rota de teste
app.get("/", (req, res) => {
  return res.send("API funcionando!");
});

// Rota para buscar os dados do usuário
app.get("/usuario", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "usuario_id não fornecido" });
  }

  try {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

app.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);

    if (!result.length) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(result[0]); 
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro interno ao buscar usuário" });
  }
});

// Rota para mostrar os contatos do usuário na Home
app.get("/contatos/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM contatos WHERE usuario_id = ?", [id]);

    if (!result.length) {
      return res.status(404).json({ message: "Nenhum contato encontrado para este usuário" });
    }

    return res.json(result);
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return res.status(500).json({ message: "Erro interno ao buscar contatos" });
  }
});

// Rota para obter um contato específico por ID
app.get("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM contatos WHERE id = ?", [id]);

    if (!result.length) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    return res.json(result[0]);
  } catch (error) {
    console.error("Erro ao buscar contato:", error);
    return res.status(500).json({ message: "Erro interno ao buscar contato", details: error.message });
  }
});


// Rota de login
app.post("/login", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "O corpo da requisição está vazio ou mal formado." });
    }

    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    return res.json({ message: "Login realizado com sucesso!", user: { id: user.id, nome: user.nome } });

  } catch (error) {
    console.error("Erro ao processar login:", error);
    return res.status(500).json({ message: "Erro interno no servidor", details: error.message });
  }
});

// Registro de usuário
app.post("/register", async (req, res) => {
  const { nome, user_phone, email, senha } = req.body;

  if (!nome || !user_phone || !email || !senha) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  try {
    const [rows] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ success: false, message: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    await db.query("INSERT INTO usuarios (nome, user_phone, email, senha) VALUES (?, ?, ?, ?)", [nome, user_phone, email, hashedPassword]);

    await enviarBoasVindas(email, nome);

    return res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    return res.status(500).json({ success: false, message: "Erro interno no servidor." });
  }
});

// Rota para adicionar um contato
app.post("/contatos", async (req, res) => {
  try {
    const { usuario_id, contact_name, phone, email, address, photo, category } = req.body;

    // Verifica se campos obrigatórios estão preenchidos
    if (!usuario_id || !contact_name || !phone || !email) {
      return res.status(400).json({ message: "Usuário, nome e telefone são obrigatórios." });
    }

    // Define `group` automaticamente com base na primeira letra do nome
    const firstLetter = contact_name[0].toUpperCase();
    const group = (firstLetter.charCodeAt(0) - 65) % 2 === 0 ? "green" : "purple";

    // Insere contato no banco de dados
    const [result] = await db.query(
      "INSERT INTO contatos (usuario_id, contact_name, phone, email, address, photo, category, `group`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [usuario_id, contact_name, phone, email, address, photo, category, group]
    );

    return res.status(201).json({ message: "Contato adicionado com sucesso!", contato_id: result.insertId });
  } catch (error) {
    console.error("Erro ao adicionar contato:", error);
    return res.status(500).json({ message: "Erro interno ao adicionar contato", details: error.message });
  }
});

// Rota de confirmação do email e envio do codigo

app.post("/email-confirmation", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "E-mail obrigatório." });
  }

  try {
    const [rows] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "E-mail não encontrado." });
    }

    const recoveryCode = Math.floor(10000 + Math.random() * 90000).toString();

    // Armazena o e-mail e o código de recuperação na mesma tabela
    await db.query(
      `REPLACE INTO codigos_recuperacao (email, codigo, criado_em) VALUES (?, ?, NOW())`,
      [email, recoveryCode]
    );

    await enviarCodigo(email, recoveryCode);

    return res.status(200).json({ success: true, message: "Código enviado para seu e-mail." });

  } catch (error) {
    console.error("Erro na recuperação de senha:", error);
    return res.status(500).json({ success: false, message: "Erro interno no servidor." });
  }
});


// Rota que verifica o código do usuário

app.post("/code-verification", async (req, res) => {
  const { recoveryCode } = req.body;

  console.log("📩 Código recebido para verificação:", recoveryCode);

  if (!recoveryCode) {
    return res.status(400).json({ success: false, message: "Código inválido." });
  }

  try {
    const [rows] = await db.query("SELECT email, criado_em FROM codigos_recuperacao WHERE codigo = ?", [recoveryCode]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Código expirado ou inválido." });
    }
    
    const email = rows[0].email;
    const codigoCriado = new Date(rows[0].criado_em);
    const agora = new Date();
    const minutosPassados = (agora - codigoCriado) / 1000 / 60;

    if (minutosPassados > 5) {
      await db.query("DELETE FROM codigos_recuperacao WHERE email = ?", [email]);
      return res.status(400).json({ success: false, message: "Código expirado." });
    }

    return res.status(200).json({ success: true, message: "Código validado com sucesso!", email });

  } catch (error) {
    console.error("Erro na verificação de código:", error);
    return res.status(500).json({ success: false, message: "Erro interno no servidor." });
  }
});

// Rota de atualização de senha
app.put("/new-password", async (req, res) => {
  const { newPassword, recoveryCode } = req.body;

  if (!newPassword || !recoveryCode) {
    return res.status(400).json({ success: false, message: "Código e nova senha são obrigatórios." });
  }

  try {
    const [rows] = await db.query("SELECT email FROM codigos_recuperacao WHERE codigo = ?", [recoveryCode]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Código inválido ou expirado." });
    }

    const email = rows[0].email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query("UPDATE usuarios SET senha = ? WHERE email = ?", [hashedPassword, email]);
    await db.query("DELETE FROM codigos_recuperacao WHERE email = ?", [email]); // Exclui o código após uso

    return res.status(200).json({ success: true, message: "Senha atualizada com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res.status(500).json({ success: false, message: "Erro interno no servidor." });
  }
});

// Rota de atualização de contato
app.put("/contatos/:id", async (req, res) => {
  try {
    const { contact_name, phone, email, address, category, favorito, photo } = req.body;
    await db.query(
      "UPDATE contatos SET contact_name = ?, phone = ?, email = ?, address = ?, category = ?, favorito = ?, photo = ? WHERE id = ?",
      [contact_name, phone, email, address, category, favorito, photo, req.params.id]
    );

    return res.json({ message: "Contato atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar contato:", error);
    return res.status(500).json({ message: "Erro interno ao atualizar contato." });
  }
});

// Rota específica para favoritar um contato
app.put("/contatos/:id/favoritar", async (req, res) => {
  try {
    const { id } = req.params;
    const { favorito } = req.body;

    const [result] = await db.query("UPDATE contatos SET favorito = ? WHERE id = ?", [favorito, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    return res.json({ message: "Contato atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao favoritar contato:", error);
    return res.status(500).json({ message: "Erro interno ao atualizar favorito", details: error.message });
  }
});


// Exclusão de contato
app.delete("/contatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM contatos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    return res.json({ message: "Contato excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
    return res.status(500).json({ message: "Erro interno ao excluir contato." });
  }
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});