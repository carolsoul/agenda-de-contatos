import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/contacts", contact)
      .then(() => {
        setContact({ name: "", phone: "", email: "" });
        navigate("/"); // Volta para a home
      })
      .catch(error => console.error("Erro ao adicionar contato:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome" value={contact.name} onChange={handleChange} required />
      <input name="phone" placeholder="Telefone" value={contact.phone} onChange={handleChange} required />
      <input name="email" placeholder="E-mail" value={contact.email} onChange={handleChange} required />
      <button type="submit">Adicionar Contato</button>
      <button type="button" onClick={() => navigate("/")}>Cancelar</button>
    </form>
  );
}

export default ContactForm;
