import { type PratoNutricional } from '../data/nutricao';

interface TabelaNutricionalProps {
  prato: PratoNutricional | null;
  isVisible: boolean;
  isPinned: boolean;
  onClose: () => void;
}

const linhasNutricionais: Array<{
  label: string;
  getValue: (prato: PratoNutricional) => string;
}> = [
  { label: 'Porção', getValue: (prato) => prato.porcao },
  { label: 'Calorias', getValue: (prato) => `${prato.kcal.toLocaleString('pt-BR')} kcal` },
  { label: 'Carboidratos', getValue: (prato) => prato.carboidratos },
  { label: 'Proteínas', getValue: (prato) => prato.proteinas },
  { label: 'Gorduras totais', getValue: (prato) => prato.gordurasTotais },
  { label: 'Gordura saturada', getValue: (prato) => prato.gorduraSaturada },
  { label: 'Gordura monoinsaturada', getValue: (prato) => prato.gorduraMonoinsaturada },
  { label: 'Gordura poliinsaturada', getValue: (prato) => prato.gorduraPoliinsaturada },
  { label: 'Gordura trans', getValue: (prato) => prato.gorduraTrans },
  { label: 'Fibras', getValue: (prato) => prato.fibras },
  { label: 'Sódio', getValue: (prato) => prato.sodio },
];

export function TabelaNutricional({
  prato,
  isVisible,
  isPinned,
  onClose,
}: TabelaNutricionalProps) {
  if (!prato || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-4 top-20 z-50 my-auto flex max-h-[calc(100vh-7rem)] flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:absolute sm:inset-0 sm:z-30 sm:max-h-none sm:rounded-none sm:border-0 sm:bg-white/95 sm:shadow-none sm:backdrop-blur-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#59853a]">
            Tabela Nutricional
          </span>
          <h4 className="mt-1 text-sm font-black leading-tight text-gray-900 break-words">
            {prato.nome}
          </h4>
        </div>

        {isPinned && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-gray-700"
          >
            Fechar
          </button>
        )}
      </div>

      <div className="min-h-0 overflow-y-auto pr-1">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/80">
          {linhasNutricionais.map((linha) => (
            <div
              key={linha.label}
              className="flex items-center justify-between gap-3 border-b border-gray-100 px-3 py-2 text-xs last:border-b-0"
            >
              <span className="text-gray-500">{linha.label}</span>
              <strong className="text-right font-black text-gray-800">
                {linha.getValue(prato)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
