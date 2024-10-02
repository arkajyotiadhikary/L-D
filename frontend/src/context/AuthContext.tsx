import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
      isAuthenticated: boolean;
      userToken: string | null;
      login: (token: string) => void;
      logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [userToken, setUserToken] = useState<string | null>(() => {
            return localStorage.getItem("token");
      });

      const isAuthenticated = !!userToken;

      const login = (token: string) => {
            setUserToken(token);
            localStorage.setItem("token", token);
      };

      const logout = () => {
            setUserToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("currentModuleId");
            const videoKeys = Object.keys(localStorage).filter((key) => key.startsWith("video-"));
            videoKeys.forEach((key) => localStorage.removeItem(key));
      };

      return (
            <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
                  {children}
            </AuthContext.Provider>
      );
};
