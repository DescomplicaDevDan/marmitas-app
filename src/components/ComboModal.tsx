import { useState } from 'react';
import { type Marmita, type EscolhaCombo } from '../types';

interface Props {
  combo: Marmita;
  marmitasDisponiveis: Marmita[];
  onConfirm: (escolhas: EscolhaCombo[]) => void;
  onClose: () => void;
}

export function ComboModal({ combo, marmitasDisponiveis, onConfirm, onClose }: Props) {
  // Extraímos o número de unidades (ex: "Combo 20un" -> 20)
  const metaUnidades = parseInt(combo.nome.replace(/\D/g, '')) || 0;
  const [escolhas, setEscolhas] = useState<EscolhaCombo[]>([]);

  const totalSelecionado = escolhas.reduce((sum, item) => sum + item.quantidade, 0);

  const handleUpdateQuantidade = (marmita: Marmita, delta: number) => {
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
        return [...prev, { id: mId, nome: marmita.nome, quantidade: 1 }];
      }
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#59853a]">Montar seu {combo.nome}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Selecione as marmitas até completar <strong>{metaUnidades} unidades</strong>.
          </p>
          
          <div className="mt-4 bg-gray-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-[#7cb151] h-full transition-all duration-300"
              style={{ width: `${(totalSelecionado / metaUnidades) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs font-bold mt-1 text-[#59853a]">
            {totalSelecionado} / {metaUnidades} selecionadas
          </p>
        </div>

        <div className="overflow-y-auto p-6 space-y-3 flex-1">
          {marmitasDisponiveis
            .filter(m => m.categoria !== 'Combo')
            .map(m => {
              // COMPARAÇÃO SEGURA: Transformamos ambos em String para evitar erro
              const escolhaAtual = escolhas.find(e => String(e.id) === String(m.id));
              const qtd = escolhaAtual ? escolhaAtual.quantidade : 0;
              
              return (
                <div key={String(m.id)} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                  <span className="font-medium text-gray-700 text-sm">{m.nome}</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleUpdateQuantidade(m, -1)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                    >-</button>
                    <span className="w-4 text-center font-bold text-sm">{qtd}</span>
                    <button 
                      onClick={() => handleUpdateQuantidade(m, 1)}
                      disabled={totalSelecionado >= metaUnidades}
                      className="w-8 h-8 rounded-lg bg-[#7cb151] text-white flex items-center justify-center hover:bg-[#59853a] disabled:opacity-30"
                    >+</button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700">Cancelar</button>
          <button 
            disabled={totalSelecionado !== metaUnidades}
            onClick={() => onConfirm(escolhas)}
            className="px-8 py-2 bg-[#7cb151] text-white rounded-xl font-bold disabled:bg-gray-300 transition-all shadow-lg shadow-green-100"
          >
            Confirmar Combo
          </button>
        </div>
      </div>
    </div>
  );
}