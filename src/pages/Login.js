import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // Simulação de login (substituir depois pela chamada de API)
    if (email === "teste@gmail.com" && password === "123456") {
      alert("Login realizado com sucesso!");
      navigate("/home");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (
    <main className="login-main">
      <div className="box">
        <h1>
          SUA REDE DE CONTATOS, <br />
          SEM <br />
          COMPLICAÇÕES.
        </h1>

        <form onSubmit={handleSubmit}>

            <div className="group">
                <FaEnvelope className="icon"/>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="group">
                <FaLock className="icon" />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="login-btn">Entrar</button>
        </form>

          <div className="info">
            <p>
              Não tem uma conta? <a onClick={() => navigate("/SignIn")}>Cadastre-se</a>
            </p>
            <p>
              Esqueceu sua senha? <a>Recupere sua conta</a>
            </p>
            <br />
            <img src="logo-orbita-small" alt="logo-orbita" />
          </div>
    </div>
    </main>
  );
}

export default Login;