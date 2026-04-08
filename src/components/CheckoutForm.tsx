import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { CheckoutFormData, CartItem } from '../types';

export function CheckoutForm() {
  // Puxamos tudo o que o formulário precisa do contexto
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  // Estado inicial do formulário
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Telefone que vai receber o pedido (ajuste se necessário)
    const telefoneDono = "5522992090717"; 

    // 1. Monta a lista de itens para o texto do WhatsApp
    const listaItens = cart.map((item: CartItem) => {
      let texto = `• ${item.quantidade}x ${item.nome}`;
      
      if (item.categoria === 'Combo' && item.escolhas) {
        const escolhas = item.escolhas.map((esc: any) => `  └ ${esc.quantidade}x ${esc.nome}`).join('\n');
        texto += `\n${escolhas}`;
      }
      return texto;
    }).join('\n\n');

    // 2. Monta a mensagem final
    const mensagem = encodeURIComponent(
`*Novo Pedido - Nutricomp* 🥗

*Cliente:* ${formData.nome}
*WhatsApp:* ${formData.telefone}

*Itens do Pedido:*
${listaItens}

*Total:* R$ ${totalPrice.toFixed(2)}
*Pagamento:* ${formData.formaPagamento}

*Endereço:*
CEP: ${formData.cep}
${formData.endereco}, nº ${formData.nº} - ${formData.bairro}
*Cidade:* ${formData.cidade}

⚠️ *O valor do frete será calculado e informado aqui no chat.*

${formData.observacoes ? `\n*Obs:* ${formData.observacoes}` : ''}`
    );

    // 3. Abre o WhatsApp
    window.open(`https://wa.me/${telefoneDono}?text=${mensagem}`, '_blank');
    clearCart();
    setFormData({
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

        <input 
          required
          type="tel"
          placeholder="WhatsApp (22) 99999-9999"
          value={formData.telefone}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
          onChange={e => setFormData({...formData, telefone: e.target.value})}
        />

        {/* Substitua o input de Endereço por este bloco de grid */}
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
        <div className="col-span-1">
            <input 
            required
            placeholder="Nº"
            value={formData.nº}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]"
            onChange={e => setFormData({...formData, nº: e.target.value})}
            />
        </div>
        </div>

        <input 
          required 
          placeholder="CEP (00000-000)" 
          value={formData.cep}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151]" 
          onChange={e => setFormData({...formData, cep: e.target.value})} 
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
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7cb151] resize-none" 
          onChange={e => setFormData({...formData, observacoes: e.target.value})} 
        />

        <button 
          type="submit"
          disabled={totalItems === 0}
          className="w-full bg-[#7cb151] hover:bg-[#59853a] disabled:bg-gray-300 text-white py-4 rounded-xl font-black text-lg transition-all"
        >
          {totalItems === 0 ? 'Carrinho Vazio' : 'Confirmar e Enviar Pedido'}
        </button>
      </form>
    </div>
  );
}