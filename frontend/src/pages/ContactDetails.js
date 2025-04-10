import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hooks para capturar o ID da URL e navegar entre rotas
import axios from "axios";
import Modal from "react-modal"; // Modal para exibir mensagens e confirmações
import { FaArrowLeft, FaStar, FaRegStar, FaEdit, FaTrash, FaPhone, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa"; // Ícones
import "../ContactDetails.css";

// Define qual elemento será considerado o root do modal
Modal.setAppElement("#root");

function ContactDetails() {
  const { id } = useParams(); // Captura o ID do contato pela rota
  const navigate = useNavigate(); // Permite redirecionar o usuário
  const [contact, setContact] = useState(null); // Armazena os dados do contato
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controle do ícone de favorito
  const [error, setError] = useState(null); // Mensagem de erro, se houver
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla visibilidade do modal de exclusão

  // Efeito para buscar os dados do contato ao carregar a página
  useEffect(() => {
    let isMounted = true; // Evita atualizar estado após desmontagem do componente

    axios
      .get(`http://localhost:3000/contatos/${id}`) // Requisição para buscar o contato
      .then((response) => {
        if (isMounted) {
          setContact(response.data); // Armazena os dados do contato
          setIsFavorite(response.data.favorite); // Define se está favoritado
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Erro ao buscar contato:", error);
          setError(
            error.response?.status === 404
              ? "Contato não encontrado."
              : "Erro ao carregar os dados."
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Função para excluir o contato
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/contatos/${id}`)
      .then(() => navigate("/")) // Redireciona para a home após exclusão
      .catch((error) => console.error("Erro ao excluir contato:", error));
  };

  // Função para favoritar/desfavoritar o contato
  const handleFavorite = () => {
    axios
      .put(`http://localhost:3000/contatos/${id}`, {
        ...contact,
        favorite: !isFavorite,
      })
      .then(() => {
        setIsFavorite(!isFavorite); // Atualiza o estado após sucesso
      })
      .catch((error) => console.error("Erro ao favoritar contato:", error));
  };

  // Define cor de fundo com base na letra do nome
  const getGroupColor = (name) => {
    const letter = name[0].toUpperCase();
    const isEven = (letter.charCodeAt(0) - 65) % 2 === 0;
    return isEven ? "green-group" : "purple-group";
  };

  // Exibe modal de erro, se houver falha ao buscar contato
  if (error) {
    return (
      <Modal isOpen={true} onRequestClose={() => navigate("/")} className="modal" overlayClassName="overlay">
        <h2>Erro</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Voltar</button>
      </Modal>
    );
  }

  // Exibe loading enquanto busca os dados
  if (!contact) return <p>Carregando contato...</p>;

  return (
    <div className="contact-details-container">
      <div>
        {/* Botão de voltar */}
        <FaArrowLeft className="arrow" onClick={() => navigate("/Home")} />
        <h2 className="contact-title">{contact.contact_name}</h2>
      </div>

      {/* Informações do contato com cor de grupo */}
      <div className={`contact-info ${getGroupColor(contact.contact_name)}`}>
        <h3>Informações</h3>
        <div className="contact-line-info">

          <FaPhone className="contact-icon"/>
          <p>{contact.phone}</p>
        </div>

        <div className="contact-line-info">
        <FaEnvelope className="contact-icon" />
        <p>{contact.email}</p>
        </div>
        <div className="contact-line-info">
        <FaMapMarkedAlt className="contact-icon" />
        <p>{contact.address}</p>
        </div>
        
        <div className="contact-line-info">
        <FaMapMarkedAlt className="contact-icon"/>
        <p>{contact.category}</p>
        </div>

      </div>

      {/* Botões de ações: favoritar, editar e excluir */}
      <div className="detail-buttons">
        <button onClick={handleFavorite} className={isFavorite ? "favorited" : ""}>
          <div>{isFavorite ? <FaStar className="star" /> : <FaRegStar className="reg-star" />}</div>
          Favoritar
        </button>

        <button onClick={() => navigate(`/edit-contact/${id}`)}>
          <div><FaEdit className="edit" /></div>
          Editar
        </button>

        <button onClick={() => setIsDeleteModalOpen(true)} className="delete-button">
          <div><FaTrash className="trash" /></div>
          Excluir
        </button>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Confirmar exclusão</h2>
        <p>Tem certeza que deseja excluir este contato?</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="modal-confirm">Excluir</button>
          <button onClick={() => setIsDeleteModalOpen(false)} className="modal-cancel">Cancelar</button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactDetails;
