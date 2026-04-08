import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { CheckoutFormData, CartItem } from '../types';

export function CheckoutForm() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    nome: '',
    telefone: '',
    endereco: '',
    nº: '',
    cep: '',
    bairro: '',
    cidade: 'São Paulo',
    formaPagamento: 'pix',
    observacoes: ''
  });

  // 1. COLOQUE ESTA FUNÇÃO AQUI (AUXILIAR DE LIMPEZA)
  const apenasNumeros = (valor: string) => valor.replace(/\D/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const telefoneDono = "5522992090717"; 

    const listaItens = cart.map((item: CartItem) => {
      let texto = `- ${item.quantidade}x *${item.nome}*`;
      if (item.categoria === 'Combo' && item.escolhas) {
        const escolhas = item.escolhas.map((esc: any) => `   . ${esc.quantidade}x ${esc.nome}`).join('\n');
        texto += `\n${escolhas}`;
      }
      return texto;
    }).join('\n\n');

    const textoPedido = 
      `*NOVO PEDIDO - NUTRICOMP*\n\n` +
      `Ola! Gostaria de finalizar meu pedido:\n\n` +
      `*CLIENTE:* ${formData.nome}\n` +
      `*WhatsApp:* ${formData.telefone}\n\n` +
      `--- \n` +
      `*ITENS DO PEDIDO:*\n${listaItens}\n\n` +
      `--- \n` +
      `*TOTAL:* R$ ${totalPrice.toFixed(2)}\n` +
      `*FORMA DE PAGAMENTO:* ${formData.formaPagamento.toUpperCase()}\n\n` +
      `*ENDERECO DE ENTREGA:*\n` +
      `${formData.endereco}, n ${formData.nº}\n` +
      `${formData.bairro} - ${formData.cidade}\n` +
      `*CEP:* ${formData.cep}\n\n` +
      `${formData.observacoes ? `*OBSERVACAO:* ${formData.observacoes}\n\n` : ''}` +
      `*Aguardando o valor do frete para confirmar o pedido.*`;

    const mensagem = encodeURIComponent(textoPedido);
    window.open(`https://wa.me/${telefoneDono}?text=${mensagem}`, '_blank');
    
    clearCart();
    setFormData({
      nome: '', telefone: '', endereco: '', nº: '', cep: '',
      bairro: '', cidade: 'São Paulo', formaPagamento: 'pix', observacoes: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-black text-gray-800 mb-4">Finalizar Pedido</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          required
          placeholder="Nome Completo"
          value={formData.nome}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
          onChange={e => setFormData({...formData, nome: e.target.value})}
        />

        {/* 2. APLICAÇÃO NO TELEFONE (Máx 11 dígitos) */}
        <input 
          required
          type="tel"
          placeholder="WhatsApp (apenas números)"
          value={formData.telefone}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
          onChange={e => setFormData({...formData, telefone: apenasNumeros(e.target.value).slice(0, 11)})}
        />

        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <input 
              required
              placeholder="Endereço (Rua/Av)"
              value={formData.endereco}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
              onChange={e => setFormData({...formData, endereco: e.target.value})}
            />
          </div>
          {/* 3. APLICAÇÃO NO NÚMERO */}
          <div className="col-span-1">
            <input 
              required
              placeholder="Nº"
              value={formData.nº}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
              onChange={e => setFormData({...formData, nº: apenasNumeros(e.target.value)})}
            />
          </div>
        </div>

        {/* 4. APLICAÇÃO NO CEP (Máx 8 dígitos) */}
        <input 
          required 
          placeholder="CEP (apenas números)" 
          value={formData.cep}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]" 
          onChange={e => setFormData({...formData, cep: apenasNumeros(e.target.value).slice(0, 8)})} 
        />

        <div className="grid grid-cols-2 gap-2">
          <input 
            required 
            placeholder="Bairro" 
            value={formData.bairro}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]" 
            onChange={e => setFormData({...formData, bairro: e.target.value})} 
          />
          <input 
            required 
            placeholder="Cidade" 
            value={formData.cidade}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]" 
            onChange={e => setFormData({...formData, cidade: e.target.value})} 
          />
        </div>

        <select 
          value={formData.formaPagamento}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] font-bold text-gray-700"
          onChange={e => setFormData({...formData, formaPagamento: e.target.value as any})}
        >
          <option value="pix">Pagamento: Pix</option>
          <option value="cartao de crédito">Cartão de Crédito</option>
          <option value="Cartão de débito">Cartão de Débito</option>
        </select>

        <textarea 
          placeholder="Observações? (ex: sem cebola)" 
          value={formData.observacoes}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] resize-none h-24" 
          onChange={e => setFormData({...formData, observacoes: e.target.value})} 
        />

        <button 
          type="submit"
          disabled={totalItems === 0}
          className="w-full bg-[#7cb151] hover:bg-[#59853a] disabled:bg-gray-300 text-white py-4 rounded-xl font-black text-lg transition-all shadow-md active:scale-95"
        >
          {totalItems === 0 ? 'Carrinho Vazio' : 'Enviar Pedido via WhatsApp'}
        </button>
      </form>
    </div>
  );
}