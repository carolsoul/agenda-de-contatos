import React, { createContext, useState, useContext, useEffect } from 'react';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Provider que fornece o contexto para toda a aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage ao iniciar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função de login (define o usuário e salva no localStorage)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Função de logout (limpa o estado e o localStorage)
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para usar o AuthContext
export const useAuth = () => useContext(AuthContext);
