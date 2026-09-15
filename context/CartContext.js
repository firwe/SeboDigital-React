import React, { createContext, useState, useContext } from "react";

const CartContext = createContext({
  itens: [],
  adicionarItem: () => {},
  removerItem: () => {},
  total: 0,
});

const ITENS_MOCK = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    categoria: "Literatura Brasileira",
    preco: 29.9,
    imagemBase64: null,
  },
  {
    id: 101,
    titulo: "Berserk Vol. 1",
    categoria: "Mangás",
    preco: 39.9,
    imagemBase64: null,
  },
];

export function CartProvider({ children }) {
  const [itens, setItens] = useState(ITENS_MOCK);

  function adicionarItem(produto) {
    setItens((atual) => [...atual, produto]);
  }

  function removerItem(index) {
    setItens((atual) => atual.filter((_, i) => i !== index));
  }

  const total = itens.reduce((soma, item) => soma + item.preco, 0);

  return (
    <CartContext.Provider value={{ itens, adicionarItem, removerItem, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}