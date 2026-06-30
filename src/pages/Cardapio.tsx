import { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { MarmitaCard } from '../components/MarmitaCard';
import { Cart } from '../components/Cart';
import { marmitas } from '../data/marmitas';
import { useCart } from '../contexts/CartContext';
import { CategoryFilter } from '../components/CategoryFilter';
import { Footer } from '../components/Footer'; 
import { type Marmita, type EscolhaCombo, type TamanhoMarmita } from '../types';
import logo from '../assets/Logo.webp';

const CheckoutForm = lazy(() =>
  import('../components/CheckoutForm').then((module) => ({
    default: module.CheckoutForm,
  })),
);

const ComboModal = lazy(() =>
  import('../components/ComboModal').then((module) => ({
    default: module.ComboModal,
  })),
);

export function Cardapio() {
  const { totalItems, totalPrice, addToCart } = useCart();
  const [comboSendoMontado, setComboSendoMontado] = useState<Marmita | null>(null);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  const categorias = useMemo(() => {
    return Array.from(new Set(marmitas.map(m => m.categoria)));
  }, []);

  const marmitasFiltradas = useMemo(() => {
    const termoNormalizado = searchTerm
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const filtradas = marmitas.filter((m) => {
      const matchesCategoria = selectedCategory === 'Todos' ? true : m.categoria === selectedCategory;

      if (!termoNormalizado) {
        return matchesCategoria;
      }

      const textoBusca = [
        m.nome,
        m.descricao,
        m.ingredientes,
        m.categoria,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return matchesCategoria && textoBusca.includes(termoNormalizado);
    });

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
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (totalItems === 0) {
      setMostrarCheckout(false);
    }
  }, [totalItems]);

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    setIsFeedbackVisible(true);

    const hideTimeoutId = window.setTimeout(() => {
      setIsFeedbackVisible(false);
    }, 1300);

    const clearTimeoutId = window.setTimeout(() => {
      setFeedbackMessage('');
    }, 1650);

    return () => {
      window.clearTimeout(hideTimeoutId);
      window.clearTimeout(clearTimeoutId);
    };
  }, [feedbackMessage]);

  const scrollToCart = () => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const cartSection = document.getElementById('carrinho-secao');
      if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleConfirmarCombo = (escolhas: EscolhaCombo[], tamanho: TamanhoMarmita) => {
    if (comboSendoMontado) {
      addToCart(comboSendoMontado, escolhas, tamanho); 
      setFeedbackMessage('Combo adicionado ao pedido');
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
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden w-full">
      <header className="bg-white shadow-sm pt-6 pb-2 mb-8 sticky top-0 z-50 border-b border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center">
          <div className="flex flex-col items-center justify-center transition-all duration-300">
            <img
              src={logo}
              alt="Nutricomp"
              width="420"
              height="345"
              fetchPriority="high"
              className="h-20 w-auto object-contain lg:h-36"
            />
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button 
              onClick={scrollToCart}
              className="bg-[#e9f5e1] text-[#59853a] px-3 py-2 lg:px-4 lg:py-2 rounded-full font-bold shadow-sm border border-[#d1e7c5] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 lg:h-5 lg:w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path d="M6 7h15l-1.6 8.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.7L5.2 4H3" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              <span className="text-xs lg:text-base">Itens: {totalItems}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 pb-28 lg:pb-12 flex-grow">
        <div className="ui-card w-full mb-8 p-4">
          <p className="ui-section-title mb-3 text-center md:text-left">
            Explorar Cardápio Nutricomp
          </p>
          <div className="relative mb-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7cb151]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por prato ou ingrediente"
              className="ui-input pl-11"
            />
          </div>
          <CategoryFilter 
            categories={categorias} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          <div className="flex-1 w-full min-w-0">
            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:items-stretch xl:grid-cols-3">
              {marmitasFiltradas.length > 0 ? marmitasFiltradas.map((item, index) => (
                <MarmitaCard 
                  key={item.id} 
                  marmita={item} 
                  onMontarCombo={(m) => setComboSendoMontado(m)} 
                  onFeedback={setFeedbackMessage}
                  priority={index < 3}
                />
              )) : (
                <div className="ui-empty-state sm:col-span-2 xl:col-span-3">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m16 16 4 4" />
                    </svg>
                  </div>
                  <h3 className="font-black text-gray-800">Nenhum prato encontrado</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Tente buscar por outro ingrediente ou selecionar outra categoria.
                  </p>
                  <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="ui-button-secondary"
                    >
                      Limpar busca
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('Todos');
                      }}
                      className="ui-button-primary"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <aside 
            id="carrinho-secao"
            className="w-full lg:w-96 max-w-full flex flex-col gap-6 lg:sticky lg:top-40 lg:max-h-[calc(100vh-180px)] overflow-y-auto pr-0 lg:pr-2 custom-scrollbar overflow-x-hidden"
          >
            <Cart onFinalizar={handleFinalizar} checkoutAberto={mostrarCheckout} />
            {mostrarCheckout && (
              <div id="checkout-section" className="w-full max-w-full animate-in fade-in slide-in-from-top-4 duration-500">
                <Suspense fallback={<div className="ui-card h-40 animate-pulse bg-gray-100" />}>
                  <CheckoutForm />
                </Suspense>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />

      {feedbackMessage && (
        <div className={`fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#d1e7c5] bg-white/85 px-4 py-3 text-sm font-bold text-[#59853a] shadow-xl backdrop-blur-md transition-all duration-300 ease-out lg:bottom-8 ${
          isFeedbackVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7cb151] text-xs font-black text-white">
            ✓
          </span>
          <span>{feedbackMessage}</span>
        </div>
      )}

      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d1e7c5] bg-white/95 px-4 py-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Meu pedido
              </p>
              <p className="text-sm font-black text-gray-950">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'} · {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToCart}
              className="shrink-0 rounded-2xl bg-[#7cb151] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              Ver pedido
            </button>
          </div>
        </div>
      )}

      {comboSendoMontado && (
        <Suspense fallback={null}>
          <ComboModal
            combo={comboSendoMontado}
            marmitasDisponiveis={marmitas}
            onClose={() => setComboSendoMontado(null)}
            onConfirm={handleConfirmarCombo}
          />
        </Suspense>
      )}
    </div>
  );
}
