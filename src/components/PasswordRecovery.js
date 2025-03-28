import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import ImgPassword1 from "../assets/img_password_1.png"
import "../PasswordRecovery.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica de recuperação de senha (simulação)
    if (email === 'teste@gmail.com') {
      setMessage('Link de recuperação enviado para o seu e-mail!');

      setTimeout(()=> {
        navigate("/EmailVerification");
      }, 2500);

    } else {
      // trocar pela chamada para a API que envia a solicitação de recuperação
      setMessage('Por favor, insira um e-mail válido.');
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

      <form onSubmit={handleSubmit}>

        <div className="group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        {message && <p className='message'>{message}</p>}

        <button type="submit" className='password-btn'>Próximo</button>
        <button className='cancel-btn' onClick={() => navigate("/")}>Cancelar</button>

      </form>
      
    </div>
  );
};

export default PasswordRecovery;