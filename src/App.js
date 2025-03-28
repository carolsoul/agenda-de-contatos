import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/Register";
import PasswordRecovery from './components/PasswordRecovery';
import EmailVerification from './components/EmailVerification';
import NewPassword from './components/NewPassword';
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<SignIn />} />
        <Route path="/recuperar-senha" element={<PasswordRecovery />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </Router>
  );
}
export default App;
