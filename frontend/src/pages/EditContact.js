import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera } from "react-icons/fa";
import "../EditContact.css";

function EditContact() {
  const { id } = useParams(); // Captura o ID do contato pela URL
  const navigate = useNavigate(); // Permite redirecionar o usuário
  const [contact, setContact] = useState({
    contact_name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    favorite: false,
    photo: ""
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/contatos/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error("Erro ao buscar contato:", error);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setContact({...contact, photo: reader.result});
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/contatos/${id}`, contact);
      navigate("/Home");
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  };

  return (
    <div className="edit-contact-container">
      <h2 className="edit-contact-title">Editar Contato</h2>

      {/* Área de upload da foto */}
            <div className="photo-upload">
              <label htmlFor="photo-input">
                <div className="photo-preview">
                {contact.photo ? (
                    <img src={contact.photo} alt="Foto do Contato" />
                  ) : (
                    <FaCamera className="icon-camera" />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="photo-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

      <form onSubmit={handleSubmit} className="edit-contact-form">
      <div className="input-container">

        {/* Campo: Nome */}
        <div className="input-group">
          <FaUser className="icon" />
          <input 
          type="text" 
          name="contact_name" 
          value={contact.contact_name} 
          onChange={handleChange} 
          placeholder="Nome" required/>
        </div>

        {/* Campo: Telefone */}
        <div className="input-group">
          <FaPhone className="icon" />
          <input 
          type="text" 
          name="phone" 
          value={contact.phone} 
          onChange={handleChange} 
          placeholder="Telefone" required />
        </div>

        {/* Campo: Email */}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input 
          type="email" 
          name="email" 
          value={contact.email} 
          onChange={handleChange} 
          placeholder="Email" />
        </div>

        {/* Campo: Endereço */}
        <div className="input-group">
          <FaMapMarkerAlt className="icon" />
          <input 
          type="text" 
          name="address" 
          value={contact.address} 
          onChange={handleChange} 
          placeholder="Endereço" />
        </div>

        {/* Seleção de categoria do contato */}
        <p className="radio-text">Selecione um grupo (opcional)</p>
        <div className="radio-input">
          <label className="label">
            <input
              type="radio"
              name="category"
              value="Amigos"
              checked={contact.category === "Amigos"}
              onChange={() => setContact({ ...contact, category: "Amigos" })}
            />
            <p className="text">Amigos</p>
          </label>

          <label className="label">
            <input
              type="radio"
              name="category"
              value="Família"
              checked={contact.category === "Família"}
              onChange={() => setContact({ ...contact, category: "Família" })}
            />
            <p className="text">Família</p>
          </label>

          <label className="label">
            <input
              type="radio"
              name="category"
              value="Trabalho"
              checked={contact.category === "Trabalho"}
              onChange={() => setContact({ ...contact, category: "Trabalho" })}
            />
            <p className="text">Trabalho</p>
          </label>
        </div>
      </div>

      {/* Favoritar */}
      <label>
          <input type="checkbox" name="favorite" checked={contact.favorite} onChange={(e) => setContact({ ...contact, favorite: e.target.checked })} />
          Favorito
        </label>
      
        { /* Botões de ação: cancelar ou salvar */ }
          <div className="btn-container">
          <button type="button" onClick={() => navigate("/Home")} className="cancel">
            Cancelar
          </button>
          <button type="submit" className="save">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
