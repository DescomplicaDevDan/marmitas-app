import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { CheckoutFormData, CartItem } from '../types';

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

    // FORMATAÇÃO DOS ITENS (Foco na Cozinha e Legibilidade)
    const listaItens = cart.map((item: CartItem) => {
      // LÓGICA PARA COMBO: Mantém a lista de composição
      if (item.categoria === 'Combo' && item.escolhas) {
        let textoCombo = `[COMBO] ${item.nome.toUpperCase()} (QTD: ${item.quantidade})\n`;
        textoCombo += `COMPOSICAO:\n`;
        const escolhas = item.escolhas.map((esc: any) => 
          `  > ${esc.quantidade}x [${esc.codigoPrato || 'S/C'}] ${esc.nome.toUpperCase()}`
        ).join('\n');
        return textoCombo + escolhas + `\n`;
      } 
      
      // LÓGICA PARA INDIVIDUAL: Clean e em uma linha única
      // Formato: 1x [1.1] ALMÔNDEGA DE FRANGO
      return `${item.quantidade}x [${item.codigoPrato || 'S/C'}] ${item.nome.toUpperCase()}`;

    }).join('\n---\n');

    // Resumo de brindes baseado no nome do combo
    let resumoBrindes = "";
    cart.forEach(item => {
      if (item.categoria === 'Combo') {
        if (item.nome.includes("10")) resumoBrindes += "- 1x Marmita de 300g ou 350g (BRINDE)\n";
        if (item.nome.includes("20")) resumoBrindes += "- 2x Marmitas de 300 ou 350g (BRINDE)\n";
        if (item.nome.includes("30")) resumoBrindes += "- 3x Marmitas de 300g ou 350g (BRINDE)\n";
      }
    });

    // MONTAGEM DA MENSAGEM FINAL (Sem Emojis)
    const textoPedido = 
      `NOVO PEDIDO - NUTRICOMP\n\n` +
      `CLIENTE: ${formData.nome.toUpperCase()}\n` +
      `CPF: ${formData.CPF}\n` +
      `CONTATO: ${formData.telefone}\n\n` +
      `----------------------------\n` +
      `ITENS DO PEDIDO (COZINHA):\n` +
      `----------------------------\n` +
      `${listaItens}\n` +
      `----------------------------\n\n` +
      `${resumoBrindes ? `ATENCAO COZINHA - BRINDE:\n${resumoBrindes}----------------------------\n\n` : ''}` +
      `PAGAMENTO:\n` +
      `TOTAL: R$ ${totalPrice.toFixed(2)}\n` +
      `FORMA DE PAGAMENTO: ${formData.formaPagamento.toUpperCase()}\n\n` +
      `ENDERECO DE ENTREGA:\n` +
      `${formData.endereco.toUpperCase()}, N ${formData.nº}\n` +
      `${formData.bairro.toUpperCase()} - ${formData.cidade.toUpperCase()}\n` +
      `CEP: ${formData.cep}\n\n` +
      `${formData.observacoes ? `OBSERVACAO: ${formData.observacoes.toUpperCase()}\n\n` : ''}` +
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
          <option value="pix">PAGAMENTO: PIX</option>
          <option value="cartao de crédito">CARTÃO DE CRÉDITO</option>
          <option value="Cartão de débito">CARTÃO DE DÉBITO</option>
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