import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn"
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;
