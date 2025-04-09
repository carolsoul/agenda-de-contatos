// Importações necessárias do React e da biblioteca axios para requisições HTTP
import React, { useEffect, useState } from "react";
import axios from "axios";

// Componente que exibe a lista de contatos
function ContactList() {
  // Estado para armazenar os contatos recuperados da API
  const [contacts, setContacts] = useState([]);

  // useEffect executa a requisição à API uma única vez após o componente ser montado
  useEffect(() => {
    axios.get("http://localhost:3000/contatos") // Faz uma requisição GET à API local
      .then(response => setContacts(response.data)) // Armazena os dados recebidos no estado
      .catch(error => console.error("Erro ao buscar contatos:", error)); // Loga erro, se houver
  }, []);

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <ul>
        {/* Mapeia os contatos do estado e exibe nome, telefone e e-mail em uma lista */}
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
