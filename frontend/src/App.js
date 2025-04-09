import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import SignIn from "./pages/Register.js";
import PasswordRecovery from './components/PasswordRecovery.js';
import EmailVerification from './components/EmailVerification.js';
import NewPassword from './components/NewPassword.js';
import Home from "./pages/Home.js";
import AddContact from "./pages/AddContact.js";
import ContactDetails from "./pages/ContactDetails.js";

/* Rotas da aplicação */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<SignIn />} />
        <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
}
export default App;