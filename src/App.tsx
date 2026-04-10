import { useState, useEffect, useMemo } from 'react';
import { MarmitaCard } from './components/MarmitaCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { marmitas } from './data/marmitas';
import { useCart } from './contexts/CartContext';
import { ComboModal } from './components/ComboModal';
import { CategoryFilter } from './components/CategoryFilter';
import { type Marmita, type EscolhaCombo } from './types';
import logo from './assets/Logo.png';

function App() {
  const { totalItems, addToCart } = useCart();
  const [comboSendoMontado, setComboSendoMontado] = useState<Marmita | null>(null);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categorias = useMemo(() => {
    return Array.from(new Set(marmitas.map(m => m.categoria)));
  }, []);

  const marmitasFiltradas = useMemo(() => {
    const filtradas = marmitas.filter(m => 
      selectedCategory === 'Todos' ? true : m.categoria === selectedCategory
    );

    if (selectedCategory === 'Todos') {
      return [...filtradas].sort((a, b) => {
        const isACombo = a.categoria.toLowerCase() === 'combo';
        const isBCombo = b.categoria.toLowerCase() === 'combo';
        if (isACombo && !isBCombo) return -1;
        if (!isACombo && isBCombo) return 1;
        return 0;
      });
    }
    return filtradas;
  }, [selectedCategory]);

  useEffect(() => {
    if (totalItems === 0) {
      setMostrarCheckout(false);
    }
  }, [totalItems]);

  const scrollToCart = () => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const cartSection = document.getElementById('carrinho-secao');
      if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleConfirmarCombo = (escolhas: EscolhaCombo[]) => {
    if (comboSendoMontado) {
      addToCart(comboSendoMontado, escolhas); 
      setComboSendoMontado(null);
    }
  };

  const handleFinalizar = () => {
    setMostrarCheckout(true);
    setTimeout(() => {
      const checkoutElement = document.getElementById('checkout-section');
      if (checkoutElement) {
        checkoutElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <header className="bg-white shadow-sm pt-6 pb-2 mb-8 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center">
          <div className="flex justify-center transition-all duration-300">
            <img 
              src={logo} 
              alt="Nutricomp" 
              className="h-24 lg:h-36 w-auto object-contain" 
            />
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button 
              onClick={scrollToCart}
              className="bg-[#e9f5e1] text-[#59853a] px-4 py-2 rounded-full font-bold shadow-sm border border-[#d1e7c5] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-xl">🛒</span>
              <span className="text-sm lg:text-base">Itens: {totalItems}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="w-full mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest text-center md:text-left">
            Explorar Cardápio Nutricomp
          </p>
          <CategoryFilter 
            categories={categorias} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            {/* CORREÇÃO AQUI: Grid com items-stretch e sem justify-center para não quebrar a altura */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {marmitasFiltradas.map((item) => (
                <MarmitaCard 
                  key={item.id} 
                  marmita={item} 
                  onMontarCombo={(m) => setComboSendoMontado(m)} 
                />
              ))}
            </div>
          </div>
          
          <aside 
            id="carrinho-secao"
            className="w-full lg:w-96 flex flex-col gap-6 lg:sticky lg:top-40 lg:max-h-[calc(100vh-180px)] overflow-y-auto lg:overflow-x-visible overflow-x-hidden pr-2 custom-scrollbar"
          >
            <Cart onFinalizar={handleFinalizar} checkoutAberto={mostrarCheckout} />
            {mostrarCheckout && (
              <div id="checkout-section" className="w-full max-w-full animate-in fade-in slide-in-from-top-4 duration-500">
                <CheckoutForm />
              </div>
            )}
          </aside>
        </div>
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