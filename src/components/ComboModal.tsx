import { useState } from 'react';
import { type Marmita, type EscolhaCombo } from '../types';
import { CategoryFilter } from './CategoryFilter';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';

interface Props {
  combo: Marmita;
  marmitasDisponiveis: Marmita[];
  onConfirm: (escolhas: EscolhaCombo[]) => void;
  onClose: () => void;
}

export function ComboModal({ combo, marmitasDisponiveis, onConfirm, onClose }: Props) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [buscaCombo, setBuscaCombo] = useState('');
  const [escolhas, setEscolhas] = useState<EscolhaCombo[]>([]);

  const baseUnidades = parseInt(combo.nome.replace(/\D/g, '')) || 10;

  const unidadesBrinde = !ENABLE_PROGRESSIVE_BONUS ? 0 :
                        combo.nome.includes('10') ? 1 : 
                        combo.nome.includes('20') ? 2 : 
                        combo.nome.includes('30') ? 3 : 0;
                  
  const metaUnidades = baseUnidades + unidadesBrinde;

  const totalSelecionado = escolhas.reduce((sum, item) => sum + item.quantidade, 0);

  const categoriasFiltro = Array.from(
    new Set(marmitasDisponiveis.filter(m => m.categoria !== 'Combo').map(m => m.categoria))
  );

  const progressoPercentual = Math.min((totalSelecionado / metaUnidades) * 100, 100);

  const marmitasParaExibir = marmitasDisponiveis.filter(m => {
    const naoECombo = m.categoria !== 'Combo';
    const matchesFiltro = categoriaSelecionada === 'Todos' ? true : m.categoria === categoriaSelecionada;
    const termoNormalizado = buscaCombo
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (!termoNormalizado) {
      return naoECombo && matchesFiltro;
    }

    const textoBusca = [
      m.nome,
      m.descricao,
      m.ingredientes,
      m.categoria,
      m.codigoPrato,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return naoECombo && matchesFiltro && textoBusca.includes(termoNormalizado);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-[28px] w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight uppercase leading-tight">{combo.nome}</h2>
            <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600 font-bold uppercase text-[11px] sm:text-xs tracking-widest">Fechar</button>
          </div>
          
          <div className="bg-[#f9fbf7] p-3 rounded-2xl border border-[#d1e7c5]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-bold text-[#59853a]">
                {totalSelecionado} de {metaUnidades} selecionadas
              </span>
              <span className={`text-xs sm:text-sm font-black ${totalSelecionado === metaUnidades ? 'text-green-600' : 'text-amber-500'}`}>
                {totalSelecionado === metaUnidades ? 'Completo' : `Faltam ${metaUnidades - totalSelecionado}`}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e9f5e1]">
              <div
                className="h-full rounded-full bg-[#7cb151] transition-all"
                style={{ width: `${progressoPercentual}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filtro de Categorias */}
        <div className="px-5 sm:px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="relative mb-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7cb151]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              value={buscaCombo}
              onChange={(event) => setBuscaCombo(event.target.value)}
              placeholder="Buscar marmita no combo"
              className="ui-input bg-white pl-11"
            />
          </div>
          <CategoryFilter 
            categories={categoriasFiltro}
            selectedCategory={categoriaSelecionada}
            onSelect={setCategoriaSelecionada}
          />
        </div>

        {/* Lista de Itens Filtrados */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {marmitasParaExibir.length > 0 ? (
            marmitasParaExibir.map((marmita) => {
              const itemNaEscolha = escolhas.find(i => String(i.id) === String(marmita.id));
              const qtdNoCombo = itemNaEscolha?.quantidade || 0;
              
              return (
                <div key={marmita.id} className={`flex items-center justify-between gap-3 p-3 rounded-2xl border hover:border-[#7cb151]/30 transition-all shadow-sm ${
                  qtdNoCombo > 0 ? 'border-[#7cb151] bg-[#f7fbf4] ring-1 ring-[#7cb151]/20' : 'border-gray-100 bg-white'
                }`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={marmita.imagem}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover"
                        alt={marmita.nome}
                        loading="lazy"
                        decoding="async"
                        width="64"
                        height="64"
                      />
                      {qtdNoCombo > 0 && (
                        <div className="absolute -top-2 -right-2 bg-[#7cb151] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                          {qtdNoCombo}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      {/* Exibe o código também no modal para conferência */}
                      <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 block uppercase">Cod: {marmita.codigoPrato}</span>
                      <h4 className="font-bold text-gray-900 text-[12px] sm:text-sm leading-snug line-clamp-2">{marmita.nome}</h4>
                      <span className="mt-1 inline-flex text-[8px] sm:text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                        {marmita.categoria}
                      </span>
                    </div>
                  </div>
                  
                  {/* Controles de Quantidade */}
                  <div className="flex shrink-0 items-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(marmita, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white font-bold text-gray-400 hover:text-red-500 transition-colors"
                    >-</button>
                    <span className="font-bold text-gray-800 w-8 text-center text-sm">{qtdNoCombo}</span>
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(marmita, 1)}
                      disabled={totalSelecionado >= metaUnidades}
                      className={`w-8 h-8 flex items-center justify-center font-bold transition-all ${
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
            <div className="ui-empty-state py-10">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </div>
              <h3 className="font-black text-gray-800">Nenhuma marmita encontrada</h3>
              <p className="mt-2 text-sm text-gray-500">
                Tente outro nome, ingrediente ou categoria.
              </p>
            </div>
          )}
        </div>

        {/* Rodapé com Botão de Ação */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            disabled={totalSelecionado !== metaUnidades}
            onClick={() => onConfirm(escolhas)}
            className={`w-full py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-lg transition-all shadow-lg ${
              totalSelecionado === metaUnidades 
              ? 'bg-[#7cb151] text-white shadow-green-100 hover:scale-[1.02]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed uppercase tracking-widest'
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
