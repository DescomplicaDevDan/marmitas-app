import { useCart } from '../contexts/CartContext';
export const ENABLE_PROGRESSIVE_BONUS = false; // Desativado a pedido do cliente em maio/2026

interface CartProps {
  onFinalizar: () => void;
  checkoutAberto: boolean;
}

export function Cart({ onFinalizar, checkoutAberto }: CartProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) return (
    <div className="p-4 text-center text-gray-500 italic">O seu carrinho está vazio.</div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Meu Pedido</h2>
      
      <div className="space-y-4">
      {cart.map((item) => {
        const brindePorUnidade = !ENABLE_PROGRESSIVE_BONUS ? 0 :
                                 item.nome.includes('10') ? 1 : 
                                 item.nome.includes('20') ? 2 : 
                                 item.nome.includes('30') ? 3 : 0;
        
        const totalBrindesItem = brindePorUnidade * item.quantidade;

        return (
          <div key={item.id} className="flex flex-col border-b pb-3">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{item.nome}</h4>
                <p className="text-sm text-[#59853a] font-semibold">
                  {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, 'decrease')}
                  className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg font-bold"
                >-</button>
                <span className="font-bold w-4 text-center text-sm">{item.quantidade}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 'increase')}
                  className="w-7 h-7 flex items-center justify-center bg-[#7cb151] rounded-lg text-white font-bold"
                >+</button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-400 text-xs font-bold"
                >Remover</button>
              </div>
            </div>

            {/* COMPOSIÇÃO DO COMBO */}
            {item.escolhas && item.escolhas.length > 0 && (
              <div className="mt-2 bg-[#f9fbf7] p-2 rounded-lg border border-dashed border-[#d1e7c5]">
                <p className="text-[10px] font-black text-[#59853a] uppercase mb-1">Composição:</p>
                {item.escolhas.map((esc) => (
                  <div key={esc.id} className="flex justify-between text-[11px] text-gray-600">
                    <span>• {esc.nome}</span>
                    <span className="font-bold text-gray-800">{esc.quantidade} un.</span>
                  </div>
                ))}
              </div>
            )}

            {/* IMPLEMENTAÇÃO: BRINDE ATUALIZADO PELA QUANTIDADE */}
            {ENABLE_PROGRESSIVE_BONUS && item.categoria === 'Combo' && totalBrindesItem > 0 && (
              <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 shadow-sm animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏆</span>
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

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        
        {!checkoutAberto && (
          <button 
            onClick={onFinalizar}
            className="w-full mt-4 bg-[#7cb151] text-white py-3 rounded-xl font-bold hover:bg-[#59853a] transition-all shadow-md active:scale-95"
          >
            Finalizar Pedido via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}