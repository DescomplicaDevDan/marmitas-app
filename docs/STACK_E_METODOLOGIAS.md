# Stack, Bibliotecas e Metodologias

Este documento resume as principais tecnologias, bibliotecas, padrões e decisões técnicas utilizadas no projeto Nutricomp. O objetivo é tornar explícita a capacidade de construir uma aplicação front-end orientada a produto, conversão, manutenção e integridade de dados.

---

## Stack Principal

| Tecnologia | Uso no Projeto |
| :--- | :--- |
| React | Construção da interface por componentes reutilizáveis e estado declarativo. |
| TypeScript | Tipagem estática, contratos de dados e redução de erros em tempo de desenvolvimento. |
| Vite | Ambiente de desenvolvimento rápido e build moderno para aplicações React. |
| Tailwind CSS | Estilização utilitária, responsividade e consistência visual sem CSS global excessivo. |
| React Router | Estrutura de navegação da aplicação. |
| Context API | Gerenciamento global do carrinho e compartilhamento de estado entre componentes. |
| LocalStorage | Persistência do carrinho para evitar perda de dados em reloads. |
| Scripts NPM | Padronização de validação com `quality`, `typecheck`, `build`, `dev` e `preview`. |

---

## Bibliotecas e Ferramentas

| Biblioteca/Ferramenta | Finalidade |
| :--- | :--- |
| `react` / `react-dom` | Base da aplicação front-end. |
| `react-router-dom` | Controle de rotas e navegação. |
| `typescript` | Checagem estática com configuração em modo estrito. |
| `tailwindcss` | Design system utilitário e responsivo. |
| `postcss` / `autoprefixer` | Processamento e compatibilidade de CSS. |
| `vite` | Bundling, desenvolvimento local e preview de produção. |

---

## Decisões de Arquitetura

### Design System Enxuto

O projeto utiliza uma camada simples de classes reutilizáveis em `src/index.css` para manter consistência sem adicionar bibliotecas externas:

| Classe | Uso |
| :--- | :--- |
| `ui-card` | Containers principais, carrinho, checkout e painéis de interface. |
| `ui-card-soft` | Cards de apoio com destaque institucional em verde claro. |
| `ui-input` | Inputs e campos de busca com foco padronizado. |
| `ui-button-primary` | Botões principais de conversão. |
| `ui-button-secondary` | Ações secundárias e estados vazios. |
| `ui-section-title` | Rótulos curtos de seção com hierarquia discreta. |
| `ui-empty-state` | Estados vazios profissionais para busca, carrinho e filtros. |

### Componentização

A aplicação foi organizada em componentes com responsabilidades claras:

| Componente | Responsabilidade |
| :--- | :--- |
| `MarmitaCard` | Card de produto, preço por gramagem, controle de quantidade, link nutricional e interação de clique fora. |
| `TabelaNutricional` | Overlay de informações nutricionais com scroll interno e layout adaptável. |
| `Cart` | Exibição e edição dos itens do carrinho. |
| `ComboModal` | Fluxo de montagem de combos com gramagem obrigatória e escolhas controladas. |
| `CheckoutForm` | Coleta e validação de dados do pedido. |
| `CategoryFilter` | Filtro de categorias para navegação no cardápio. |
| `CartContext` | Estado global, separação de itens por gramagem, atualização de quantidades e persistência do carrinho. |

### Separação de Dados e UI

Os dados de produtos e dados nutricionais ficam em arquivos dedicados dentro de `src/data`, reduzindo acoplamento entre interface e conteúdo.

O vínculo entre marmita e tabela nutricional utiliza o `id` canônico do produto, evitando associação incorreta por nomes parecidos, códigos legados ou variações textuais.

As regras de gramagem e preço ficam centralizadas em `src/utils/tamanhos.ts`, evitando duplicação entre cardápio, combos, carrinho e checkout.

---

## Métodos e Boas Práticas Aplicadas

### UX e Conversão

