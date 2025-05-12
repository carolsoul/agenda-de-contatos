// Importa os hooks e dependências
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { FaEnvelope } from "react-icons/fa"; // Ícone de envelope
import ImgPassword1 from "../assets/img_password_1.png" // Imagem ilustrativa
import "../PasswordRecovery.css"; // Estilo CSS específico para o componente

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Função executada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    try {
      // Enviar o e-mail para o servidor
      const response = await fetch("http://localhost:3000/PasswordRecovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", email);

        setMessage({ text: "Link de recuperação enviado para o seu e-mail!", type: "email-success" });

        setTimeout(() => {
          navigate("/EmailVerification"); // Redireciona para a tela de verificação
        }, 2500);
      } else {
        setMessage({ text: data.message || "Erro ao enviar o e-mail.", type: "email-error" });
      }
    } catch (error) {
      setMessage({ text: "Erro ao conectar com o servidor.", type: "email-error" });
    }
  };

  return (
    <main className="password-main">

      <div className='password-title-container'>
      <h2 className='password-title'>Esqueceu sua senha?</h2>
      <p className='password-parag'>Não se preocupe, vamos te ajudar!</p>
      </div>

      <div className='password-box'>
        <div className='password-img-1'>
          <img src={ImgPassword1} alt="Descrição da imagem" />
        </div>

        {/* Formulário para inserção do e-mail */}
        <form className='password-form' onSubmit={handleSubmit}>

          <p className='password-parag-2'>Por favor digite seu E-mail para receber o código de verificação.</p>

          <div className="group">
            {/* Ícone e campo de entrada */}
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Exibe mensagem de feedback, se houver */}
          {message && <p className={`email-message ${message.type}`}>{message.text}</p>}

          <button type="submit" className='password-btn'>Próximo</button>

          {/* Botão de cancelar (volta para a home) */}
          <button className='cancel-btn' onClick={() => navigate("/")}>Cancelar</button>
        </form>
      </div>
    </main>
  );
};

export default PasswordRecovery;