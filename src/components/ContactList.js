import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/contacts") // Chama a API
      .then(response => setContacts(response.data))
      .catch(error => console.error("Erro ao buscar contatos:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
