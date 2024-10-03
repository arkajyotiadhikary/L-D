// Have to verify properly the user is admin or not

import React, { createContext, useState, useEffect, ReactNode } from "react";

type UserRole = "SUPER_ADMIN" | "MANAGER" | "EMPLOYEE";

interface IUser {
      email: string;
      role: UserRole;
      company: string;
}

interface AuthContextType {
      isAuthenticated: boolean;
      userToken: string | null;
      user: IUser | null;
      login: (token: string, user: IUser) => void;
      logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("token"));
      const [user, setUserState] = useState<IUser | null>(null);

      const isAuthenticated = !!userToken;

      useEffect(() => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                  setUserToken(storedToken);
                  const storedUser = localStorage.getItem("user");
                  if (storedUser) {
                        setUserState(JSON.parse(storedUser));
                  }
            }
      }, []);

      const login = (token: string, user: IUser) => {
            console.log("User Logged in: ", user);
            setUserToken(token);
            setUserState(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
      };

      const logout = () => {
            setUserToken(null);
            setUserState(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("currentModuleId");
            const videoKeys = Object.keys(localStorage).filter((key) => key.startsWith("video-"));
            videoKeys.forEach((key) => localStorage.removeItem(key));
      };

      return (
            <AuthContext.Provider value={{ isAuthenticated, userToken, user, login, logout }}>
                  {children}
            </AuthContext.Provider>
      );
};
