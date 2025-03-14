import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; 

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
        <div className="logo">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <input 
          type="text" 
          placeholder="Pesquisar contatos" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="add-contact">+</button>
      </header>

      <div className="sidebar">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("recent")}>Recentes</button>
        <button onClick={() => setFilter("old")}>Antigos</button>
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