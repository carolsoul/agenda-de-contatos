import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Verifica se todos os campos estão preenchidos
    if (!email || !password) {
      setMessage({ text: "Preencha todos os campos!", type: "login-error" });
      return;
    }

    // Simulação de login que vai ser substituída futuramente por uma chamada de API
    if (email === "teste@gmail.com" && password === "123456") {
      // Login bem-sucedido
      setMessage({
        text: "Login realizado com sucesso!",
        type: "login-success",
      });

      // Redireciona para a home após 2,5 segundos
      setTimeout(() => {
        navigate("/home");
      }, 2500);
    } else {
      // Credenciais incorretas
      setMessage({
        text: "E-mail ou senha inválidos. Tente novamente.",
        type: "login-error",
      });
    }

    // Limpa a mensagem após 2,5 segundos
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <main className="login-main">
      <div className="login-box">
        <h1 className="login-title">
          SUA REDE DE <br /> CONTATOS, <br />
          SEM <br />
          COMPLICAÇÕES.
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Exibe mensagem de sucesso ou erro */}
          {message && (
            <p className={`login-message ${message.type}`} role="alert">
              {message.text}
            </p>
          )}

          {/* Campo de e-mail */}
          <div className="group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão de login */}
          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
      {/* Informações extras com links para cadastro e recuperação de senha */}
      <div className="login-info">
          <p>
            Não tem uma conta? <Link to="/Register">Cadastre-se</Link>
          </p>
          <p>
            Esqueceu sua senha?{" "}
            <Link to="/PasswordRecovery">Recupere sua conta</Link>
          </p>
          <br />
          <img src="logo-orbita-small" alt="logo-orbita" />
        </div>
    </main>
  );
}

export default Login;