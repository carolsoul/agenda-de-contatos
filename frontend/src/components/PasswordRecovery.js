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
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Simula verificação do e-mail (em produção seria uma chamada à API)
    if (email === 'teste@gmail.com') {
      setMessage({text: "Link de recuperação enviado para o seu e-mail!", type: "email-success"});

      setTimeout(()=> {
        navigate("/EmailVerification");
      }, 2500);

    } else {
      setMessage({text: "Por favor, insira um e-mail válido.", type: "email-error"});
    }
  };

  return (
    <div className="password-recovery">
      <h2 className='password-title'>Esqueceu sua senha?</h2>
      <p className='password-parag'>Não se preocupe, vamos te ajudar!</p>

      <div className='password-img-1'>
        <img src={ImgPassword1} alt="Descrição da imagem" />
      </div>

      <p className='password-parag-2'>Por favor digite seu E-mail para receber o código de verificação.</p>

      {/* Formulário para inserção do e-mail */}
      <form onSubmit={handleSubmit}>
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
  );
};

export default PasswordRecovery;