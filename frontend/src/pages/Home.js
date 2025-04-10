import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaStar } from "react-icons/fa";
import "../Home.css";

function Home() {
  // Estado para armazenar os contatos
  const [contacts, setContacts] = useState([]);
  // Estado para o campo de pesquisa
  const [search, setSearch] = useState("");
  // Estado para armazenar o filtro selecionado
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Carrega os contatos da API quando o componente monta
  useEffect(() => {
    axios
      .get("http://localhost:3000/contatos")
      .then((response) => {
        console.log("Dados recebidos do backend:", response.data);
        setContacts(response.data);
      })
      .catch((error) => console.error("Erro ao buscar contatos:", error));
  }, []);

  // Função para aplicar filtros e ordenações
  const applyFilter = (contacts) => {
    console.log("Contatos antes do filtro:", contacts);
    
    let filtered = [...contacts];

    // Filtros por categoria
    if (filter === "favorites"){
      filtered = contacts.filter((contact) => Boolean(contact.favorite));
    } else if (filter === "friends") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "amigos");
    } else if (filter === "family") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "família");
    } else if (filter === "work") {
      filtered = filtered.filter((contact) => contact.category?.toLowerCase() === "trabalho");
    }

    // Ordenação dos contatos
    if (filter === "recent") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filter === "old") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else {
      // Ordenação alfabética padrão
      filtered.sort((a, b) => a.contact_name.localeCompare(b.contact_name));
    }
    
    console.log("Contatos após filtro:", filtered);
    return filtered;
  };

  // Aplica filtro de pesquisa + filtro/ordenação
  const filteredContacts = applyFilter(
    contacts.filter((contact) =>
      contact.contact_name.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Agrupa contatos por letra inicial do nome
  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.contact_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  // Define cor do grupo com base na letra (par = verde, ímpar = roxo)
  const getColorForLetter = (letter) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterIndex = alphabet.indexOf(letter);
    return letterIndex % 2 === 0 ? "green" : "purple";
  };

  return (
    <div className="home-container">
      <header>
        <div className="logo"></div>
        {/* Botão para adicionar novo contato */}
        <button className="add-contact" onClick={() => navigate("/add-contact")}>
          +
        </button>
      </header>

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar contatos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="sidebar-main-container">
        {/* Botões de filtro */}
        <div className="sidebar">
          <button onClick={() => setFilter("all")}>Todos</button>
          <button onClick={() => setFilter("recent")}>Recentes</button>
          <button onClick={() => setFilter("old")}>Antigos</button>
          <button onClick={() => setFilter("favorites")}>Favoritos</button>
          <button onClick={() => setFilter("friends")}>Amigos</button>
          <button onClick={() => setFilter("family")}>Família</button>
          <button onClick={() => setFilter("work")}>Trabalho</button>
        </div>

        {/* Mensagem quando não há contatos filtrados */}
        {filteredContacts.length === 0 && (
          <div className="no-contacts">
            <p>Nenhum contato encontrado!</p>
            <p>Clique no + para adicionar um novo contato.</p>
          </div>
        )}

        {/* Lista principal de contatos agrupados por letra */}
        <main className="home-main">
          {Object.keys(groupedContacts).map((letter) => {
            const colorClass = getColorForLetter(letter);

            return (
              <section key={letter} className={`contact-group ${colorClass}`}>
                {/* Cabeçalho com a letra do grupo */}
                <div className="group-header">{letter}</div>
                <div className="contact-list">
                  {/* Cada contato no grupo */}
                  {groupedContacts[letter].map((contact) => (
                    <div 
                      key={contact.id} 
                      className={`contact-item ${colorClass}-item`}
                      onClick={() => navigate(`/contact/${contact.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="icon"><FaUser/></span>
                      {contact.contact_name}
                      {/* Ícone de estrela se for favorito */}
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