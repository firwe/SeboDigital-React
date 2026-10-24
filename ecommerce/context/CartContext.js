import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { usuarioLogado } = useAuth();
  const [carrinho, setCarrinho] = useState({ itens: [], valorTotalEmCentavos: 0 });
  const [carregandoCarrinho, setCarregandoCarrinho] = useState(false);

  const userId = usuarioLogado?.id || usuarioLogado?.id_usuario || 'guest';

  async function carregarCarrinho() {
    setCarregandoCarrinho(true);
    try {
      const res = await fetch('http://192.168.0.58:3000/api/cart', {
        headers: { 'x-user-id': String(userId) }
      });

      if (!res.ok) {
        setCarrinho({ itens: [], valorTotalEmCentavos: 0 });
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setCarrinho(json.data);
      } else if (json.itens) {
        setCarrinho(json);
      }
    } catch (e) {
      console.log("Aviso: Não foi possível sincronizar o carrinho no momento.");
    } finally {
      setCarregandoCarrinho(false);
    }
  }

  useEffect(() => {
    carregarCarrinho();
  }, [usuarioLogado]);

  async function adicionarAoCarrinho(produtoOuId, quantidade = 1) {
    const produtoId = typeof produtoOuId === 'object' 
      ? (produtoOuId.id || produtoOuId.id_produto) 
      : produtoOuId;

    if (!produtoId) return;

    try {
      const res = await fetch('http://192.168.0.58:3000/api/cart/items', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': String(userId) 
        },
        body: JSON.stringify({ produtoId, quantidade })
      });

      if (!res.ok) {
        console.error("Erro no servidor ao adicionar item:", res.status);
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setCarrinho(json.data);
      }
    } catch (e) {
      console.error("Erro ao adicionar item ao carrinho:", e);
    }
  }

  async function atualizarQuantidade(produtoId, quantidade) {
    try {
      const res = await fetch(`http://192.168.0.58:3000/api/cart/items/${produtoId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': String(userId) 
        },
        body: JSON.stringify({ quantidade })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCarrinho(json.data);
      }
    } catch (e) {
      console.error("Erro ao atualizar quantidade:", e);
    }
  }

  async function removerDoCarrinho(produtoId) {
    try {
      const res = await fetch(`http://192.168.0.58:3000/api/cart/items/${produtoId}`, {
        method: 'DELETE',
        headers: { 'x-user-id': String(userId) }
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCarrinho(json.data);
      }
    } catch (e) {
      console.error("Erro ao remover item:", e);
    }
  }

  async function limparCarrinho() {
    try {
      const res = await fetch('http://192.168.0.58:3000/api/cart', {
        method: 'DELETE',
        headers: { 'x-user-id': String(userId) }
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCarrinho(json.data);
      }
    } catch (e) {
      console.error("Erro ao limpar carrinho:", e);
    }
  }

  // Garante que listaItens seja sempre um array iterável para a TelaCarrinho
  const listaItens = Array.isArray(carrinho) 
    ? carrinho 
    : (carrinho?.itens || []);

  return (
    <CartContext.Provider value={{
      carrinho,
      itens: listaItens,
      carregandoCarrinho,
      adicionarAoCarrinho,
      adicionarItem: adicionarAoCarrinho,
      atualizarQuantidade,
      removerDoCarrinho,
      limparCarrinho,
      carregarCarrinho
    }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}