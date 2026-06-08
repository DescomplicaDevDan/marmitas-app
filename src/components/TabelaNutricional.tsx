import { useState } from 'react';
import { listaNutricional, type PratoNutricional } from '../data/nutricao';
import { Link } from 'react-router-dom';

export function TabelaNutricional() {
  // Estado para saber qual prato foi clicado
  const [pratoSelecionado, setPratoSelecionado] = useState<PratoNutricional | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Link to="/" className="text-sm text-gray-500 hover:underline mb-4 block">← Voltar para o cardápio</Link>
      <h2 className="text-2xl font-bold mb-6">Tabela Nutricional</h2>

      {/* Lista de Pratos (Visível para todos) */}
      <div className="grid gap-3">
        {listaNutricional.map((item) => (
          <button
            key={item.id}
            onClick={() => setPratoSelecionado(item)}
            className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-[#59853a] transition-all flex justify-between items-center"
          >
            <span className="font-semibold text-gray-800">{item.nome}</span>
            <span className="text-xs text-[#59853a] font-bold">VER DETALHES</span>
          </button>
        ))}
      </div>

      {/* Modal / Card de Detalhes (Aparece ao clicar) */}
      {pratoSelecionado && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-4">{pratoSelecionado.nome}</h3>
            <div className="space-y-3 text-sm">
              <p className="flex justify-between border-b pb-2"><span>Porção:</span> <b>{pratoSelecionado.porcao}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Calorias:</span> <b>{pratoSelecionado.kcal} kcal</b></p>
              <p className="flex justify-between border-b pb-2"><span>Carboidratos:</span> <b>{pratoSelecionado.carboidratos}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Proteínas:</span> <b>{pratoSelecionado.proteinas}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Gord. Saturada:</span> <b>{pratoSelecionado.gorduraSaturada}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Gord. Mono:</span> <b>{pratoSelecionado.gorduraMonoinsaturada}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Gord. Poli:</span> <b>{pratoSelecionado.gorduraPoliinsaturada}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Fibras:</span> <b>{pratoSelecionado.fibras}</b></p>
              <p className="flex justify-between border-b pb-2"><span>Sódio:</span> <b>{pratoSelecionado.sodio}</b></p>
            </div>
            <button 
              onClick={() => setPratoSelecionado(null)}
              className="w-full mt-6 bg-gray-100 py-3 rounded-lg font-bold text-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}