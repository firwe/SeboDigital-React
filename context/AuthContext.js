import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  usuarioLogado: null,
  setUsuarioLogado: () => {},
  login: () => {},
  logout: () => {},
});

// ============================================================================
// MOCK — troque por integração real (login via API / token) quando o back
// estiver disponível. Por enquanto dá pra simular os 3 cenários mudando este
// objeto (ou chamando setUsuarioLogado em qualquer tela):
//
//   1) Visitante deslogado      -> usuarioLogado: null
//   2) Dono de alguns produtos  -> { id_usuario: 1, nome: "Você", admin: false }
//   3) Admin do site            -> { id_usuario: 1, nome: "Você", admin: true }
// ============================================================================
const USUARIO_MOCK = {
  id_usuario: 1,
  nome: "Você",
  admin: false,
};

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(USUARIO_MOCK);

  function login(usuario) {
    setUsuarioLogado(usuario);
  }

  function logout() {
    setUsuarioLogado(null);
  }

  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}