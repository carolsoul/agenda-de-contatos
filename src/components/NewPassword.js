import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import ImgPassword3 from "../assets/img_password_3.png"
import "../NewPassword.css";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (password.length < 6) {
        setMessage({ text: "A senha deve ter pelo menos 6 caracteres.", type: "error" });
        setTimeout(() => setMessage(null), 2500);
        return;
      }
  
      if (password !== confirmPassword) {
        setMessage({ text: "As senhas não coincidem. Tente novamente.", type: "error" });
        setTimeout(() => setMessage(null), 2500);
        return;
      }
  
      setMessage({ text: "Senha alterada com sucesso!", type: "success" });
  
      setTimeout(() => {
        navigate("/"); // vai para a página de login
      }, 2500);
    };
  

return (
    <div className="new-password">
      <h2 className='new-title'>Tudo certo!</h2>

      <div className='password-img-3'>
        <img src={ImgPassword3} alt="Descrição da imagem" />
      </div>

      <p className='password-parag-2'>Agora digite e confirme sua nova senha nos campos abaixo.</p>

      <form onSubmit={handleSubmit}>

         <div className="group">
            <FaLock className="icon" />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className="group">
            <FaLock className="icon" />
            <input type="password" placeholder="Confirmar senha" value={password} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>

        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <button type="submit" className='new-btn'>Próximo</button>

      </form>
      
    </div>
  );
}

export default NewPassword;