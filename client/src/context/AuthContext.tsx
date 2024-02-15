import React, { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { User } from "../models/user";
import useLazyApi from "../hooks/useLazyApi";

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  // set withCredentials: true to send cookies with request
  const { data } = useApi<User | undefined>("/api/users", {
    method: "GET",
  });
  const { fetchData, data: userData } = useLazyApi<User | undefined>();

  // Set user data on fetch
  useEffect(() => {
    if (!data && !userData) return;
    if (data) {
      setUser(data);
    } else if (userData) {
      setUser(userData);
    }
  }, [data, userData]);

  // Login function
  const login = async (username: string, password: string) => {
    await fetchData("/api/users/login", {
      method: "POST",
      data: {
        username,
        password,
      },
    });
  };

  // Logout function
  const logout = async () => {
    await fetchData("/api/users/logout", {
      method: "POST",
    });
    setUser(null);
  };

  // Provide the context value to its children
  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
