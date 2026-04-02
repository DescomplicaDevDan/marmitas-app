import { type Marmita } from '../types';
import { useCart } from '../contexts/CartContext';

interface MarmitaCardProps {
  marmita: Marmita;
  onMontarCombo: (marmita: Marmita) => void;
}

export function MarmitaCard({ marmita, onMontarCombo }: MarmitaCardProps) {
  const { addToCart, cart, updateQuantity } = useCart();

  const itemNoCarrinho = cart.find((item) => item.id === marmita.id);
  const isCombo = marmita.categoria === 'Combo';

  const handleAcaoBotao = () => {
    if (isCombo) {
      onMontarCombo(marmita);
    } else {
      addToCart(marmita);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
      
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
        <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight">{marmita.nome}</h3>
        
        {/* Espaçamento fixo para descrição (alinha os cards vizinhos) */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-15">
          {marmita.descricao}
        </p>

        {/* --- RODAPÉ DINÂMICO --- */}
        <div className={`flex mt-auto pt-4 border-t border-gray-50 ${
          isCombo ? 'flex-col items-start gap-3' : 'flex-row items-center justify-between gap-2'
        }`}>
          
          {/* Preço em Preto (gray-900) */}
          <div className="flex flex-col">
            {isCombo && (
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Valor do Pacote
              </span>
            )}
            <span className="text-gray-900 font-black text-xl leading-none">
              R$ {marmita.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Lógica de Botão: Contador para marmitas / Botão Largo para combos */}
          {!isCombo && itemNoCarrinho ? (
            <div className="flex items-center gap-2 bg-[#e9f5e1] p-1 rounded-lg border border-[#d1e7c5]">
              <button 
                onClick={() => updateQuantity(marmita.id, 'decrease')}
                className="w-8 h-8 flex items-center justify-center bg-white text-[#59853a] rounded-md shadow-sm hover:bg-gray-50 font-bold"
              >-</button>
              <span className="font-bold text-[#59853a] min-w-[20px] text-center">
                {itemNoCarrinho.quantidade}
              </span>
              <button 
                onClick={() => updateQuantity(marmita.id, 'increase')}
                className="w-8 h-8 flex items-center justify-center bg-[#7cb151] text-white rounded-md shadow-sm hover:bg-[#59853a] font-bold"
              >+</button>
            </div>
          ) : (
            <button 
              onClick={handleAcaoBotao}
              className={`bg-[#7cb151] hover:bg-[#59853a] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 text-sm ${
                isCombo ? 'w-full' : ''
              }`}
            >
              {isCombo ? '📦 Montar meu Combo' : '🛒 Adicionar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}