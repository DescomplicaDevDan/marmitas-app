# 🥗 MarmitaCard - Nutricomp

Sistema de pedido de marmitas fitness desenvolvido com **React**, **TypeScript** e **Tailwind CSS**.

## 🚀 Novas Funcionalidades

- **Integração Direta com WhatsApp**: Envio automático do pedido formatado, detalhando itens, combos e escolhas do cliente.
Persistência de Dados (LocalStorage): Implementação de sincronização com o armazenamento local, garantindo que o carrinho do usuário seja preservado mesmo após atualizar ou fechar a página.

**Persistência de Dados (LocalStorage)**: 
- Implementação de sincronização com o armazenamento local, garantindo que o carrinho do usuário seja preservado mesmo após atualizar ou fechar a página.

**Harmonização de Interface (Responsividade)**:
- Uso de Grid Dinâmica com items-stretch, garantindo que todos os cards mantenham o mesmo tamanho e alinhamento visual.
- Uso de travas de altura mínima (min-h) para alinhar botões de ação e preços, eliminando variações visuais causadas por descrições de tamanhos diferentes.

- **Validação de Entrada (UX)**: 
  - Campos de Telefone, CEP e Número aceitam apenas dígitos numéricos.
  - Limitação de caracteres para evitar erros de digitação (Telefone: 11 dígitos, CEP: 8 dígitos).
- **Checkout Inteligente**: Resumo de valores e campo para observações adicionais.

## 🛠️ Tecnologias
- React + Vite
- TypeScript
- Tailwind CSS
- Context API (Cart Management)

## 📋 Como o Pedido Chega no WhatsApp
O pedido é estruturado de forma lógica para agilizar o atendimento e o cálculo de logística:
- **Dados do Cliente**: Nome e telefone validados.
- **Detalhamento do Pedido**: Lista completa de itens e composições específicas de cada combo.
- **Logística de Entrega**: Endereço estruturado para facilitar o cálculo de frete manual pelo administrador.

## 🧪 Qualidade e Boas Práticas (Destaque para Recrutadores)
- **Testes de Lógica**: Validação rigorosa das regras de negócio, incluindo cálculos de preços e bônus de marmitas grátis.
- **Consistência de UI**: Interface Mobile-First testada para manter a integridade visual em múltiplas resoluções.
- **Sanitização de Dados**: Tratamento de inputs para garantir que apenas informações consistentes sejam processadas e enviadas.



