import { useEffect, useMemo, useRef, useState } from 'react';
import { type Marmita } from '../types';
import { useCart } from '../contexts/CartContext';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';
import { listaNutricional } from '../data/nutricao';
import { TabelaNutricional } from './TabelaNutricional';

interface MarmitaCardProps {
  marmita: Marmita;
  onMontarCombo: (marmita: Marmita) => void;
}

export function MarmitaCard({ marmita, onMontarCombo }: MarmitaCardProps) {
  const { addToCart, cart, updateQuantity } = useCart();
  const [isPinned, setIsPinned] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const itemNoCarrinho = cart.find((item) => item.id === marmita.id);
  const isCombo = marmita.categoria === 'Combo';
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
      return;
    }

    addToCart(marmita);
  };

  const handleDiminuirQuantidade = () => {
    if (itemNoCarrinho) {
      updateQuantity(marmita.id, 'decrease');
    }
  };

  return (
    <div ref={cardRef} className={`font-sans bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all h-full flex flex-col relative ${
      isCombo ? 'border-[#7cb151] ring-1 ring-[#7cb151]/20' : 'border-gray-100'
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
      <div className="relative h-48 w-full shrink-0">
        <img 
          src={marmita.imagem} 
          alt={marmita.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-bold text-[#59853a] uppercase tracking-wider">
            {marmita.categoria}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* AJUSTE AQUI: Container com altura mínima rigorosa para mobile */}
        <div className="min-h-[125px] md:min-h-0 flex flex-col w-full">
          <h3 className="text-base font-bold text-gray-900 tracking-tight leading-snug line-clamp-2">
            {marmita.nome}
          </h3>
          
          <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed line-clamp-3">
            {marmita.descricao}
          </p>

          {pratoNutricional && (
            <button
              type="button"
              onClick={() => setIsPinned(true)}
              className="text-left text-xs font-medium text-green-600 hover:text-green-700 hover:underline mt-2 block transition-all"
            >
              Ver info nutricional
            </button>
          )}
        </div>

        {/* --- RODAPÉ DINÂMICO --- */}
        {/* mt-auto empurra este bloco para o fim da div p-5 */}
        <div className={`mt-auto pt-4 border-t border-gray-50 ${
          isCombo ? 'flex flex-col items-start gap-3' : 'flex items-center justify-between gap-3'
        }`}>
          
          <div className="flex flex-col shrink-0">
            {isCombo && (
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Valor do Pacote
              </span>
            )}
            <span className="text-xl font-black text-gray-950 tracking-tight leading-none">
              R$ {marmita.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {!isCombo ? (
            <div className="flex items-center overflow-hidden rounded-xl border border-[#d1e7c5] bg-white shadow-sm shrink-0">
              <button 
                onClick={handleDiminuirQuantidade}
                disabled={!itemNoCarrinho}
                className="w-8 h-8 flex items-center justify-center bg-[#7cb151] text-white font-bold transition-colors hover:bg-[#59853a] disabled:cursor-not-allowed disabled:bg-[#7cb151]/60"
              >-</button>
              <span className="font-bold text-gray-900 min-w-[30px] text-center text-sm">
                {itemNoCarrinho?.quantidade ?? 0}
              </span>
              <button 
                onClick={handleAumentarQuantidade}
                className="w-8 h-8 flex items-center justify-center bg-[#7cb151] text-white font-bold transition-colors hover:bg-[#59853a]"
              >+</button>
            </div>
          ) : (
            <button 
              onClick={handleAcaoBotao}
              className={`bg-[#7cb151] hover:bg-[#59853a] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 text-sm shrink-0 ${
                isCombo ? 'w-full py-3.5 border-b-4 border-[#4d752d] active:border-b-0 active:translate-y-1' : ''
              }`}
            >
              {isCombo ? 'Montar meu Combo' : 'Adicionar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
