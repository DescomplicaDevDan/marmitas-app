export interface PratoNutricional {
  id: number;
  nome: string;
  porcao: string;
  kcal: number;
  carboidratos: string;
  proteinas: string;
  gordurasTotais: string;
  gorduraSaturada: string;
  gorduraMonoinsaturada: string,
  gorduraPoliinsaturada: string,
  gorduraTrans: string,
  fibras: string;
  sodio: string;
}

export const listaNutricional: PratoNutricional[] = [
  {
    id: 1,
    nome: "Macarrão com almôndega de carne",
    porcao: "280g",
    kcal: 612.62,
    carboidratos: "62,94g",
    proteinas: "31,60g",
    gordurasTotais: "24,92g",
    gorduraSaturada: "7,26g",
    gorduraMonoinsaturada: "8,53g",
    gorduraPoliinsaturada: "6,24g",
    gorduraTrans: "0g",
    fibras: "3,71g",
    sodio: "179,89mg"
  },

  {
    id: 1.1,
    nome: "Macarrão com almôndega de frango",
    porcao: "280g",
    kcal: 548.52,
    carboidratos: "63,05g",
    proteinas: "24,19g",
    gordurasTotais: "21,26g",
    gorduraSaturada: "6,23g",
    gorduraMonoinsaturada: "1,57g",
    gorduraPoliinsaturada: "3,95g",
    gorduraTrans: "0g",
    fibras: "3,24g",
    sodio: "788,05mg"
  },


];