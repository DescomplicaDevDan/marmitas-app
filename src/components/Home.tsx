import { useState, useMemo } from 'react';
import { marmitas } from '../data/marmitas'; 
import { type Marmita } from '../types';
import { CategoryFilter } from './CategoryFilter'; 
import { MarmitaCard } from './MarmitaCard';
import { ComboModal } from './ComboModal';
// 1. IMPORTAR O HOOK DO CARRINHO
import { useCart } from '../contexts/CartContext'; 

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [comboParaMontar, setComboParaMontar] = useState<Marmita | null>(null);
  
  // 2. EXTRAIR A FUNÇÃO ADDTOCART DO CONTEXTO
  const { addToCart } = useCart();

  const categorias = useMemo(() => {
    return Array.from(new Set(marmitas.map(m => m.categoria)));
  }, []);

  const marmitasFiltradas = marmitas.filter(m => 
    selectedCategory === 'Todos' ? true : m.categoria === selectedCategory
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
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

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marmitasFiltradas.map(m => (
              <MarmitaCard 
                key={m.id} 
                marmita={m} 
                onMontarCombo={() => setComboParaMontar(m)} 
              />
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-96">
           <div className="sticky top-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Seu Carrinho</h3>
              {/* O componente Cart deve ser renderizado aqui para mostrar os itens reais */}
              <p className="text-gray-400 text-sm italic">O seu carrinho está vazio.</p>
           </div>
        </aside>
      </div>

      {comboParaMontar && (
        <ComboModal 
          combo={comboParaMontar}
          marmitasDisponiveis={marmitas}
          onClose={() => setComboParaMontar(null)}
          onConfirm={(escolhas) => {
            // Agora o addToCart está disponível e salvará as escolhas!
            addToCart(comboParaMontar, escolhas); 
            setComboParaMontar(null);
          }}
        />
      )}
    </main>
  );
}