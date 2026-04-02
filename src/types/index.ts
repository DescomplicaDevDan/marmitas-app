export interface Marmita {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  imagem: string;
  categoria: 'Carne' | 'Frango' | 'Peixe' | 'Suíno' | 'Vegetariana' | 'Combo'; 
  escolhas?: EscolhaCombo[];
}

export interface CartItem extends Marmita {
  quantidade: number;
}

export interface EscolhaCombo {
  id: string;
  nome: string;
  quantidade: number;
}

export interface CartContextData {
  items: CartItem[];
  addToCart: (marmita: Marmita) => void;
  updateQuantity: (id: string, type: 'increase' | 'decrease') => void;
  totalItems: number;
}