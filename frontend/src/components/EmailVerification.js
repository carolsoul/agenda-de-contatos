// Importações de hooks e recursos
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ImgPassword2 from "../assets/img_password_2.png";
import "../EmailVerification.css";

// Componente de verificação de e-mail com código
const EmailVerification = () => {
  // Estado que armazena os 5 dígitos do código
  const [code, setCode] = useState(["", "", "", "", ""]);
  // Mensagem de feedback (sucesso ou erro)
  const [message, setMessage] = useState(null);
  // Referências para os inputs de código (usado para mover o foco)
  const inputRefs = useRef([]);

  // Atualiza o valor de um dos inputs de código
  const handleChange = (index, value) => {
    // Permite apenas números
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move o foco para o próximo campo automaticamente
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Volta o foco para o input anterior se apertar backspace em um campo vazio
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Hook de navegação para redirecionar o usuário
  const navigate = useNavigate();

  // Valida o código inserido e exibe a mensagem apropriada
  const handleSubmit = () => {
    const enteredCode = code.join(""); // Junta os números digitados

    if (enteredCode === "12345") { // Código de verificação correto
      setMessage({ text: "Código correto! Verificação concluída.", type: "success" });

      // Após 2.5 segundos, redireciona para a página de nova senha
      setTimeout(() => {
        navigate("/NewPassword");
      }, 2500);

    } else {
      // Código incorreto
      setMessage({ text: "Código inválido. Tente novamente.", type: "error" });
    }

    // Limpa a mensagem após 2.5 segundos
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className='email-verification'>
      <h2 className='verification-title'>Verifique seu E-mail</h2>

      {/* Imagem ilustrativa */}
      <div className='password-img-2'>
        <img src={ImgPassword2} alt="Descrição da imagem" />
      </div>

      {/* Texto explicativo */}
      <p className='verification-parag'>
        Enviamos um código de 5 dígitos para o seu E-mail, digite-o nos campos abaixo.
      </p>

      {/* Inputs para os dígitos do código */}
      <div className="code-inputs">
        {code.map((num, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)} // Referência para controle de foco
            type="text"
            maxLength="1" // Apenas 1 número por campo
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      {/* Exibe mensagem de erro ou sucesso */}
      {message && <p className={`message ${message.type}`}>{message.text}</p>}

      {/* Botão para enviar o código */}
      <button type="submit" className='verification-btn' onClick={handleSubmit}>
        Próximo
      </button>
    </div>
  );
};

export default EmailVerification;