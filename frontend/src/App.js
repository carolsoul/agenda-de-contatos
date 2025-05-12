import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext.js';
import Login from "./pages/Login.js";
import SignIn from "./pages/Register.js";
import PasswordRecovery from './components/PasswordRecovery.js';
import EmailVerification from './components/EmailVerification.js';
import NewPassword from './components/NewPassword.js';
import Home from "./pages/Home.js";
import AddContact from "./pages/AddContact.js";
import ContactDetails from "./pages/ContactDetails.js";
import EditContact from "./pages/EditContact.js";


/* Rotas da aplicação */
function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<SignIn />} />
        <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/Home" element={<Home contacts={contacts} setContacts={setContacts} />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contact/:id" element={<ContactDetails setContacts={setContacts} />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
export default App;