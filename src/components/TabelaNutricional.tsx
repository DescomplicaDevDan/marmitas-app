import { listaNutricional } from '../data/nutricao';

export function TabelaNutricional() {
  return (
    <div className="p-4 md:p-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Tabela Nutricional Detalhada</h2>
      <table className="w-full text-sm text-left text-gray-600 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3">Prato</th>
            <th className="px-4 py-3">Kcal</th>
            <th className="px-4 py-3">Carb.</th>
            <th className="px-4 py-3">Prot.</th>
            <th className="px-4 py-3">Gord. Tot.</th>
            <th className="px-4 py-3">Sódio</th>
          </tr>
        </thead>
        <tbody>
          {listaNutricional.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{item.nome}</td>
              <td className="px-4 py-4">{item.kcal}</td>
              <td className="px-4 py-4">{item.carboidratos}</td>
              <td className="px-4 py-4">{item.proteinas}</td>
              <td className="px-4 py-4">{item.gordurasTotais}</td>
              <td className="px-4 py-4">{item.sodio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}