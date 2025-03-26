import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaCamera } from "react-icons/fa";
import "../ContactForm.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null); // ✅ Agora o estado está no local correto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert("Os campos Nome, Telefone e E-mail são obrigatórios!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/contacts", {
        name,
        phone,
        email,
        work,
        address,
        photo
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Contato</h2>

      {/* Campo de Foto */}
      <div className="photo-upload">
        <label htmlFor="photo-input">
          <div className="photo-preview">
            {photo ? (
              <img src={photo} alt="Foto do Contato" />
            ) : (
              <FaCamera className="icon-camera" />
            )}
          </div>
        </label>
        <input type="file" id="photo-input" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <FaPhone className="icon" />
            <input type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <FaBriefcase className="icon" />
            <input type="text" placeholder="Informações de trabalho" value={work} onChange={(e) => setWork(e.target.value)} />
          </div>

          <div className="input-group">
            <FaMapMarkerAlt className="icon" />
            <input type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>

        <div className="btn-container">
          <button type="button" onClick={() => navigate("/Home")} className="cancel">Cancelar</button>
          <button type="submit" className="save">Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
