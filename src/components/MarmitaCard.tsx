import { useEffect, useMemo, useRef, useState } from 'react';
import { type Marmita, type TamanhoMarmita } from '../types';
import { useCart } from '../contexts/CartContext';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';
import { listaNutricional } from '../data/nutricao';
import { TabelaNutricional } from './TabelaNutricional';
import { getOpcoesTamanho } from '../utils/tamanhos';

interface MarmitaCardProps {
  marmita: Marmita;
  onMontarCombo: (marmita: Marmita) => void;
  onFeedback?: (message: string) => void;
  priority?: boolean;
}

export function MarmitaCard({
  marmita,
  onMontarCombo,
  onFeedback,
  priority = false,
}: MarmitaCardProps) {
  const { addToCart, cart, updateQuantity } = useCart();
  const [isPinned, setIsPinned] = useState(false);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<TamanhoMarmita | null>(null);
  const [tabelaDesktopSide, setTabelaDesktopSide] = useState<'left' | 'right'>('right');
  const cardRef = useRef<HTMLDivElement>(null);
  const seletorTamanhoRef = useRef<HTMLDivElement>(null);
  const controleQuantidadeRef = useRef<HTMLDivElement>(null);

  const isCombo = marmita.categoria === 'Combo';
  const opcoesTamanho = useMemo(() => getOpcoesTamanho(marmita), [marmita]);
  const opcaoSelecionada = tamanhoSelecionado
    ? opcoesTamanho.find((opcao) => opcao.tamanho === tamanhoSelecionado)
    : null;
  const itemNoCarrinho = tamanhoSelecionado
    ? cart.find((item) => item.produtoId === marmita.id && item.tamanho === tamanhoSelecionado)
    : undefined;
  const comboNoCarrinho = isCombo && cart.some((item) => item.categoria === 'Combo' && item.nome === marmita.nome);
  const isNoCarrinho = Boolean(itemNoCarrinho || comboNoCarrinho);
  const pratoNutricional = useMemo(() => {
    return listaNutricional.find((item) => item.id === marmita.id) ?? null;
  }, [marmita.id]);

  useEffect(() => {
    if (!isPinned) {
      return;
    }

    const handleClickFora = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsPinned(false);
      }
    };

    document.addEventListener('mousedown', handleClickFora);

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, [isPinned]);

  useEffect(() => {
    if (!tamanhoSelecionado) {
      return;
    }

    const handleClickForaGramagem = (event: MouseEvent) => {
      const alvo = event.target as Node;

      if (seletorTamanhoRef.current?.contains(alvo) || controleQuantidadeRef.current?.contains(alvo)) {
        return;
      }

      setTamanhoSelecionado(null);
    };

    document.addEventListener('mousedown', handleClickForaGramagem);

    return () => {
      document.removeEventListener('mousedown', handleClickForaGramagem);
    };
  }, [tamanhoSelecionado]);

  const handleAcaoBotao = () => {
    if (isCombo) {
      onMontarCombo(marmita);
    }
  };

  const handleAumentarQuantidade = () => {
    if (!tamanhoSelecionado) {
      onFeedback?.('Escolha 300g ou 450g antes de adicionar');
      return;
    }

    if (itemNoCarrinho) {
      updateQuantity(itemNoCarrinho.id, 'increase');
      onFeedback?.('Quantidade atualizada no pedido');
      return;
    }

    addToCart(marmita, undefined, tamanhoSelecionado);
    onFeedback?.('Marmita adicionada ao pedido');
  };

  const handleDiminuirQuantidade = () => {
    if (itemNoCarrinho) {
      updateQuantity(itemNoCarrinho.id, 'decrease');
    }
  };

  const handleAbrirTabelaNutricional = () => {
    const cardRect = cardRef.current?.getBoundingClientRect();

    if (cardRect) {
      const larguraTabelaDesktop = 420;
      const espacoDisponivelDireita = window.innerWidth - cardRect.right;
      setTabelaDesktopSide(espacoDisponivelDireita >= larguraTabelaDesktop ? 'right' : 'left');
    }

    setIsPinned(true);
  };

  return (
    <div ref={cardRef} className="relative self-start font-sans sm:h-full sm:self-stretch">
      <TabelaNutricional
        prato={pratoNutricional}
        isVisible={Boolean(pratoNutricional && isPinned)}
        isPinned={isPinned}
        desktopSide={tabelaDesktopSide}
        onClose={() => {
          setIsPinned(false);
        }}
      />

      <div className={`shadow-sm border overflow-hidden hover:shadow-md transition-all flex flex-row sm:h-full sm:flex-col gap-2 sm:gap-0 rounded-2xl p-2 sm:p-0 ${
        isNoCarrinho ? 'bg-[#f7fbf4] border-[#7cb151] ring-1 ring-[#7cb151]/25' : 'bg-white'
      } ${
        isCombo && !isNoCarrinho ? 'border-[#7cb151] ring-1 ring-[#7cb151]/20' : ''
      } ${
        !isCombo && !isNoCarrinho ? 'border-gray-100' : ''
      }`}>

      
      {/* Selo Amarelo "GANHE" */}
      {ENABLE_PROGRESSIVE_BONUS && isCombo && (
        <div className="absolute top-2 right-2 z-20 animate-bounce">
          <div className="bg-[#facc15] text-[#854d0e] text-[10px] font-black px-2 py-1 rounded-lg shadow-md border border-[#eab308] flex flex-col items-center leading-none">
            <span>GANHE</span>
            <span>
              {marmita.nome.includes('10') ? '+1 GRÁTIS' : 
               marmita.nome.includes('20') ? '+2 GRÁTIS' : 
               '+3 GRÁTIS'}
            </span>
          </div>
        </div>
      )}

      {/* Imagem da Marmita */}
      <div className="relative min-h-[104px] w-[104px] self-stretch shrink-0 overflow-hidden rounded-xl sm:h-44 sm:min-h-0 sm:w-full sm:self-auto sm:rounded-none">
        <img 
          src={marmita.imagem} 
          alt={marmita.nome}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          width="640"
          height="640"
          className="w-full h-full object-cover"
        />
        <div className="absolute left-2 top-2 flex min-w-[54px] items-center justify-center rounded-full bg-white/95 px-2 py-1 shadow-sm ring-1 ring-white/50 sm:left-3 sm:top-3 sm:min-w-0 sm:bg-white/85 sm:px-3 sm:backdrop-blur-md">
          <span className="text-center text-[8px] sm:text-[10px] font-black text-[#59853a] uppercase leading-none tracking-wide">
            {marmita.categoria}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="min-w-0 flex-1 flex flex-col py-0.5 pr-1 sm:p-4">
        
        <div className="flex flex-col w-full">
          {isNoCarrinho && (
            <span className="mb-1 w-fit rounded-full bg-[#e9f5e1] px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wide text-[#59853a]">
              No carrinho
            </span>
          )}
          <h3 className="text-[11px] sm:text-[13px] font-bold text-gray-900 tracking-tight leading-snug break-words">
            {marmita.nome}
          </h3>
          
          <p className="text-[9px] sm:text-xs text-gray-500 font-normal mt-1 leading-relaxed line-clamp-2">
            {marmita.descricao}
          </p>
        </div>

        {!isCombo ? (
          <div className="mt-auto pt-1 sm:pt-2">
            <div className="mb-1 flex items-center justify-between gap-2 sm:mb-1.5">
              <div className="min-w-0 flex-1">
                {pratoNutricional && (
                  <button
                    type="button"
                    onClick={handleAbrirTabelaNutricional}
                    className="block truncate text-left text-[9px] font-medium text-green-600 transition-all hover:text-green-700 hover:underline sm:text-xs"
                  >
                    Ver info nutricional
                  </button>
                )}
              </div>

              <div ref={seletorTamanhoRef} className="grid w-[82px] shrink-0 grid-cols-2 gap-1 rounded-xl bg-gray-50 p-1 sm:w-[92px]">
                {opcoesTamanho.map((opcao) => {
                  const isSelected = tamanhoSelecionado === opcao.tamanho;

                  return (
                    <button
                      key={opcao.tamanho}
                      type="button"
                      onClick={() => setTamanhoSelecionado(opcao.tamanho)}
                      className={`rounded-lg px-1.5 py-1 text-[9px] font-black transition-all sm:px-2.5 sm:text-[10px] ${
                        isSelected
                          ? 'bg-[#7cb151] text-white shadow-sm'
                          : 'text-gray-500 hover:bg-white hover:text-[#59853a]'
                      }`}
                    >
                      {opcao.tamanho}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-gray-50 sm:border-t sm:pt-2">
              <div className="flex shrink-0 flex-col">
                <span className="text-sm font-black leading-none tracking-tight text-gray-950 sm:text-xl">
                  R$ {(opcaoSelecionada?.preco ?? marmita.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div ref={controleQuantidadeRef} className="flex w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d1e7c5] bg-white shadow-sm sm:w-[92px]">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={handleDiminuirQuantidade}
                  disabled={!itemNoCarrinho}
                  className="flex h-6 w-6 items-center justify-center bg-[#7cb151] text-white transition-colors hover:bg-[#59853a] disabled:cursor-not-allowed disabled:bg-[#7cb151]/60 sm:h-8 sm:w-8"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="min-w-0 flex-1 text-center text-xs font-bold text-gray-900 sm:text-sm">
                  {itemNoCarrinho?.quantidade ?? 0}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={handleAumentarQuantidade}
                  className="flex h-6 w-6 items-center justify-center bg-[#7cb151] text-white transition-colors hover:bg-[#59853a] sm:h-8 sm:w-8"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-50 pt-1.5 sm:flex-col sm:items-start sm:gap-2 sm:pt-2">
            <div className="flex shrink-0 flex-col">
              <span className="mb-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400 sm:text-[9px]">
                Valor do Pacote
              </span>
              <span className="text-sm font-black leading-none tracking-tight text-gray-950 sm:text-xl">
                R$ {marmita.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button 
              onClick={handleAcaoBotao}
              className={`bg-[#7cb151] hover:bg-[#59853a] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 text-[10px] sm:text-sm shrink-0 ${
                isCombo ? 'min-w-[82px] sm:w-full sm:py-2.5 border-b-4 border-[#4d752d] active:border-b-0 active:translate-y-1' : ''
              }`}
            >
              {isCombo ? (
                <>
                  <span className="sm:hidden">Montar</span>
                  <span className="hidden sm:inline">Montar meu Combo</span>
                </>
              ) : 'Adicionar'}
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
