import { useCart } from '../contexts/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) return (
    <div className="p-4 text-center text-gray-500 italic">O seu carrinho está vazio.</div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Meu Pedido</h2>
      
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{item.nome}</h4>
              <p className="text-sm text-gray-500">{(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateQuantity(item.id, 'decrease')}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >-</button>
              
              <span className="font-bold w-4 text-center">{item.quantidade}</span>
              
              <button 
                onClick={() => updateQuantity(item.id, 'increase')}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >+</button>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm font-bold"
              >Remover</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
          Finalizar Pedido via WhatsApp
        </button>
      </div>
    </div>
  );
}