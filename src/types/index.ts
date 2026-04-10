export interface Marmita {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  imagem: string;
  limiteEscolhas?: string; // Corrigido para 'string' (s minúsculo) por padrão TS
  brinde?: string;
  categoria: 'Carne' | 'Frango' | 'Peixe' | 'Suíno' | 'Vegetariana' | 'Combo'; 
  escolhas?: EscolhaCombo[];
}

export interface CartItem extends Marmita {
  quantidade: number;
}

export interface CheckoutFormData {
  nome: string;
  CPF: string; // ALTERADO: De number para string para aceitar 11 dígitos e zeros à esquerda
  telefone: string;
  endereco: string;
  nº: string;
  cep: string;
  bairro: string;
  cidade: string;
  formaPagamento: 'pix' | 'cartao de crédito' | 'Cartão de débito';
  observacoes?: string;
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