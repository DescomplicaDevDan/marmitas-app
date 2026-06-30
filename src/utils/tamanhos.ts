import { type Marmita, type OpcaoTamanho, type TamanhoMarmita } from '../types';

export const TAMANHO_PADRAO: TamanhoMarmita = '300g';
export const PRECO_PADRAO_450G = 26.90;

function getPrecoCombo450g(nome: string): number | null {
  if (nome.includes('10')) return 220.00;
  if (nome.includes('20')) return 380.00;
  if (nome.includes('30')) return 510.00;
  return null;
}

export function getOpcoesTamanho(marmita: Marmita): OpcaoTamanho[] {
  if (marmita.opcoesTamanho) {
    return marmita.opcoesTamanho;
  }

  const preco450g = marmita.categoria === 'Combo'
    ? getPrecoCombo450g(marmita.nome)
    : PRECO_PADRAO_450G;

  return [
    { tamanho: '300g', preco: marmita.preco },
    { tamanho: '450g', preco: preco450g ?? marmita.preco },
  ];
}

export function getOpcaoTamanho(marmita: Marmita, tamanho: TamanhoMarmita): OpcaoTamanho {
  return getOpcoesTamanho(marmita).find((opcao) => opcao.tamanho === tamanho)
    ?? { tamanho: TAMANHO_PADRAO, preco: marmita.preco };
}
