// Importações
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Para redirecionamento de rota
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones
import ImgPassword3 from "../assets/img_password_3.png"; // Imagem ilustrativa
import "../NewPassword.css"; // Estilo específico

const NewPassword = () => {
  // Estados para armazenar as senhas e controle visual
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null); // Mensagem de erro/sucesso
  const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar senha
  const [showConfirm, setShowConfirm] = useState(false); // Mostrar/ocultar confirmação
  const navigate = useNavigate(); // Hook para redirecionar

  // Verifica os critérios mínimos de senha
  const checkPasswordRules = (pwd) => ({
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  });

  // Verifica se todos os critérios foram atendidos
  const isPasswordValid = (pwd) => {
    const rules = checkPasswordRules(pwd);
    return Object.values(rules).every(Boolean); // Retorna true se todos forem verdadeiros
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se a senha é forte o suficiente
    if (!isPasswordValid(password)) {
      setMessage({ text: "A senha não atende aos critérios mínimos.", type: "error" });
      setTimeout(() => setMessage(null), 2500);
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage({ text: "As senhas não coincidem. Tente novamente.", type: "error" });
      setTimeout(() => setMessage(null), 2500);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/usuario/NewPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "annacaroll2005@gmail.com", // Ou passa dinamicamente se tiver esse dado em algum estado
          oldPassword: "11Ajl2005!", // Ou também dinamicamente
          newPassword: password
        })
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Erro ao alterar senha");
      }
    
      setMessage({ text: "Senha alterada com sucesso!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
      setTimeout(() => setMessage(null), 2500);
      return;
    }    
  };

  return (
    <main className="new-main">
      <h2 className='new-title'>Tudo certo!</h2>

      <div className='new-box'>
        <div className='password-img-3'>
          <img src={ImgPassword3} alt="Confirmação" />
        </div>

        {/* Formulário de redefinição */}
        <form className='new-form' onSubmit={handleSubmit}>

          <p className='password-parag-2'>Agora digite e confirme sua nova senha nos campos abaixo.</p>

          {/* Campo de senha */}
          <div className="group">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Lista de critérios visuais, exibida apenas quando o usuário começa a digitar */}
          {password && (
            <div className="password-rules">
              <p className={checkPasswordRules(password).length ? "valid" : "invalid"}>
                {checkPasswordRules(password).length ? "✅" : "❌"} Mínimo de 8 caracteres
              </p>
              <p className={checkPasswordRules(password).uppercase ? "valid" : "invalid"}>
                {checkPasswordRules(password).uppercase ? "✅" : "❌"} Uma letra maiúscula
              </p>
              <p className={checkPasswordRules(password).lowercase ? "valid" : "invalid"}>
                {checkPasswordRules(password).lowercase ? "✅" : "❌"} Uma letra minúscula
              </p>
              <p className={checkPasswordRules(password).number ? "valid" : "invalid"}>
                {checkPasswordRules(password).number ? "✅" : "❌"} Um número
              </p>
              <p className={checkPasswordRules(password).specialChar ? "valid" : "invalid"}>
                {checkPasswordRules(password).specialChar ? "✅" : "❌"} Um caractere especial
              </p>
            </div>
          )}

          {/* Campo de confirmação de senha */}
          <div className="group">
            <FaLock className="icon" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="toggle-eye" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Mensagem de feedback (erro ou sucesso) */}
          {message && <p className={`message ${message.type}`}>{message.text}</p>}

          {/* Botão de envio */}
          <button type="submit" className='new-btn'>Próximo</button>
        </form>
      </div>
    </main>
  );
};

export default NewPassword;
