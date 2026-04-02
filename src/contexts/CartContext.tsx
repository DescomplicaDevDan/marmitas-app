import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Marmita, type CartItem } from '../types'; // Importando do seu arquivo de tipos

interface CartContextData {
  cart: CartItem[]; // Mantivemos 'cart' para combinar com seu Provider, mas note os IDs abaixo
  addToCart: (marmita: Marmita) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void; // Mudamos para string
  removeFromCart: (id: string) => void; // Mudamos para string
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(marmita: Marmita) {
    setCart(prevCart => {
      // Se for um combo, ele é ÚNICO (pelas escolhas), então sempre adicionamos um novo
      // Se for marmita individual, verificamos se já existe para somar a quantidade
      const isCombo = marmita.categoria === 'Combo';
      const itemExists = prevCart.find(item => item.id === marmita.id);

      if (itemExists && !isCombo) {
        return prevCart.map(item =>
          item.id === marmita.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      
      // Se for combo ou item novo, gera um ID único para o carrinho não bugar
      const novoId = isCombo ? `${marmita.id}-${Date.now()}` : marmita.id;
      
      return [...prevCart, { ...marmita, id: String(novoId), quantidade: 1 }];
    });
  }

  function updateQuantity(id: string, action: 'increase' | 'decrease') {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === id) {
            if (action === 'decrease' && item.quantidade === 1) {
              return null;
            }
            const newQuantity = action === 'increase' ? item.quantidade + 1 : item.quantidade - 1;
            return { ...item, quantidade: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }

  function removeFromCart(id: string) {
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

export const useCart = () => useContext(CartContext);