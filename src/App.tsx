import { MarmitaCard } from './components/MarmitaCard';
import { Cart } from './components/Cart';
import { marmitas } from './data/marmitas';
import { useCart } from './contexts/CartContext';
import logo from './assets/Logo.png';

function App() {
  const { totalItems } = useCart();

  return (
    
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm pt-6 pb-2 mb-8 sticky top-0 z-50 border-b border-gray-100">
        {/* Removi o min-h e ajustei o padding interno */}
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center">
          
          {/* LOGO: Centralizado */}
          <div className="flex justify-center transition-all duration-300">
            <img 
              src={logo} 
              alt="Nutricomp - Companhia de Nutrição" 
              className="h-24 lg:h-36 w-auto object-contain" 
            />
          </div>
          
          {/* CARRINHO: Flutuando à direita */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="bg-[#e9f5e1] text-[#59853a] px-4 py-2 rounded-full font-bold shadow-sm border border-[#d1e7c5] flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer whitespace-nowrap">
              <span className="text-xl">🛒</span>
              <span className="text-sm lg:text-base">Itens: {totalItems}</span>
            </div>
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