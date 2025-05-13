// Importações
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Para redirecionamento de rota
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones
import ImgPassword3 from "../assets/img_password_3.png"; // Imagem ilustrativa
import "../NewPassword.css"; // Estilo específico

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // 🔥 Recupera o e-mail e o código de recuperação do estado de navegação
  const location = useLocation();
  const email = location.state?.email;
  const recoveryCode = location.state?.recoveryCode;

  console.log("📩 Email recebido via state:", email);
  console.log("🔑 Código de recuperação recebido:", recoveryCode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !recoveryCode) {
      setMessage({ text: "Erro ao recuperar os dados. Volte e tente novamente.", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "As senhas não coincidem.", type: "error" });
      setTimeout(() => setMessage(null), 2500);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/new-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password, recoveryCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao alterar senha.");
      }

      setMessage({ text: "Senha alterada com sucesso!", type: "success" });
      setTimeout(() => navigate("/"), 2500);
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
      setTimeout(() => setMessage(null), 2500);
    }
  };

  return (
    <main className="new-main">
      <h2 className="new-title">Tudo certo!</h2>

      <div className="new-box">
        <div className="password-img-3">
          <img src={ImgPassword3} alt="Confirmação" />
        </div>

        <form className="new-form" onSubmit={handleSubmit}>
          <p className="password-parag-2">Agora digite e confirme sua nova senha nos campos abaixo.</p>

          <div className="group">
            <FaLock className="icon" />
            <input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="group">
            <FaLock className="icon" />
            <input type={showConfirm ? "text" : "password"} placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="toggle-eye" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {message && <p className={`message ${message.type}`}>{message.text}</p>}

          <button type="submit" className="new-btn">Alterar senha</button>
        </form>
      </div>
    </main>
  );
};

export default NewPassword;
