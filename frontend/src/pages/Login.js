import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ text: "Preencha todos os campos!", type: "login-error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Erro ao processar resposta JSON:", error);
        setMessage({ text: "Resposta inesperada do servidor.", type: "login-error" });
        setLoading(false);
        return;
      }

      if (response.ok) {
        setMessage({ text: "Login realizado com sucesso!", type: "login-success" });
        if (data.user && data.user.id) {
          localStorage.setItem("id", data.user.id);
        } else {
          console.error("Erro: ID do usuário não encontrado na resposta do servidor.");
        }

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setMessage({ text: data.message || "Erro ao fazer login.", type: "login-error" });
      }
    } catch (error) {
      setMessage({ text: "Erro de conexão com o servidor.", type: "login-error" });
    }

    setLoading(false);
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
          {message && <p className={`login-message ${message.type}`} role="alert">{message.text}</p>}
          {loading && <p className="loading">Carregando...</p>}

          <div className="group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="group">
            <FaLock className="icon" />
            <input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>

      <div className="login-info">
        <p>Não tem uma conta? <Link to="/Register">Cadastre-se</Link></p>
        <p>Esqueceu sua senha? <Link to="/email-confirmation">Recupere sua conta</Link></p>
      </div>
    </main>
  );
}

export default Login;
