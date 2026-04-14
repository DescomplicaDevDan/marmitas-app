import { useState } from 'react';
import { type Marmita, type EscolhaCombo } from '../types';
import { CategoryFilter } from './CategoryFilter';

interface Props {
  combo: Marmita;
  marmitasDisponiveis: Marmita[];
  onConfirm: (escolhas: EscolhaCombo[]) => void;
  onClose: () => void;
}

export function ComboModal({ combo, marmitasDisponiveis, onConfirm, onClose }: Props) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [escolhas, setEscolhas] = useState<EscolhaCombo[]>([]);

  const metaUnidades = parseInt(combo.nome.replace(/\D/g, '')) || 10;
  const totalSelecionado = escolhas.reduce((sum, item) => sum + item.quantidade, 0);

  const categoriasFiltro = Array.from(
    new Set(marmitasDisponiveis.filter(m => m.categoria !== 'Combo').map(m => m.categoria))
  );

  const marmitasParaExibir = marmitasDisponiveis.filter(m => {
    const naoECombo = m.categoria !== 'Combo';
    const matchesFiltro = categoriaSelecionada === 'Todos' ? true : m.categoria === categoriaSelecionada;
    return naoECombo && matchesFiltro;
  });

  const handleUpdateQuantity = (marmita: Marmita, delta: number) => {
    setEscolhas((prev) => {
      const mId = String(marmita.id);
      const existente = prev.find(item => String(item.id) === mId);

      if (existente) {
        const novaQtd = Math.max(0, existente.quantidade + delta);
        if (totalSelecionado + delta > metaUnidades && delta > 0) return prev;
        
        if (novaQtd === 0) return prev.filter(item => String(item.id) !== mId);
        return prev.map(item => String(item.id) === mId ? { ...item, quantidade: novaQtd } : item);
      }

      if (delta > 0 && totalSelecionado < metaUnidades) {
        return [...prev, { 
          id: marmita.id, 
          codigoPrato: marmita.codigoPrato ?? '', 
          nome: marmita.nome, 
          quantidade: 1 
        }];
      }
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">{combo.nome}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold uppercase text-xs tracking-widest">Fechar</button>
          </div>
          
          <div className="bg-[#f9fbf7] p-3 rounded-xl border border-[#d1e7c5] flex justify-between items-center">
            <span className="text-sm font-bold text-[#59853a]">Progresso da seleção:</span>
            <span className={`text-lg font-black ${totalSelecionado === metaUnidades ? 'text-green-600' : 'text-amber-500'}`}>
              {totalSelecionado} / {metaUnidades}
            </span>
          </div>
        </div>

        {/* Filtro de Categorias */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <CategoryFilter 
            categories={categoriasFiltro}
            selectedCategory={categoriaSelecionada}
            onSelect={setCategoriaSelecionada}
          />
        </div>

        {/* Lista de Itens Filtrados */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {marmitasParaExibir.length > 0 ? (
            marmitasParaExibir.map((marmita) => {
              const itemNaEscolha = escolhas.find(i => String(i.id) === String(marmita.id));
              const qtdNoCombo = itemNaEscolha?.quantidade || 0;
              
              return (
                <div key={marmita.id} className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-[#7cb151]/30 transition-all bg-white">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={marmita.imagem} className="w-16 h-16 rounded-xl object-cover" alt={marmita.nome} />
                      {qtdNoCombo > 0 && (
                        <div className="absolute -top-2 -right-2 bg-[#7cb151] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                          {qtdNoCombo}
                        </div>
                      )}
                    </div>
                    <div>
                      {/* Exibe o código também no modal para conferência */}
                      <span className="text-[10px] font-bold text-gray-400 block uppercase">Cod: {marmita.codigoPrato}</span>
                      <h4 className="font-bold text-gray-800 text-sm">{marmita.nome.toUpperCase()}</h4>
                      <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                        {marmita.categoria}
                      </span>
                    </div>
                  </div>
                  
                  {/* Controles de Quantidade */}
                  <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-100">
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(marmita, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                    >-</button>
                    <span className="font-bold text-gray-800 w-4 text-center text-sm">{qtdNoCombo}</span>
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(marmita, 1)}
                      disabled={totalSelecionado >= metaUnidades}
                      className={`w-8 h-8 flex items-center justify-center rounded-md shadow-sm font-bold transition-all ${
                        totalSelecionado >= metaUnidades 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-[#7cb151] text-white hover:bg-[#59853a]'
                      }`}
                    >+</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm italic">
              Nenhuma marmita encontrada nesta categoria.
            </div>
          )}
        </div>

        {/* Rodapé com Botão de Ação */}
        <div className="p-6 border-t bg-gray-50 rounded-b-3xl">
          <button
            type="button"
            disabled={totalSelecionado !== metaUnidades}
            onClick={() => onConfirm(escolhas)}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg ${
              totalSelecionado === metaUnidades 
              ? 'bg-[#7cb151] text-white shadow-green-100 hover:scale-[1.02]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed uppercase text-sm tracking-widest'
            }`}
          >
            {totalSelecionado === metaUnidades 
              ? 'Finalizar Seleção' 
              : `Faltam selecionar ${metaUnidades - totalSelecionado} marmitas`}
          </button>
        </div>
      </div>
    </div>
  );
}