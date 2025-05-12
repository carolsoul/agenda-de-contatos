import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaStar } from "react-icons/fa";
import "../Home.css";

function Home({ contacts, setContacts }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
  
      console.log("ID do usuário no localStorage:", userId);
  
      if (!userId) {
        console.error("Usuário não logado.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:3000/usuario/${userId}`);
        console.log("Dados do usuário recebidos:", response.data); // ✅ Debug
        setUserData(response.data); // ✅ Agora o nome será corretamente salvo
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
  
    fetchUserData();
  }, []);  

  // 🆕 Busca os contatos do usuário logado
  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem("id");
  
      if (!userId) {
        console.error("Usuário não logado.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:3000/contatos/usuario/${userId}`);
        console.log("Contatos recebidos:", response.data);
        setContacts(response.data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, [setContacts]);
  
  
  const applyFilter = (contacts) => {
    let filtered = [...contacts];

    if (filter === "favorites") {
      filtered = contacts.filter((contact) => Boolean(contact.favorite));
    } else if (filter === "friends") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "amigos");
    } else if (filter === "family") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "família");
    } else if (filter === "work") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "trabalho");
    }

    if (filter === "recent") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filter === "old") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else {
      filtered.sort((a, b) => a.contact_name.localeCompare(b.contact_name));
    }
    return filtered;
  };

  const filteredContacts = applyFilter(
    (contacts || []).filter((contact) =>
      contact.contact_name.toLowerCase().includes(search.toLowerCase())
    )
  );  

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.contact_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const getColorForLetter = (letter) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterIndex = alphabet.indexOf(letter);
    return letterIndex % 2 === 0 ? "green" : "purple";
  };

  return (
    <div className="home-container">
      <header>
        <div className="logo"></div>
        {userData && <p>Bem-vindo, {userData.nome}!</p>}
        <button className="add-contact" onClick={() => navigate("/add-contact")}>
          +
        </button>
      </header>

      <input
        type="text"
        placeholder="Pesquisar contatos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="sidebar-main-container">
        <div className="sidebar">
          <button onClick={() => setFilter("all")}>Todos</button>
          <button onClick={() => setFilter("recent")}>Recentes</button>
          <button onClick={() => setFilter("old")}>Antigos</button>
          <button onClick={() => setFilter("favorites")}>Favoritos</button>
          <button onClick={() => setFilter("friends")}>Amigos</button>
          <button onClick={() => setFilter("family")}>Família</button>
          <button onClick={() => setFilter("work")}>Trabalho</button>
        </div>

        {loading && <p>Carregando contatos...</p>}
        {error && <p>Erro ao carregar contatos. Tente novamente!</p>}
        
        {filteredContacts.length === 0 && !loading && !error && (
          <div className="no-contacts">
            <p>Nenhum contato encontrado. Adicione novos contatos! 👥</p>
          </div>
        )}

        <main className="home-main">
          {Object.keys(groupedContacts).map((letter) => {
            const colorClass = getColorForLetter(letter);
            return (
              <section key={letter} className={`contact-group ${colorClass}`}>
                <div className="group-header">{letter}</div>
                <div className="contact-list">
                  {groupedContacts[letter].map((contact) => (
                    <div 
                      key={contact.id} 
                      className={`contact-item ${colorClass}-item`}
                      onClick={() => navigate(`/contact/${contact.id}`)}
                    >
                      <span className="icon"><FaUser/></span>
                      {contact.contact_name}
                      {!!contact.favorite && <span className="star-icon"><FaStar/></span>}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Home;
