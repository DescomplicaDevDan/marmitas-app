import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { CheckoutFormData, CartItem, EscolhaCombo } from '../types';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';

type FormaPagamento = CheckoutFormData['formaPagamento'];

const paymentOptions: { value: FormaPagamento; label: string }[] = [
  { value: 'pix', label: 'PIX' },
  { value: 'cartao de crédito', label: 'Crédito' },
  { value: 'Cartão de débito', label: 'Débito' },
];

export function CheckoutForm() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    nome: '',
    CPF: '', 
    telefone: '',
    endereco: '',
    nº: '',
    cep: '',
    bairro: '',
    cidade: 'São Paulo',
    formaPagamento: 'pix',
    observacoes: ''
  });

  const apenasNumeros = (valor: string) => valor.replace(/\D/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const telefoneDono = import.meta.env.VITE_WHATSAPP_NUMBER; 

    // Separação lógica para organizar a mensagem da cozinha
    const combos = cart.filter(item => item.categoria === 'Combo');
    const avulsas = cart.filter(item => item.categoria !== 'Combo');

    let textoItensCozinha = '';

    // 1. Monta a seção de Combos se houver algum no carrinho
    if (combos.length > 0) {
      textoItensCozinha += `--- COMBOS MONTADOS ---\n\n`;
      textoItensCozinha += combos.map((item: CartItem) => {
        let textoCombo = `[COMBO] ${item.nome}${item.tamanho ? ` (${item.tamanho})` : ''} (QTD: ${item.quantidade})\n`;
        textoCombo += `Composição:\n`;
        const escolhas = item.escolhas?.map((esc: EscolhaCombo) => 
          `  > ${esc.quantidade}x [${esc.codigoPrato || 'S/C'}] ${esc.nome}`
        ).join('\n') || '';
        return textoCombo + escolhas;
      }).join('\n\n') + '\n\n----------------------------------------\n\n';
    }

    // 2. Monta a seção de Marmitas Avulsas de forma linear e limpa
    if (avulsas.length > 0) {
      textoItensCozinha += `--- MARMITAS AVULSAS ---\n\n`;
      textoItensCozinha += avulsas.map((item: CartItem) => 
        `  > ${item.quantidade}x [${item.codigoPrato || 'S/C'}] ${item.nome}${item.tamanho ? ` (${item.tamanho})` : ''}`
      ).join('\n') + '\n';
    }

    // Cálculo da bonificação progressiva
    let totalBrindes = 0;
    if (ENABLE_PROGRESSIVE_BONUS) {
      cart.forEach(item => {
        if (item.categoria === 'Combo') {
          if (item.nome.includes("10")) totalBrindes += (1 * item.quantidade);
          if (item.nome.includes("20")) totalBrindes += (2 * item.quantidade);
          if (item.nome.includes("30")) totalBrindes += (3 * item.quantidade);
        }
      });
    }

    const resumenBrindes = totalBrindes > 0 
      ? `- ${totalBrindes}x Marmitas de 300g ou 350g (BRINDE TOTAL)\n` 
      : "";

    // Formatação amigável do texto da forma de pagamento
    const pagamentoFormatado = formData.formaPagamento === 'pix' 
      ? 'PIX' 
      : formData.formaPagamento.charAt(0).toUpperCase() + formData.formaPagamento.slice(1);

    // Estrutura final do texto em blocos limpos (Sem emojis)
    const textoPedido = 
      `NOVO PEDIDO - NUTRICOMP\n\n` +
      `DADOS DO CLIENTE\n` +
      `Cliente: ${formData.nome}\n` +
      `CPF: ${formData.CPF}\n` +
      `Contato: ${formData.telefone}\n\n` +
      `========================================\n` +
      `ITENS DO PEDIDO (COZINHA)\n` +
      `========================================\n\n` +
      `${textoItensCozinha}\n` +
      `========================================\n\n` +
      `${resumenBrindes ? `ATENCAO COZINHA - BRINDE:\n${resumenBrindes}----------------------------\n\n` : ''}` +
      `PAGAMENTO\n` +
      `Forma de Pagamento: ${pagamentoFormatado}\n` +
      `Total: R$ ${totalPrice.toFixed(2)}\n\n` +
      `ENTREGA\n` +
      `Endereço: ${formData.endereco}, N ${formData.nº}\n` +
      `Bairro: ${formData.bairro} - Cidade: ${formData.cidade}\n` +
      `CEP: ${formData.cep}\n\n` +
      `${formData.observacoes ? `OBSERVAÇÕES\n${formData.observacoes}\n\n` : ''}` +
      `----------------------------------------\n` +
      `AGUARDANDO O VALOR DO FRETE PARA CONFIRMAR O PEDIDO.`;

    const mensagem = encodeURIComponent(textoPedido);
    window.open(`https://wa.me/${telefoneDono}?text=${mensagem}`, '_blank');
    
    clearCart();
    setFormData({
      nome: '', CPF: '', telefone: '', endereco: '', nº: '', cep: '',
      bairro: '', cidade: 'São Paulo', formaPagamento: 'pix', observacoes: ''
    });
  };

  return (
    <div className="ui-card p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="ui-section-title">Checkout</p>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Finalizar pedido</h3>
        </div>
        <span className="rounded-full bg-[#e9f5e1] px-3 py-1 text-xs font-black text-[#59853a]">
          {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </span>
            <p className="text-sm font-black text-gray-900">Dados pessoais</p>
          </div>

          <input
            required
            placeholder="Nome completo"
            value={formData.nome}
            className="ui-input"
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              required
              type="text"
              placeholder="CPF"
              value={formData.CPF}
              className="ui-input"
              onChange={e => setFormData({ ...formData, CPF: apenasNumeros(e.target.value).slice(0, 11) })}
            />

            <input
              required
              type="tel"
              placeholder="WhatsApp"
              value={formData.telefone}
              className="ui-input"
              onChange={e => setFormData({ ...formData, telefone: apenasNumeros(e.target.value).slice(0, 11) })}
            />
          </div>
        </section>

        <section className="space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M9 21v-7h6v7" />
              </svg>
            </span>
            <p className="text-sm font-black text-gray-900">Entrega</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <input
              required
              placeholder="Endereço"
              value={formData.endereco}
              className="ui-input col-span-3"
              onChange={e => setFormData({ ...formData, endereco: e.target.value })}
            />
            <input
              required
              placeholder="Nº"
              value={formData.nº}
              className="ui-input col-span-1 px-3 text-center"
              onChange={e => setFormData({ ...formData, nº: apenasNumeros(e.target.value) })}
            />
          </div>

          <input
            required
            placeholder="CEP"
            value={formData.cep}
            className="ui-input"
            onChange={e => setFormData({ ...formData, cep: apenasNumeros(e.target.value).slice(0, 8) })}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Bairro"
              value={formData.bairro}
              className="ui-input"
              onChange={e => setFormData({ ...formData, bairro: e.target.value })}
            />
            <input
              required
              placeholder="Cidade"
              value={formData.cidade}
              className="ui-input"
              onChange={e => setFormData({ ...formData, cidade: e.target.value })}
            />
          </div>
        </section>

        <section className="space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f5e1] text-[#59853a]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="M3 10h18" />
                <path d="M7 15h4" />
              </svg>
            </span>
            <p className="text-sm font-black text-gray-900">Pagamento</p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-50 p-1">
            {paymentOptions.map((option) => {
              const isSelected = formData.formaPagamento === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, formaPagamento: option.value })}
                  className={`rounded-xl px-3 py-3 text-xs font-black transition-all ${
                    isSelected
                      ? 'bg-[#7cb151] text-white shadow-sm'
                      : 'text-gray-500 hover:bg-white hover:text-[#59853a]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <textarea
            placeholder="Observações do pedido"
            value={formData.observacoes}
            className="ui-input h-24 resize-none"
            onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
          />
        </section>

        <button
          type="submit"
          disabled={totalItems === 0}
          className="ui-button-primary w-full text-base uppercase"
        >
          {totalItems === 0 ? 'Carrinho vazio' : 'Enviar pedido'}
        </button>
      </form>
    </div>
  );
}
