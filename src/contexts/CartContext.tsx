import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'; // Adicionado useEffect
import { type Marmita, type CartItem, type EscolhaCombo } from '../types';

interface CartContextData {
  cart: CartItem[];
  addToCart: (marmita: Marmita, escolhas?: EscolhaCombo[]) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const STORAGE_KEY = '@Nutricomp:cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(marmita: Marmita, escolhas?: EscolhaCombo[]) {
    setCart(prevCart => {
      const isCombo = marmita.categoria === 'Combo';

      if (!isCombo) {
        const itemExists = prevCart.find(item => item.id === marmita.id);
        if (itemExists) {
          return prevCart.map(item =>
            item.id === marmita.id ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        }
      }

      const novoId = isCombo ? `${marmita.id}-${Date.now()}` : marmita.id;

      return [...prevCart, { 
        ...marmita, 
        id: String(novoId), 
        quantidade: 1, 
        escolhas: escolhas 
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
    localStorage.removeItem(STORAGE_KEY); // Limpa também o storage
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