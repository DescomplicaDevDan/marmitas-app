export interface PratoNutricional {
  id: number;
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

  {
    id: 2,
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
    id: 2.1,
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
    id: 3,
    nome: "Bacalhau com grão de bico",
    porcao: "250g",
    kcal: 385.66,
    carboidratos: "41,10g",
    proteinas: "37,46g",
    gordurasTotais: "7,99g",
    gorduraSaturada: "1,14g",
    gorduraMonoinsaturada: "1,74g",
    gorduraPoliinsaturada: "3,87g",
    gorduraTrans: "0g",
    fibras: "7,35g",
    sodio: "115,5mg"
  },

  {
    id: 4,
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
    id: 4.1,
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
    id: 5,
    nome: "Carne desfiada com batata doce grelhada e brócolis",
    porcao: "250g",
    kcal: 303.0,
    carboidratos: "23,25g",
    proteinas: "39,62g",
    gordurasTotais: "5,33g",
    gorduraSaturada: "1,78g",
    gorduraMonoinsaturada: "2,01g",
    gorduraPoliinsaturada: "0,37g",
    gorduraTrans: "0g",
    fibras: "4,8g",
    sodio: "94mg"
  },

  {
    id: 5.1,
    nome: "Frango desfiado com batata doce grelhada e brócolis",
    porcao: "250g",
    kcal: 267.67,
    carboidratos: "23,50g",
    proteinas: "34,10g",
    gordurasTotais: "3,85g",
    gorduraSaturada: "1,06g",
    gorduraMonoinsaturada: "1,24g",
    gorduraPoliinsaturada: "0,91g",
    gorduraTrans: "0g",
    fibras: "4,82g",
    sodio: "419,13mg"
  },

  {
    id: 6,
    nome: "Camarão com arroz 7 grãos camarão e legumes cozidos",
    porcao: "250g",
    kcal: 303.74,
    carboidratos: "36,38g",
    proteinas: "25,49g",
    gordurasTotais: "5,79g",
    gorduraSaturada: "0,83g",
    gorduraMonoinsaturada: "1,59g",
    gorduraPoliinsaturada: "2,06g",
    gorduraTrans: "0g",
    fibras: "3,91g",
    sodio: "245,91mg"
  },

  {
    id: 7,
    nome: "Camarão na moranga com arroz 7 grãos",
    porcao: "250g",
    kcal: 229.96,
    carboidratos: "38,63g",
    proteinas: "10,75g",
    gordurasTotais: "3,72g",
    gorduraSaturada: "0,93g",
    gorduraMonoinsaturada: "0,98g",
    gorduraPoliinsaturada: "0,63g",
    gorduraTrans: "0g",
    fibras: "3,92g",
    sodio: "68,07mg"
  },

  {
    id: 8,
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
    id: 8.1,
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
    id: 9,
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
    id: 9.1,
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
    id: 10,
    nome: "Escondidinho de mandioquinha com camarão",
    porcao: "250g",
    kcal: 327.0,
    carboidratos: "44,90g",
    proteinas: "23,61g",
    gordurasTotais: "5,46g",
    gorduraSaturada: "2,89g",
    gorduraMonoinsaturada: "1,3g",
    gorduraPoliinsaturada: "0,66g",
    gorduraTrans: "0g",
    fibras: "2,7g",
    sodio: "479,0mg"
  },

  {
    id: 11,
    nome: "Escondidinho de mandioquinha com carne de patinho desfiada",
    porcao: "250g",
    kcal: 476.57,
    carboidratos: "44,90g",
    proteinas: "38,82g",
    gordurasTotais: "14,99g",
    gorduraSaturada: "5,19g",
    gorduraMonoinsaturada: "4,38g",
    gorduraPoliinsaturada: "3,68g",
    gorduraTrans: "0g",
    fibras: "2,7g",
    sodio: "300mg"
  },

  {
    id: 11.1,
    nome: "Escondidinho de mandioquinha com frango desfiado",
    porcao: "250g",
    kcal: 391.67,
    carboidratos: "45,15g",
    proteinas: "33,29g",
    gordurasTotais: "7,91g",
    gorduraSaturada: "3,6g",
    gorduraMonoinsaturada: "2,33g",
    gorduraPoliinsaturada: "0,98g",
    gorduraTrans: "0g",
    fibras: "2,72g",
    sodio: "625,13mg"
  },

  {
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 14.1,
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
    id: 15,
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
    id: 16,
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
    id: 16.1,
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
    id: 17,
    nome: "Salmão com arroz 7 grãos e legumes",
    porcao: "250g",
    kcal: 424.79,
    carboidratos: "36,38g",
    proteinas: "30,72g",
    gordurasTotais: "16,68g",
    gorduraSaturada: "3,75g",
    gorduraMonoinsaturada: "4,95g",
    gorduraPoliinsaturada: "5,12g",
    gorduraTrans: "0g",
    fibras: "3,91g",
    sodio: "117,72mg"
  },

  {
    id: 18,
    nome: "Strogonoff de camarão com arroz 7 grãos e batata doce grelhada",
    porcao: "250g",
    kcal: 404,
    carboidratos: "49,51g",
    proteinas: "19,10g",
    gordurasTotais: "8,24g",
    gorduraSaturada: "2,52g",
    gorduraMonoinsaturada: "0g",
    gorduraPoliinsaturada: "0,03g",
    gorduraTrans: "0g",
    fibras: "5,73g",
    sodio: "430,14mg"
  },

  {
    id: 18.1,
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
