import { MarmitaCard } from './components/MarmitaCard';
import { marmitas } from './data/marmitas';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-orange-600 italic">NUTRICOMP</h1>
          <p className="text-gray-500">Alimentação Saudável e Prática</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Aqui é o Grid que organiza as marmitas em colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marmitas.map((item) => (
            <MarmitaCard key={item.id} marmita={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;