import { useCart } from '../contexts/CartContext';
export const ENABLE_PROGRESSIVE_BONUS = false; // Desativado a pedido do cliente em maio/2026

interface CartProps {
  onFinalizar: () => void;
  checkoutAberto: boolean;
}

export function Cart({ onFinalizar, checkoutAberto }: CartProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) return (
    <div className="ui-empty-state mt-4">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path d="M6 7h15l-1.6 8.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.7L5.2 4H3" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      </div>
      <h2 className="font-black text-gray-800">Seu carrinho está vazio</h2>
      <p className="mt-2 text-sm text-gray-500">
        Adicione marmitas para montar seu pedido.
      </p>
    </div>
  );

  return (
    <div className="ui-card mt-4 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="ui-section-title">Carrinho</p>
          <h2 className="text-xl font-black text-gray-900">Meu pedido</h2>
        </div>
        <span className="rounded-full bg-[#e9f5e1] px-3 py-1 text-xs font-black text-[#59853a]">
          {cart.reduce((acc, item) => acc + item.quantidade, 0)} itens
        </span>
      </div>
      
      <div className="space-y-3">
      {cart.map((item) => {
        const brindePorUnidade = !ENABLE_PROGRESSIVE_BONUS ? 0 :
                                 item.nome.includes('10') ? 1 : 
                                 item.nome.includes('20') ? 2 : 
                                 item.nome.includes('30') ? 3 : 0;
        
        const totalBrindesItem = brindePorUnidade * item.quantidade;

        return (
          <div key={item.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <img
                src={item.imagem}
                alt={item.nome}
                loading="lazy"
                decoding="async"
                width="56"
                height="56"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900">{item.nome}</h4>
                {item.tamanho && (
                  <span className="mt-1 inline-flex rounded-full bg-[#e9f5e1] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#59853a]">
                    {item.tamanho}
                  </span>
                )}
                <p className="mt-1 text-sm font-black text-[#59853a]">
                  {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              
              <div className="flex shrink-0 items-center overflow-hidden rounded-xl border border-[#d1e7c5] bg-white shadow-sm">
                <button 
                  onClick={() => updateQuantity(item.id, 'decrease')}
                  className="flex h-8 w-8 items-center justify-center bg-[#7cb151] font-bold text-white transition-colors hover:bg-[#59853a]"
                >-</button>
                <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantidade}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 'increase')}
                  className="flex h-8 w-8 items-center justify-center bg-[#7cb151] font-bold text-white transition-colors hover:bg-[#59853a]"
                >+</button>
              </div>
            </div>

            <button 
              onClick={() => removeFromCart(item.id)}
              className="mt-2 text-xs font-bold text-red-400 transition-colors hover:text-red-500"
            >
              Remover item
            </button>

            {/* COMPOSIÇÃO DO COMBO */}
            {item.escolhas && item.escolhas.length > 0 && (
              <div className="mt-3 rounded-xl border border-dashed border-[#d1e7c5] bg-[#f9fbf7] p-3">
                <p className="text-[10px] font-black text-[#59853a] uppercase mb-1">Composição:</p>
                {item.escolhas.map((esc) => (
                  <div key={esc.id} className="flex justify-between gap-3 text-[11px] text-gray-600">
                    <span className="min-w-0">{esc.nome}</span>
                    <span className="font-bold text-gray-800">{esc.quantidade} un.</span>
                  </div>
                ))}
              </div>
            )}

            {/* IMPLEMENTAÇÃO: BRINDE ATUALIZADO PELA QUANTIDADE */}
            {ENABLE_PROGRESSIVE_BONUS && item.categoria === 'Combo' && totalBrindesItem > 0 && (
              <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 shadow-sm animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[10px] font-black text-amber-800">+</span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-amber-700 uppercase tracking-tighter">
                      Bônus de PROMOCIONAL
                    </span>
                    <span className="text-[11px] font-black text-amber-900 leading-tight">
                      +{totalBrindesItem} Marmita{totalBrindesItem > 1 ? 's' : ''} Grátis (300g ou 350g)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-xl font-black text-gray-900">
          <span>Total:</span>
          <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        
        {!checkoutAberto && (
          <button 
            onClick={onFinalizar}
            className="ui-button-primary mt-4 w-full"
          >
            Finalizar Pedido via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
