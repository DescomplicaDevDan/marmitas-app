import { useEffect, useMemo, useRef, useState } from 'react';
import { type Marmita } from '../types';
import { useCart } from '../contexts/CartContext';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';
import { listaNutricional } from '../data/nutricao';
import { TabelaNutricional } from './TabelaNutricional';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const itemNoCarrinho = cart.find((item) => item.id === marmita.id);
  const isCombo = marmita.categoria === 'Combo';
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

  const handleAcaoBotao = () => {
    if (isCombo) {
      onMontarCombo(marmita);
    } else {
      addToCart(marmita);
    }
  };

  const handleAumentarQuantidade = () => {
    if (itemNoCarrinho) {
      updateQuantity(marmita.id, 'increase');
      onFeedback?.('Quantidade atualizada no pedido');
      return;
    }

    addToCart(marmita);
    onFeedback?.('Marmita adicionada ao pedido');
  };

  const handleDiminuirQuantidade = () => {
    if (itemNoCarrinho) {
      updateQuantity(marmita.id, 'decrease');
    }
  };

  return (
    <div ref={cardRef} className={`font-sans shadow-sm border overflow-hidden hover:shadow-md transition-all h-full relative flex flex-row sm:flex-col gap-2 sm:gap-0 rounded-2xl p-2 sm:p-0 ${
      isNoCarrinho ? 'bg-[#f7fbf4] border-[#7cb151] ring-1 ring-[#7cb151]/25' : 'bg-white'
    } ${
      isCombo && !isNoCarrinho ? 'border-[#7cb151] ring-1 ring-[#7cb151]/20' : ''
    } ${
      !isCombo && !isNoCarrinho ? 'border-gray-100' : ''
    }`}>
      <TabelaNutricional
        prato={pratoNutricional}
        isVisible={Boolean(pratoNutricional && isPinned)}
        isPinned={isPinned}
        onClose={() => {
          setIsPinned(false);
        }}
      />

      
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
      <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-full sm:rounded-none">
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
        <div className="absolute left-2 top-2 flex min-w-[54px] items-center justify-center rounded-full bg-white/85 px-2 py-1 shadow-sm ring-1 ring-white/50 backdrop-blur-md sm:left-3 sm:top-3 sm:min-w-0 sm:px-3">
          <span className="text-center text-[8px] sm:text-[10px] font-black text-[#59853a] uppercase leading-none tracking-wide">
            {marmita.categoria}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="min-w-0 flex-1 flex flex-col py-1 pr-1 sm:p-4">
        
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

        <div className="mt-auto pt-1 sm:pt-2 mb-0.5 sm:mb-1 min-h-[13px] sm:min-h-[16px]">
          {pratoNutricional && (
            <button
              type="button"
              onClick={() => setIsPinned(true)}
              className="text-left text-[9px] sm:text-xs font-medium text-green-600 hover:text-green-700 hover:underline block transition-all"
            >
              Ver info nutricional
            </button>
          )}
        </div>

        {/* --- RODAPÉ DINÂMICO --- */}
        {/* mt-auto empurra este bloco para o fim da div p-5 */}
        <div className={`border-t border-gray-50 ${
          isCombo ? 'flex items-center justify-between gap-2 pt-1.5 sm:flex-col sm:items-start sm:gap-2 sm:pt-2' : 'flex items-center justify-between gap-2 sm:gap-3 pt-1.5 sm:pt-2'
        }`}>
          
          <div className="flex flex-col shrink-0">
            {isCombo && (
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Valor do Pacote
              </span>
            )}
            <span className="text-sm sm:text-xl font-black text-gray-950 tracking-tight leading-none">
              R$ {marmita.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {!isCombo ? (
            <div className="flex items-center overflow-hidden rounded-xl border border-[#d1e7c5] bg-white shadow-sm shrink-0">
              <button 
                onClick={handleDiminuirQuantidade}
                disabled={!itemNoCarrinho}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#7cb151] text-white font-bold transition-colors hover:bg-[#59853a] disabled:cursor-not-allowed disabled:bg-[#7cb151]/60"
              >-</button>
              <span className="font-bold text-gray-900 min-w-[26px] sm:min-w-[30px] text-center text-xs sm:text-sm">
                {itemNoCarrinho?.quantidade ?? 0}
              </span>
              <button 
                onClick={handleAumentarQuantidade}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#7cb151] text-white font-bold transition-colors hover:bg-[#59853a]"
              >+</button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
