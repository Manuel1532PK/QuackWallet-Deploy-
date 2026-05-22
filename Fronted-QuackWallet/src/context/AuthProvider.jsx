import { useState } from "react";
import { AuthContext } from "./AuthContext";
import ConfirmModal from "../component/ConfirmModal";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedUserData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, confirmLogout, cancelLogout }}>
      {children}
      <ConfirmModal
        show={showLogoutModal}
        onHide={cancelLogout}
        onConfirm={confirmLogout}
        title="Cerrar Sesión"
        message="¿Estás seguro de cerrar sesión?"
        confirmText="Sí, cerrar sesión"
        cancelText="Cancelar"
      />
    </AuthContext.Provider>
  );
};
