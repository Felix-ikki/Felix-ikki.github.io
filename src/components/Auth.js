import { createContext, useContext } from "react";
import { useLocalStorage } from "../customHooks/useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);

  const login = (login) => {
    setLoggedIn(login);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
