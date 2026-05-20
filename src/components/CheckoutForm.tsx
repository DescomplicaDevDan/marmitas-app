import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { CheckoutFormData, CartItem } from '../types';
import { ENABLE_PROGRESSIVE_BONUS } from './Cart';

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
        let textoCombo = `[COMBO] ${item.nome} (QTD: ${item.quantidade})\n`;
        textoCombo += `Composição:\n`;
        const escolhas = item.escolhas?.map((esc: any) => 
          `  > ${esc.quantidade}x [${esc.codigoPrato || 'S/C'}] ${esc.nome}`
        ).join('\n') || '';
        return textoCombo + escolhas;
      }).join('\n\n') + '\n\n----------------------------------------\n\n';
    }

    // 2. Monta a seção de Marmitas Avulsas de forma linear e limpa
    if (avulsas.length > 0) {
      textoItensCozinha += `--- MARMITAS AVULSAS ---\n\n`;
      textoItensCozinha += avulsas.map((item: CartItem) => 
        `  > ${item.quantidade}x [${item.codigoPrato || 'S/C'}] ${item.nome}`
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
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-tight">Finalizar Pedido</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          required
          placeholder="Nome Completo"
          value={formData.nome}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all"
          onChange={e => setFormData({...formData, nome: e.target.value})}
        />

        <input 
          required
          type="text"
          placeholder="CPF (apenas números)"
          value={formData.CPF}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all"
          onChange={e => setFormData({...formData, CPF: apenasNumeros(e.target.value).slice(0, 11)})}
        />

        <input 
          required
          type="tel"
          placeholder="WhatsApp (apenas números)"
          value={formData.telefone}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all"
          onChange={e => setFormData({...formData, telefone: apenasNumeros(e.target.value).slice(0, 11)})}
        />

        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <input 
              required
              placeholder="Endereço (Rua/Av)"
              value={formData.endereco}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all"
              onChange={e => setFormData({...formData, endereco: e.target.value})}
            />
          </div>
          <div className="col-span-1">
            <input 
              required
              placeholder="Nº"
              value={formData.nº}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all"
              onChange={e => setFormData({...formData, nº: apenasNumeros(e.target.value)})}
            />
          </div>
        </div>

        <input 
          required 
          placeholder="CEP (apenas números)" 
          value={formData.cep}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all" 
          onChange={e => setFormData({...formData, cep: apenasNumeros(e.target.value).slice(0, 8)})} 
        />

        <div className="grid grid-cols-2 gap-2">
          <input 
            required 
            placeholder="Bairro" 
            value={formData.bairro}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all" 
            onChange={e => setFormData({...formData, bairro: e.target.value})} 
          />
          <input 
            required 
            placeholder="Cidade" 
            value={formData.cidade}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] transition-all" 
            onChange={e => setFormData({...formData, cidade: e.target.value})} 
          />
        </div>

        <select 
          value={formData.formaPagamento}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] font-bold text-gray-700 cursor-pointer"
          onChange={e => setFormData({...formData, formaPagamento: e.target.value as any})}
        >
          <option value="pix">Pagamento: PIX</option>
          <option value="cartao de crédito">Cartão de Crédito</option>
          <option value="Cartão de débito">Cartão de Débito</option>
        </select>

        <textarea 
          placeholder="Observações? (ex: sem cebola)" 
          value={formData.observacoes}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] resize-none h-24 transition-all" 
          onChange={e => setFormData({...formData, observacoes: e.target.value})} 
        />

        <button 
          type="submit"
          disabled={totalItems === 0}
          className="w-full bg-[#7cb151] hover:bg-[#59853a] disabled:bg-gray-300 text-white py-4 rounded-xl font-black text-lg transition-all shadow-md active:scale-95 uppercase"
        >
          {totalItems === 0 ? 'Carrinho Vazio' : 'Enviar Pedido'}
        </button>
      </form>
    </div>
  );
}