import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home.css"; 

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/contacts")
      .then(response => setContacts(response.data))
      .catch(error => console.error("Erro ao buscar contatos:", error));
  }, []);

  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  return (
    <div className="home-container">
      <header>
        <div className="logo"></div>

         <button className="add-contact" onClick={() => navigate("/add-contact")}>+</button>
      </header>

      <input type="text" placeholder="Pesquisar contatos" value={search} onChange={(e) => setSearch(e.target.value)}className="search-bar"/>
      
      <div className="sidebar">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("recent")}>Recentes</button>
        <button onClick={() => setFilter("old")}>Antigos</button>
      </div>

      <div className="no-contacts">
        <p>Nenhum contato encontrado!</p> 
        <p>Clique no + para adicionar um novo contato.</p>
      </div>

      <main>
        {Object.keys(groupedContacts).map(letter => (
          <section key={letter} className="contact-group">
            <div className="group-header">{letter}</div>
            <div className={`contact-list ${letter % 2 === 0 ? "green" : "purple"}`}>
              {groupedContacts[letter].map(contact => (
                <div key={contact.id} className="contact-item">
                  <span className="icon">👤</span>
                  {contact.name}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Home