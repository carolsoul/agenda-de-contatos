// Importações de hooks e recursos
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Agora também importamos useLocation
import ImgPassword2 from "../assets/img_password_2.png";
import "../EmailVerification.css";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Recupera o e-mail passado da tela anterior via navegação
  const email = location.state?.email;

  console.log("📩 Email recebido via state:", email);

  // Atualiza o valor de um dos inputs de código
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Volta o foco para o input anterior se apertar backspace em um campo vazio
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Valida o código inserido e passa o e-mail para `NewPassword.js`
  const handleSubmit = async () => {
    const enteredCode = code.join("");

    if (code.some((digit) => digit === "")) {
      setMessage({ text: "Por favor, preencha todos os dígitos.", type: "error" });
      return;
    }

    if (!email) {
      setMessage({ text: "E-mail não encontrado. Retorne à etapa anterior.", type: "error" });
      return;
    }

    console.log("📩 Enviando código para verificação:", enteredCode);

    try {
      const response = await fetch("http://localhost:3000/code-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recoveryCode: enteredCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setTimeout(() => {
          navigate("/new-password", { state: { email: data.email, recoveryCode: enteredCode } });
        }, 2500);
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Erro ao verificar código.", type: "error" });
    }

    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <main className="verification-main">
      <h2 className="verification-title">Verifique seu E-mail</h2>

      <div className="verification-box">
        <div className="password-img-2">
          <img src={ImgPassword2} alt="Descrição da imagem" />
        </div>

        <div className="verification-form">
          <p className="verification-parag">
            Enviamos um código de <b>5 dígitos</b> para o seu E-mail (verifique sua caixa de spam), digite-o nos campos abaixo.
          </p>

          <div className="code-inputs">
            {code.map((num, index) => (
              <input
                key={index}
                inputMode="numeric"
                aria-label={`Dígito ${index + 1}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {message && <p className={`message ${message.type}`}>{message.text}</p>}

          <button type="submit" className="verification-btn" onClick={handleSubmit}>
            Próximo
          </button>
        </div>
      </div>
    </main>
  );
};

export default EmailVerification;
