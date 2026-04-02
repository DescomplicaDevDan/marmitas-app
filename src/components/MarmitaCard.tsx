import { type Marmita } from '../types';
import { useCart } from '../contexts/CartContext';

interface Props {
  marmita: Marmita;
}

export function MarmitaCard({ marmita }: Props) {
  const { addToCart, updateQuantity, cart } = useCart();

  // Verificamos se esta marmita específica já está no carrinho
  const itemNoCarrinho = cart.find(item => item.id === marmita.id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
      {/* Imagem da Marmita */}
      <img 
        src={marmita.imagem} 
        alt={marmita.nome} 
        className="w-full h-48 object-cover"
      />
      
      {/* Conteúdo com p-5 para dar o "respiro" nas bordas */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded w-fit">
          {marmita.categoria}
        </span>
        
        <h3 className="mt-2 text-lg font-semibold text-gray-800 truncate" title={marmita.nome}>
          {marmita.nome}
        </h3>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 mb-4">
          {marmita.descricao}
        </p>
        
        {/* Rodapé: Preço e Botão bem separados */}
        <div className="mt-auto flex items-center justify-between gap-2">
          
          {/* Preço: text-lg para caber melhor e shrink-0 para não espremer */}
          <span className="text-lg font-bold text-gray-900 shrink-0">
            {marmita.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>

          <div className="flex-1 flex justify-end">
            {!itemNoCarrinho ? (
              <button 
                onClick={() => addToCart(marmita)} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap"
              >
                {marmita.categoria === 'Combo' ? 'Montar meu Combo' : 'Adicionar'}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-orange-50 p-1 rounded-lg border border-orange-200">
                <button 
                  onClick={() => updateQuantity(marmita.id, 'decrease')}
                  className="w-7 h-7 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 font-bold"
                >
                  -
                </button>
                
                <span className="font-bold text-orange-700 min-w-[18px] text-center text-sm">
                  {itemNoCarrinho.quantidade}
                </span>
                
                <button 
                  onClick={() => updateQuantity(marmita.id, 'increase')}
                  className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 font-bold"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}