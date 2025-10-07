import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("user"); // verifica se o usuário está logado

  if (!isLoggedIn) {
    // se não estiver logado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  return children; // se estiver logado, mostra a página
}
