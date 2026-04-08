import { useState, useEffect } from 'react';
import { MarmitaCard } from './components/MarmitaCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { marmitas } from './data/marmitas';
import { useCart } from './contexts/CartContext';
import { ComboModal } from './components/ComboModal';
import { type Marmita, type EscolhaCombo } from './types';
import logo from './assets/Logo.png';

function App() {
  const { totalItems, addToCart } = useCart();
  const [comboSendoMontado, setComboSendoMontado] = useState<Marmita | null>(null);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

  useEffect(() => {
    if (totalItems === 0) {
      setMostrarCheckout(false);
    }
  }, [totalItems]);

  const handleConfirmarCombo = (escolhas: EscolhaCombo[]) => {
    if (comboSendoMontado) {
      addToCart({
        ...comboSendoMontado,
        escolhas 
      });
      setComboSendoMontado(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm pt-6 pb-2 mb-8 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center">
          <div className="flex justify-center transition-all duration-300">
            <img 
              src={logo} 
              alt="Nutricomp - Companhia de Nutrição" 
              className="h-24 lg:h-36 w-auto object-contain" 
            />
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="bg-[#e9f5e1] text-[#59853a] px-4 py-2 rounded-full font-bold shadow-sm border border-[#d1e7c5] flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer whitespace-nowrap">
              <span className="text-xl">🛒</span>
              <span className="text-sm lg:text-base">Itens: {totalItems}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8 items-start">
        
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {marmitas.map((item) => (
              <MarmitaCard 
                key={item.id} 
                marmita={item} 
                onMontarCombo={(m) => setComboSendoMontado(m)} 
              />
            ))}
          </div>
        </div>
        
        <aside className="w-full lg:w-96 flex flex-col gap-6 lg:sticky lg:top-40 lg:max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
          <Cart onFinalizar={() => setMostrarCheckout(true)} checkoutAberto={mostrarCheckout} />
          {mostrarCheckout && <CheckoutForm />}
        </aside>

      </main>

      {comboSendoMontado && (
        <ComboModal 
          combo={comboSendoMontado}
          marmitasDisponiveis={marmitas}
          onClose={() => setComboSendoMontado(null)}
          onConfirm={handleConfirmarCombo}
        />
      )}
    </div>
  );
}

export default App;