* Cards compactos e alinhados para facilitar comparação entre produtos.
* Hierarquia visual clara: imagem, título, descrição, informação nutricional, preço e ação.
* Preço posicionado no rodapé para melhorar escaneabilidade em grid.
* Controle de quantidade direto no card, reduzindo fricção no fluxo de compra.
* Seleção explícita de 300g ou 450g antes de adicionar marmitas avulsas ou fechar combos.
* Deseleção automática da gramagem ao clicar fora do seletor, reduzindo escolha acidental.
* Informação nutricional sob demanda, evitando poluição visual no card principal.
* Busca local por prato, ingrediente, descrição e categoria para acelerar a descoberta no cardápio.
* Layout horizontal compacto para cards em telas pequenas, preservando o layout em grid para tablet e desktop.
* Estado visual para itens já adicionados ao carrinho, reforçando confirmação e reduzindo dúvida do usuário.
* Toast com fade-out e transparência para confirmar ações sem interromper a navegação.
* Barra fixa mobile com total, quantidade de itens e acesso rápido ao pedido.
* Modal de combos otimizado para mobile, com busca interna, cards compactos, progresso visual e controles proporcionais.
* Carrinho refinado com cards internos, estado vazio profissional, total destacado e composição de combos organizada.
* Checkout por seções para reduzir carga cognitiva: Dados pessoais, Entrega e Pagamento.
* Ícones SVG consistentes no lugar de emojis decorativos em pontos críticos da interface.
* Imagens com recorte consistente e carregamento preguiçoso para melhorar percepção de performance.

### Integridade de Dados

* Exibição nutricional condicionada à existência de dados confiáveis.
* Remoção de registros nutricionais sem produto correspondente.
* Padronização dos títulos dos produtos com os nomes completos da tabela nutricional.
* Prevenção de falso vínculo entre pratos com nomes ou composições parecidas.
* Carrinho separa o mesmo prato por gramagem, evitando soma incorreta entre 300g e 450g.
* Checkout envia a gramagem escolhida em marmitas avulsas e combos montados.

### React e TypeScript

* Uso de interfaces para modelar `Marmita`, `CartItem`, `EscolhaCombo` e dados de checkout.
* Estado local com `useState` para interações pontuais de UI.
* `useMemo` para derivar dados e evitar buscas desnecessárias em renderizações.
* `useEffect` com cleanup para eventos globais, como fechamento da tabela ao clicar fora.
* Temporizadores com cleanup para controlar feedbacks visuais temporários.
* `useRef` para detecção de clique fora sem bibliotecas externas.
* Utilitário centralizado para cálculo de opções de tamanho e preços por gramagem.

### Responsividade

* Layout mobile-first com Tailwind CSS.
* Grid responsivo para diferentes larguras de tela.
* Cards com `h-full`, `flex flex-col` e `mt-auto` para manter rodapés alinhados.
* Tipografia ajustada para preservar nomes completos sem tornar o card excessivamente alto.
* Breakpoints usados para alternar entre card horizontal no mobile e card vertical em telas maiores.
* Tabela nutricional com painel compacto no mobile e aba lateral no desktop.

### Checkout e Produção

* Sanitização de campos com Regex para dados como CPF, telefone e CEP.
* Montagem de payload estruturado para envio via WhatsApp.
* Separação entre combos montados e marmitas avulsas para facilitar operação de cozinha.
* Inclusão da gramagem no payload de cozinha para reduzir erro operacional na finalização.
* Persistência do carrinho para preservar intenção de compra.

---

## Qualidade e Validação

Comandos utilizados para validação local:

```bash
npm run quality
npm run typecheck
npm run build
```

O projeto utiliza TypeScript em modo estrito para reforçar contratos de dados e reduzir regressões durante refatorações. O script `quality` valida regras de preço/gramagem, separação de carrinho por tamanho, ausência de dependências de produção desnecessárias e manutenção de lazy loading em fluxos mais pesados. O build de produção via Vite também serve como checagem de desempenho, exibindo o tamanho final dos bundles.

---

## Competências Demonstradas

Este projeto demonstra experiência prática em:

* Desenvolvimento front-end com React, TypeScript e Tailwind CSS.
* Design de interfaces orientadas a conversão.
* Refatoração incremental sem interromper fluxos existentes.
* Organização de estado global com Context API.
* Validação e integridade de dados em aplicações de e-commerce.
* Tradução de necessidades de negócio em decisões técnicas.
* Construção de documentação técnica clara para manutenção e avaliação profissional.
