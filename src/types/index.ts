export type TamanhoMarmita = '300g' | '450g';

export interface OpcaoTamanho {
  tamanho: TamanhoMarmita;
  preco: number;
}

export interface Marmita {
  id: string;
  codigoPrato?: string;
  nome: string;
  ingredientes?: string;
  descricao?: string;
  preco: number;
  imagem: string;
  limiteEscolhas?: string; 
  brinde?: string;
  categoria: 'Carne' | 'Frango' | 'Peixe' | 'Suíno' | 'Vegetariana' | 'Combo'; 
  escolhas?: EscolhaCombo[];
  opcoesTamanho?: OpcaoTamanho[];
}

export interface CartItem extends Marmita {
  quantidade: number;
  produtoId?: string;
  tamanho?: TamanhoMarmita;
}

export interface CheckoutFormData {
  nome: string;
  CPF: string; 
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
  codigoPrato?: string;
  nome: string;
  quantidade: number;
}

export interface CartContextData {
  items: CartItem[];
  addToCart: (marmita: Marmita, escolhas?: EscolhaCombo[], tamanho?: TamanhoMarmita) => void;
  updateQuantity: (id: string, type: 'increase' | 'decrease') => void;
  totalItems: number;
}
