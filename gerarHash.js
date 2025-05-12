const bcrypt = require("bcrypt");

async function gerarSenhaHash() {
  const senha = "senha123"; // A senha original (coloque aqui a senha desejada)
  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);
  console.log("Senha criptografada:", senhaHash);
}

gerarSenhaHash();
