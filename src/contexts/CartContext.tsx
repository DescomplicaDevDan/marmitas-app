import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Marmita, type CartItem, type EscolhaCombo } from '../types';

interface CartContextData {
  cart: CartItem[];
  // ATUALIZADO: addToCart agora aceita opcionalmente as escolhas do combo
  addToCart: (marmita: Marmita, escolhas?: EscolhaCombo[]) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // FUNÇÃO ÚNICA: Gerencia tanto itens simples quanto combos montados
  function addToCart(marmita: Marmita, escolhas?: EscolhaCombo[]) {
    setCart(prevCart => {
      const isCombo = marmita.categoria === 'Combo';

      // Se NÃO for combo, verifica se já existe no carrinho para apenas somar a quantidade
      if (!isCombo) {
        const itemExists = prevCart.find(item => item.id === marmita.id);
        if (itemExists) {
          return prevCart.map(item =>
            item.id === marmita.id ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        }
      }

      // Se for COMBO ou item novo:
      // Geramos um ID único (Timestamp) para combos, permitindo ter dois combos de 10un 
      // diferentes no mesmo carrinho sem que um sobrescreva o outro.
      const novoId = isCombo ? `${marmita.id}-${Date.now()}` : marmita.id;

      return [...prevCart, { 
        ...marmita, 
        id: String(novoId), 
        quantidade: 1, 
        escolhas: escolhas // Aqui salvamos a montagem do combo (importante para o WhatsApp!)
      }];
    });
  }

  function updateQuantity(id: string, action: 'increase' | 'decrease') {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === id) {
            if (action === 'decrease' && item.quantidade === 1) return null;
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

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);