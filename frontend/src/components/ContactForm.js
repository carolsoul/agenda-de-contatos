// Importação dos hooks e bibliotecas necessárias
import React, { useState } from "react";
import axios from "axios"; // Biblioteca para requisições HTTP
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera } from "react-icons/fa"; // Ícones do pacote react-icons
import "../ContactForm.css"; // Estilo da página

function ContactForm() {
  // Estados para armazenar os dados do formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null); // Imagem em base64
  const [favorite, setFavorite] = useState(false); // Valor booleano padrão
  const [category, setCategory] = useState(null);

  const navigate = useNavigate(); // Função para redirecionamento de página

  // Validação de telefone: apenas números e com 10 ou 11 dígitos
  const validatePhone = (phone) => /^[0-9]{10,11}$/.test(phone);

  // Validação de e-mail simples
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se campos obrigatórios foram preenchidos
    if (!name || !phone || !email) {
      alert("Os campos Nome, Telefone e E-mail são obrigatórios!");
      return;
    }

    // Validação do telefone e e-mail
    if (!validatePhone(phone)) {
      alert("Telefone inválido!");
      return;
    }
    if (!validateEmail(email)) {
      alert("E-mail inválido!");
      return;
    }

    // Envia os dados para o backend usando axios
    try {
      await axios.post("http://localhost:3000/contatos", {
        contact_name: name,
        phone,
        email,
        address,
        photo,
        favorite,
        category,
      });
      navigate("/Home"); // Redireciona para a página Home após salvar
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
    }
  };

  // Função para lidar com o upload e conversão da foto em base64
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Salva a imagem como base64
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, escolha uma imagem.");
    }

    // Exibe os dados no console (para debug)
    console.log({
      contact_name: name,
      phone,
      email,
      address,
      photo,
      category,
      favorite,
    });
  };

  return (
    <div className="add-contact-container">
      <h2 className="add-contact-title">Adicionar Contato</h2>

      {/* Área de upload da foto */}
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
        <input
          type="file"
          id="photo-input"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>

      {/* Formulário de cadastro do contato */}
      <form className="add-contact-form" onSubmit={handleSubmit}>
        <div className="input-container">

          {/* Campo: Nome */}
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Nome"
            />
          </div>

          {/* Campo: Telefone */}
          <div className="input-group">
            <FaPhone className="icon" />
            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Telefone"
            />
          </div>

          {/* Campo: E-mail */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="E-mail"
            />
          </div>

          {/* Campo: Endereço */}
          <div className="input-group">
            <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Endereço"
            />
          </div>

          {/* Seleção de categoria do contato */}
          <p className="radio-text">Selecione um grupo (opcional)</p>
          <div className="radio-input">
            <label className="label">
              <input
                type="radio"
                name="category"
                value="Amigos"
                checked={category === "Amigos"}
                onChange={() => setCategory("Amigos")}
              />
              <p className="text">Amigos</p>
            </label>

            <label className="label">
              <input
                type="radio"
                name="category"
                value="Família"
                checked={category === "Família"}
                onChange={() => setCategory("Família")}
              />
              <p className="text">Família</p>
            </label>

            <label className="label">
              <input
                type="radio"
                name="category"
                value="Trabalho"
                checked={category === "Trabalho"}
                onChange={() => setCategory("Trabalho")}
              />
              <p className="text">Trabalho</p>
            </label>
          </div>

          {/* Botão para limpar seleção de categoria */}
          <button
            type="button"
            className="clear-btn"
            onClick={() => setCategory(null)}
          >
            Limpar seleção
          </button>
        </div>

        {/* Botões de ação: cancelar ou salvar */}
        <div className="btn-container">
          <button
            type="button"
            onClick={() => navigate("/Home")}
            className="cancel"
          >
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

export default ContactForm;
