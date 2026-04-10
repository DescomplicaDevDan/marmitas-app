# 🥗 MarmitaCard - Nutricomp

Sistema de pedido de marmitas fitness desenvolvido com **React**, **TypeScript** e **Tailwind CSS**.

## 🚀 Novas Funcionalidades

- **Integração Direta com WhatsApp**: Envio automático do pedido formatado, detalhando itens, combos e escolhas do cliente.

- **Validação de Entrada (UX)**: 
- Campos de Telefone, CEP, Número e **CPF** aceitam apenas dígitos numéricos.
- Limitação de caracteres para evitar erros de digitação (**CPF: 11 dígitos**).

- **Checkout Inteligente**: Resumo de valores, campo para observações e **coleta de dados fiscais (CPF)** para processamento de pedidos.

**Persistência de Dados (LocalStorage)**: 
- Implementação de sincronização com o armazenamento local, garantindo que o carrinho do usuário seja preservado mesmo após atualizar ou fechar a página.

**Harmonização de Interface (Responsividade)**:
- Uso de Grid Dinâmica com items-stretch, garantindo que todos os cards mantenham o mesmo tamanho e alinhamento visual.
- Uso de travas de altura mínima (min-h) para alinhar botões de ação e preços, eliminando variações visuais causadas por descrições de tamanhos diferentes.

- **Rodapé Corporativo (Institutional Footer)**: Exibição de dados reais como CNPJ, informações de contato oficial e localização (Bela Vista, SP).

- **Privacidade de Dados**: Omissão estratégica do telefone do cliente no payload da mensagem para conformidade com boas práticas de privacidade.

- **Validação de Entrada (UX)**: 
  - Campos de Telefone, CEP e Número aceitam apenas dígitos numéricos.
  - Limitação de caracteres para evitar erros de digitação (Telefone: 11 dígitos, CEP: 8 dígitos).
- **Checkout Inteligente**: Resumo de valores e campo para observações adicionais.

## 🛠️ Tecnologias
- React + Vite
- TypeScript
- Tailwind CSS
- Context API (Cart Management)
- Lucide React

## 📋 Como o Pedido Chega no WhatsApp
O pedido é estruturado de forma lógica para agilizar o atendimento e o cálculo de logística:
- **Dados do Cliente**: Nome e telefone validados.
- **Detalhamento do Pedido**: Lista completa de itens e composições específicas de cada combo.
- **Logística de Entrega**: Endereço estruturado para facilitar o cálculo de frete manual pelo administrador.

## 🧪 Engenharia e Boas Práticas
- **Segurança de Ambiente**: Uso de variáveis de ambiente (`.env`) para ocultar o número do WhatsApp no GitHub e configuração de `.gitignore`.
- **Layout de Engenharia**: Implementação de `flex-grow` e `min-h-screen` para garantir o **Sticky Footer** (rodapé fixo no fim da página).
- **Responsividade Avançada**: Interface Mobile-First com transição de `aside` lateral para scroll vertical, garantindo zero quebra de layout em telas pequenas.
- **Sanitização via Regex**: Filtros de entrada em tempo real para CPF (11 dígitos), CEP e Telefone, garantindo integridade dos dados enviados.

---
Desenvolvido por **Danilo Texeira** | Foco em UX, Performance e Clean Code.

