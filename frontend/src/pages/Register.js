import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../Register.css";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkPasswordRules = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[\W_]/.test(password) // Pelo menos um caractere especial
  });

  const isPasswordValid = (password) => {
    const rules = checkPasswordRules(password);
    return Object.values(rules).every(Boolean);
  }

  const validatePhone = (phone) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone); // Formato global E.164
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setMessage({ text: "Os e-mails não coincidem.", type: "error" });
      return;
    }

    if (!validatePhone(phone)) {
      setMessage({ text: "Telefone inválido. Use formato correto!", type: "error" });
      return;
    }

    if (!isPasswordValid(password)) {
      setMessage({
        text: "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "As senhas não coincidem.", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, user_phone: phone, email, senha: password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        setMessage({ text: "Resposta inesperada do servidor.", type: "error" });
        setLoading(false);
        return;
      }

      if (response.ok && data.success) {
        setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });
        setTimeout(() => navigate("/"), 2500);
      } else {
        setMessage({ text: data.message || "Erro ao cadastrar.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Erro ao conectar com o servidor.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-main">
      <div className="register-box">
        <h1 className="register-title">FAÇA SEU CADASTRO</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-group">
            <div className="group">
              <FaUser className="icon" />
              <input id="name" type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="group">
              <FaPhone className="icon" />
              <input id="phone" type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="group">
              <FaEnvelope className="icon" />
              <input id="email" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="group">
              <FaEnvelope className="icon" />
              <input id="confirmEmail" type="email" placeholder="Confirmar e-mail" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
            </div>

            <div className="group">
              <FaLock className="icon" />
              <input id="password" type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {password && (
              <div className="password-rules">
                {Object.entries(checkPasswordRules(password)).map(([rule, valid]) => (
                  <p key={rule} className={valid ? "valid" : "invalid"}>
                    {valid ? "✅" : "❌"} {rule === "length" ? "Mínimo de 8 caracteres" : 
                      rule === "uppercase" ? "Uma letra maiúscula" : 
                      rule === "lowercase" ? "Uma letra minúscula" :
                      rule === "number" ? "Um número" : 
                      "Um caractere especial"}
                  </p>
                ))}
              </div>
            )}

            <div className="group">
              <FaLock className="icon" />
              <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          {message && <p className={`message ${message.type}`}>{message.text}</p>}
          {loading && <p className="loading">Criando conta...</p>}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Enviando..." : "Criar conta"}
          </button>
        </form>
      </div>

      <div className="register-info">
        <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
        <p>Esqueceu sua senha? <Link to="/email-confirmation">Recupere sua conta</Link></p>
      </div>
    </main>
  );
}

export default Register;
