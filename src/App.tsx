import { MarmitaCard } from './components/MarmitaCard';
import { Cart } from './components/Cart';
import { marmitas } from './data/marmitas';
import { useCart } from './contexts/CartContext';

function App() {
  const { totalItems } = useCart();

  return (
    
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 mb-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 italic">NUTRICOMP</h1>
            <p className="text-gray-500 text-sm">Alimentação Saudável e Prática</p>
          </div>
          
          {/* 3. O "Contador" do Carrinho aparecendo aqui! */}
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">
            🛒 Itens: {totalItems}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8">
        {/* LADO ESQUERDO: O Grid de Marmitas */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {marmitas.map((item) => (
              <MarmitaCard key={item.id} marmita={item} />
            ))}
          </div>
        </div>
        
        {/* LADO DIREITO: O Carrinho Fixo */}
        <aside className="w-full lg:w-96 sticky top-24 self-start">
          <Cart />
        </aside>
      </main>

    </div>
  );
}

export default App;