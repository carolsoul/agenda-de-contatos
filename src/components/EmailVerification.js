import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ImgPassword2 from "../assets/img_password_2.png"
import "../EmailVerification.css";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // permite apenas números

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // vai para o próximo input depois de um número ser digitado
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  //volta ao input anterior quando aperta o backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const enteredCode = code.join("") //para juntar os numeros do código
    if(enteredCode === "12345"){
      setMessage({text: "Código correto! Verificação concluída.", type: "success"});

      setTimeout(() => {
        navigate("/NewPassword");
      }, 2500);

    } else {
      setMessage({text: "Código inválido. Tente novamente.", type: "error"});
    }

    setTimeout(() => setMessage(null), 2500)
  }

  return(
  
    <div className='email-verification'>
      <h2 className='verification-title'>Verifique seu E-mail</h2>

      <div className='password-img-2'>
        <img src={ImgPassword2} alt="Descrição da imagem" />
      </div>

      <p className='verification-parag'>Enviamos um código de 5 dígitos para o seu E-mail, digite-o nos campos abaixo.</p>

      
      <div className="code-inputs">
        {code.map((num, index) => (
          <input
            key={index}
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
            
      <button type="submit" className='verification-btn' onClick={handleSubmit}>Próximo</button>

        </div>
    );
};

export default EmailVerification