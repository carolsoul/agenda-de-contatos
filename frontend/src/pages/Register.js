import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../Register.css";

function Register() {
  // Estados para armazenar os valores dos campos do formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado para mensagens de erro ou sucesso
  const [message, setMessage] = useState(null);

  // Estados para alternar a visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Função de validação de senha: mínimo 8 caracteres, pelo menos uma maiúscula, uma minúscula e um número
  const validatePassword = (pwd) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd)
    );
  };

  // Lógica de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os e-mails coincidem
    if (email !== confirmEmail) {
      setMessage({ text: "Os e-mails não coincidem.", type: "error" });
      return;
    }

    // Valida a senha
    if (!validatePassword(password)) {
      setMessage({
        text:
          "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.",
        type: "error",
      });
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage({ text: "As senhas não coincidem.", type: "error" });
      return;
    }

    // Simula o cadastro com sucesso
    console.log("Cadastro realizado com:", { name, phone, email, password });
    setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });

    // Redireciona para a página de login após 2 segundos
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <main className="register-main">
      <div className="register-box">
        <h1 className="register-title">
          FAÇA SEU
          <br />
          CADASTRO
        </h1>

        {/* Formulário de cadastro */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-group">
            {/* Campo de nome */}
            <div className="group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Campo de telefone */}
            <div className="group">
              <FaPhone className="icon" />
              <input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

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

            {/* Campo para confirmar e-mail */}
            <div className="group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Confirmar e-mail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo de senha com ícone para mostrar/ocultar */}
            <div className="group">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Campo para confirmar senha com ícone para mostrar/ocultar */}
            <div className="group">
              <FaLock className="icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Exibição de mensagens de erro ou sucesso */}
          {message && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}

          {/* Botão de envio do formulário */}
          <button type="submit" className="register-btn">
            Criar conta
          </button>
        </form>

      </div>

      {/* Informações adicionais e links */}
      <div className="register-info">
          <p>
            Já tem uma conta? <Link to="/">Faça login</Link>
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

export default Register;