export interface Marmita {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  // Atualizado com as suas novas categorias
  categoria: 'Carne' | 'Frango' | 'Peixe' | 'Suíno' | 'Combo'; 
}