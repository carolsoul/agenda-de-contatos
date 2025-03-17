import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../ContactForm.css"

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/contacts", {
        name,
        phone,
        email
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Contato</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>

          <input type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)}/>

          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="btn-container">
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("./Home.js")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
