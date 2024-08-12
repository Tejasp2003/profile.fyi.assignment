import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  setAuthToken,
  clearAuthToken,
  fetchUser as apiFetchUser,
} from "../api";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (token: string) => {
    apiFetchUser(token).then((data) => {
      setUser(data);
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUser(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await apiLogin(email, password);
    setUser(user);
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    clearAuthToken();
    localStorage.removeItem("token");
  };

  const register = async (email: string, password: string) => {
    const { user, token } = await apiRegister(email, password);
    setUser(user);
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
