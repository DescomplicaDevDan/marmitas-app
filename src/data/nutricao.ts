export interface PratoNutricional {
  id: string;
  nome: string;
  porcao: string;
  kcal: number;
  carboidratos: string;
  proteinas: string;
  gordurasTotais: string;
  gorduraSaturada: string;
  gorduraMonoinsaturada: string;
  gorduraPoliinsaturada: string;
  gorduraTrans: string;
  fibras: string;
  sodio: string;
}

export const listaNutricional: PratoNutricional[] = [
  {
    id: "1",
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
    id: "2",
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

  {
    id: "3",
    nome: "Frango desfiado com arroz 7 grãos e purê de mandioquinha",
    porcao: "280g",
    kcal: 439.27,
    carboidratos: "56,19g",
    proteinas: "36,03g",
    gordurasTotais: "6,87g",
    gorduraSaturada: "2,38g",
    gorduraMonoinsaturada: "1,82g",
    gorduraPoliinsaturada: "0,88g",
    gorduraTrans: "0g",
    fibras: "4,46g",
    sodio: "506,13mg"
  },

  {
    id: "4",
    nome: "Carne desfiada com arroz 7 grãos e purê de mandioquinha",
    porcao: "280g",
    kcal: 474.60,
    carboidratos: "55,94g",
    proteinas: "41,56g",
    gordurasTotais: "8,34g",
    gorduraSaturada: "2,38g",
    gorduraMonoinsaturada: "1,82g",
    gorduraPoliinsaturada: "0,88g",
    gorduraTrans: "0g",
    fibras: "4,46g",
    sodio: "503,13mg"
  },

  {
    id: "5",
    nome: "Burguer de patinho com purê de mandioquinha e arroz 7 grãos",
    porcao: "280g",
    kcal: 408.60,
    carboidratos: "55,94g",
    proteinas: "27,44g",
    gordurasTotais: "7,84g",
    gorduraSaturada: "3,38g",
    gorduraMonoinsaturada: "0,59g",
    gorduraPoliinsaturada: "0,12g",
    gorduraTrans: "0g",
    fibras: "4,44g",
    sodio: "136,0mg"
  },

  {
    id: "6",
    nome: "Burguer de frango com purê de mandioquinha e arroz 7 grãos",
    porcao: "280g",
    kcal: 481.74,
    carboidratos: "68,59g",
    proteinas: "21,63g",
    gordurasTotais: "13,04g",
    gorduraSaturada: "4,31g",
    gorduraMonoinsaturada: "4,22g",
    gorduraPoliinsaturada: "2,34g",
    gorduraTrans: "0g",
    fibras: "5,05g",
    sodio: "257,92mg"
  },

  {
    id: "9",
    nome: "Isca de carne de patinho com arroz 7 grãos e lentilha",
    porcao: "250g",
    kcal: 411.0,
    carboidratos: "42,05g",
    proteinas: "44,64g",
    gordurasTotais: "6,19g",
    gorduraSaturada: "1,75g",
    gorduraMonoinsaturada: "2,03g",
    gorduraPoliinsaturada: "0,31g",
    gorduraTrans: "0g",
    fibras: "5,28g",
    sodio: "46mg"
  },

  {
    id: "10",
    nome: "Isca de frango com arroz 7 grãos e lentilha",
    porcao: "250g",
    kcal: 375.67,
    carboidratos: "42,30g",
    proteinas: "39,11g",
    gordurasTotais: "4,72g",
    gorduraSaturada: "1,02g",
    gorduraMonoinsaturada: "1,26g",
    gorduraPoliinsaturada: "0,85g",
    gorduraTrans: "0g",
    fibras: "5,3g",
    sodio: "371,13mg"
  },

  {
    id: "12",
    nome: "Escondidinho de batata doce com patinho",
    porcao: "250g",
    kcal: 474.19,
    carboidratos: "32,78g",
    proteinas: "38,36g",
    gordurasTotais: "20,51g",
    gorduraSaturada: "3,35g",
    gorduraMonoinsaturada: "8,87g",
    gorduraPoliinsaturada: "6,45g",
    gorduraTrans: "0g",
    fibras: "3,10g",
    sodio: "62,54mg"
  },

  {
    id: "13",
    nome: "Escondidinho de batata doce com frango",
    porcao: "250g",
    kcal: 470.85,
    carboidratos: "32,78g",
    proteinas: "33,15g",
    gordurasTotais: "22,59g",
    gorduraSaturada: "3,3g",
    gorduraMonoinsaturada: "9,0g",
    gorduraPoliinsaturada: "8,69g",
    gorduraTrans: "0g",
    fibras: "3,1g",
    sodio: "94,54mg"
  },

  {
    id: "16",
    nome: "Strogonoff de grão de bico com arroz 7 grãos e batata doce grelhada",
    porcao: "250g",
    kcal: 448.40,
    carboidratos: "65,52g",
    proteinas: "12,84g",
    gordurasTotais: "15,86g",
    gorduraSaturada: "2,6g",
    gorduraMonoinsaturada: "0g",
    gorduraPoliinsaturada: "0,03g",
    gorduraTrans: "0g",
    fibras: "8,91g",
    sodio: "465,26mg"
  },

  {
    id: "17",
    nome: "Filé de peixe com arroz 7 grãos e legumes",
    porcao: "280g",
    kcal: 315.94,
    carboidratos: "39,01g",
    proteinas: "29,09g",
    gordurasTotais: "4,37g",
    gorduraSaturada: "0,64g",
    gorduraMonoinsaturada: "1,56g",
    gorduraPoliinsaturada: "0,87g",
    gorduraTrans: "0g",
    fibras: "4,46g",
    sodio: "140,05mg"
  },

  {
    id: "18",
    nome: "Frango desfiado com arroz 7 grãos e legumes",
    porcao: "280g",
    kcal: 394.59,
    carboidratos: "39,01g",
    proteinas: "35,84g",
    gordurasTotais: "9,91g",
    gorduraSaturada: "1,95g",
    gorduraMonoinsaturada: "3,41g",
    gorduraPoliinsaturada: "2,68g",
    gorduraTrans: "0g",
    fibras: "4,46g",
    sodio: "112,05mg"
  },

  {
    id: "19",
    nome: "Patinho desfiado com arroz 7 grãos e legumes",
    porcao: "280g",
    kcal: 447.50,
    carboidratos: "39,01g",
    proteinas: "41,05g",
    gordurasTotais: "13,44g",
    gorduraSaturada: "2,88g",
    gorduraMonoinsaturada: "4,56g",
    gorduraPoliinsaturada: "3,68g",
    gorduraTrans: "0g",
    fibras: "4,46g",
    sodio: "80,05mg"
  },

  {
    id: "20",
    nome: "Frango em crosta com purê de mandioquinha e brócolis",
    porcao: "250g",
    kcal: 361.66,
    carboidratos: "32,47g",
    proteinas: "34,21g",
    gordurasTotais: "10,17g",
    gorduraSaturada: "3,43g",
    gorduraMonoinsaturada: "2,87g",
    gorduraPoliinsaturada: "2,69g",
    gorduraTrans: "0g",
    fibras: "3,3g",
    sodio: "260mg"
  },

  {
    id: "21",
    nome: "Panqueca integral com carne de patinho",
    porcao: "250g",
    kcal: 548.58,
    carboidratos: "43,58g",
    proteinas: "45,98g",
    gordurasTotais: "19,94g",
    gorduraSaturada: "4,99g",
    gorduraMonoinsaturada: "5,81g",
    gorduraPoliinsaturada: "7,07g",
    gorduraTrans: "0g",
    fibras: "0g",
    sodio: "721,06mg"
  },

  {
    id: "22",
    nome: "Panqueca integral com carne de frango",
    porcao: "250g",
    kcal: 522.58,
    carboidratos: "43,58g",
    proteinas: "40,77g",
    gordurasTotais: "19,45g",
    gorduraSaturada: "4,54g",
    gorduraMonoinsaturada: "5,35g",
    gorduraPoliinsaturada: "7,83g",
    gorduraTrans: "0g",
    fibras: "0g",
    sodio: "753,06mg"
  },

  {
    id: "23",
    nome: "Strogonoff de frango com arroz 7 grãos e batata doce grelhada",
    porcao: "250g",
    kcal: 300,
    carboidratos: "45,69g",
    proteinas: "13,34g",
    gordurasTotais: "7,08g",
    gorduraSaturada: "3,32g",
    gorduraMonoinsaturada: "0g",
    gorduraPoliinsaturada: "0,03g",
    gorduraTrans: "0g",
    fibras: "10,65g",
    sodio: "361,33mg"
  }
];
