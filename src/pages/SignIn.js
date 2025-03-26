import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock} from "react-icons/fa";
import "../SignIn.css";

function Cadastro() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro realizado com:", { name, phone, email, password });
    navigate("/"); // Redireciona para login após cadastro
  };

  return (
    <main className="sign-main">
      <div className="sign-container">
        <h1 className="sign-title">
          FAÇA SEU 
          <br/> 
          CADASTRO
        </h1>

        <form onSubmit={handleSubmit}>

            <div className="sign-group">

            <div className="group">
              <FaUser className="icon" />
              <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>

            <div className="group">
              <FaPhone className="icon" />
              <input type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>

            <div className="group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="group">
              <FaLock className="icon" />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            </div>

            <button type="submit" className="sign-btn">Criar conta</button>
        </form>

          <div className="info">
            <p>
              Já tem uma conta? <a onClick={() => navigate("/")}>Faça login</a>
            </p>
            <p>
              Esqueceu sua senha? <a>Recupere</a>
            </p>
            <br />
            <img src="logo-orbita-small" alt="logo-orbita" />
          </div>
      </div>
    </main>
  );
}

export default Cadastro;
