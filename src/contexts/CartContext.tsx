import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Marmita, type CartItem, type EscolhaCombo, type TamanhoMarmita } from '../types';
import { getOpcaoTamanho, TAMANHO_PADRAO } from '../utils/tamanhos';

interface CartContextData {
  cart: CartItem[];
  addToCart: (marmita: Marmita, escolhas?: EscolhaCombo[], tamanho?: TamanhoMarmita) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const STORAGE_KEY = '@Nutricomp:cart';
const LEGACY_PRODUCT_IMAGE = '/combo-marmitas.png';
const OPTIMIZED_PRODUCT_IMAGE = '/combo-marmitas.webp';

function getInitialCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.map((item: CartItem) => {
      const imagem = item.imagem === LEGACY_PRODUCT_IMAGE
        ? OPTIMIZED_PRODUCT_IMAGE
        : item.imagem;

      if (item.categoria === 'Combo') {
        const produtoId = item.produtoId ?? String(item.id).split('-')[0];
        const tamanho = item.tamanho ?? TAMANHO_PADRAO;
        const opcaoTamanho = getOpcaoTamanho({ ...item, id: produtoId, imagem }, tamanho);

        return {
          ...item,
          produtoId,
          tamanho,
          preco: opcaoTamanho.preco,
          imagem,
        };
      }

      const produtoId = item.produtoId ?? String(item.id).split('-')[0];
      const tamanho = item.tamanho ?? TAMANHO_PADRAO;
      const opcaoTamanho = getOpcaoTamanho({ ...item, id: produtoId, imagem }, tamanho);

      return {
        ...item,
        id: `${produtoId}-${tamanho}`,
        produtoId,
        tamanho,
        preco: opcaoTamanho.preco,
        imagem,
      };
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(marmita: Marmita, escolhas?: EscolhaCombo[], tamanho?: TamanhoMarmita) {
    setCart(prevCart => {
      const isCombo = marmita.categoria === 'Combo';

      if (!isCombo) {
        if (!tamanho) {
          return prevCart;
        }

        const opcaoTamanho = getOpcaoTamanho(marmita, tamanho);
        const itemId = `${marmita.id}-${tamanho}`;
        const itemExists = prevCart.find(item => item.id === itemId);

        if (itemExists) {
          return prevCart.map(item =>
            item.id === itemId ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        }

        return [...prevCart, {
          ...marmita,
          id: itemId,
          produtoId: marmita.id,
          tamanho,
          preco: opcaoTamanho.preco,
          quantidade: 1,
        }];
      }

      if (!tamanho) {
        return prevCart;
      }

      const opcaoTamanho = getOpcaoTamanho(marmita, tamanho);
      const novoId = `${marmita.id}-${tamanho}-${Date.now()}`;

      return [...prevCart, { 
        ...marmita, 
        id: String(novoId), 
        produtoId: marmita.id,
        tamanho,
        preco: opcaoTamanho.preco,
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
    localStorage.removeItem(STORAGE_KEY);
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
