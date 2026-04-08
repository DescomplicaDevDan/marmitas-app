# 🥗 Nutricomp - Meal Delivery System

A **Nutricomp** é uma aplicação de alta performance para gerenciamento de pedidos de marmitas fitness. O projeto foca em uma experiência de usuário (UX) fluida, utilizando **React** e **TypeScript** para garantir um código escalável, tipado e livre de erros em tempo de execução.

---

## 🚀 Tecnologias Utilizadas

* **React 18**: Biblioteca principal para construção da interface baseada em componentes.
* **TypeScript**: Tipagem estática para maior segurança e produtividade no desenvolvimento.
* **Tailwind CSS**: Estilização baseada em utilitários para um design responsivo e performático.
* **Context API**: Gerenciamento de estado global para o ecossistema do carrinho e checkout.
* **Lucide React**: Biblioteca de ícones vetoriais.

---

## 🛠️ Arquitetura e Funcionalidades Técnicas

### 1. Sistema de Combos Dinâmicos
Implementação de lógica para montagem de combos personalizados. O sistema valida a quantidade de itens escolhidos dentro de um modal e gera um **ID único** dinâmico (`isCombo ? id-timestamp : id`) no carrinho. Isso permite que múltiplos combos com composições diferentes coexistam sem conflitos de estado.

### 2. State Management (Context API)
Utilização de um `CartProvider` customizado que encapsula toda a lógica de negócio do carrinho:
* Cálculo automático de totais e sub-totais via `reduce`.
* Controle de persistência e atualização de quantidades.
* Interface de controle para o fluxo de exibição condicional do checkout.

### 3. Layout Independente & Sticky Aside
Domínio de **CSS Flexbox** para criar uma barra lateral (Aside) que não é influenciada pela altura da coluna principal:
* Uso de `items-start` no container pai para quebrar o estiramento automático das colunas.
* Aplicação de `sticky` combinado com `max-h` e `overflow-y-auto`, garantindo que o carrinho e o formulário permaneçam acessíveis enquanto o usuário navega por longas listas de produtos.

### 4. Integração com WhatsApp API
Algoritmo de formatação de strings para exportação de dados complexos:
* Conversão do estado do carrinho e metadados de entrega (CEP, Número, Forma de Pagamento) em uma mensagem estruturada e codificada (`encodeURIComponent`) para a API do WhatsApp.

### 5. Formulário de Checkout e Validação
* Interface `CheckoutFormData` para garantir a integridade dos dados coletados.
* Validação de campos obrigatórios e tratamento de dados sensíveis para entrega.

---

## 🏗️ Estrutura de Pastas

```text
src/
 ├── assets/          # Ativos estáticos (Logos e Imagens)
 ├── components/      # Componentes de UI reaproveitáveis (Atômicos)
 ├── contexts/        # Contextos da aplicação (CartContext)
 ├── data/            # Mock de dados e constantes de produtos
 ├── types/           # Interfaces e tipos globais do TypeScript
 └── App.tsx          # Componente principal e orquestrador de layout