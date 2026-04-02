import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Marmita } from '../types';

// Definimos o que vai ter dentro do nosso "pacote" de dados do carrinho
interface CartItem extends Marmita {
  quantidade: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (marmita: Marmita) => void;
  updateQuantity: (id: number, action: 'increase' | 'decrease') => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para adicionar (Lógica de Analista: Se já existe, aumenta a quantidade)
  function addToCart(marmita: Marmita) {
    setCart(prevCart => {
      const itemExists = prevCart.find(item => item.id === marmita.id);
      if (itemExists) {
        return prevCart.map(item =>
          item.id === marmita.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...marmita, quantidade: 1 }];

    });
  }

  function updateQuantity(id: number, action: 'increase' | 'decrease') {
  setCart(prevCart => {
    return prevCart.map(item => {
      if (item.id === id) {
        if (action === 'decrease' && item.quantidade === 1) {
          // Se for diminuir e já estiver em 1, vamos marcar para remover
          // (O filter abaixo vai cuidar de tirar ele da lista)
          return null; 
        }
        const newQuantity = action === 'increase' ? item.quantidade + 1 : item.quantidade - 1;
        return { ...item, quantidade: newQuantity };
      }
      return item;
    }).filter((item): item is CartItem => item !== null); // Remove os itens marcados como null
  });
}

  function removeFromCart(id: number) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nos outros arquivos
export const useCart = () => useContext(CartContext);