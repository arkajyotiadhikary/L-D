import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  const isAuthenticated = !!userToken;

  const login = (token: string) => {
    setUserToken(token);
    localStorage.setItem('authToken', token);
  }

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>{children}</AuthContext.Provider>
  );
}
