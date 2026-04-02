import { type Marmita } from '../types';

interface Props {
  marmita: Marmita;
}

export function MarmitaCard({ marmita }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <img 
        src={marmita.imagem} 
        alt={marmita.nome} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded">
          {marmita.categoria}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{marmita.nome}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{marmita.descricao}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {marmita.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {marmita.categoria === 'Combo' ? 'Montar meu Combo' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}