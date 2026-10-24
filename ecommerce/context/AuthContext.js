import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosSalvos() {
      try {
        const storagedUser = await AsyncStorage.getItem('userData');
        const storagedToken = await AsyncStorage.getItem('userToken');

        if (storagedUser) {
          setUsuarioLogado(JSON.parse(storagedUser));
        }
        if (storagedToken) {
          setToken(storagedToken);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDadosSalvos();
  }, []);

  async function login(dadosOuUser) {
    try {
      const user = dadosOuUser.data?.user || dadosOuUser.user || dadosOuUser;
      const userToken = dadosOuUser.data?.token || dadosOuUser.token || `token_${Date.now()}`;

      setUsuarioLogado(user);
      setToken(userToken);

      await AsyncStorage.setItem('userData', JSON.stringify(user));
      await AsyncStorage.setItem('userToken', userToken);
    } catch (e) {
      console.error("Erro ao salvar login:", e);
    }
  }

  async function logout() {
    setUsuarioLogado(null);
    setToken(null);
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('userToken');
  }

  return (
    <AuthContext.Provider value={{ usuarioLogado, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}