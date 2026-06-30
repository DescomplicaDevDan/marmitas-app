# Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o Projeto:** https://www.nutricomp.com.br

Sistema de cardápio digital e automação de pedidos desenvolvido para uma empresa do segmento de suplementação alimentar.

A aplicação foi criada para substituir processos manuais realizados via WhatsApp, automatizando regras de negócio, reduzindo retrabalho operacional e proporcionando uma experiência de compra simples, rápida e intuitiva para os clientes.

---

## Problema

O processo comercial era realizado manualmente por meio de mensagens, exigindo conferência constante de produtos, aplicação manual de promoções, organização individual dos pedidos e comunicação repetitiva entre atendimento e produção.

Esse fluxo gerava:

* Retrabalho operacional;
* Maior tempo de atendimento;
* Risco de inconsistências nos pedidos;
* Dificuldade para escalar o volume de vendas;
* Dependência excessiva de processos manuais;
* Gargalos entre atendimento e cozinha.

---

## Solução

Desenvolvimento de uma aplicação web utilizando React, TypeScript e Tailwind CSS para digitalizar e automatizar todo o fluxo comercial.

A plataforma permite:

* Catálogo digital responsivo;
* Montagem de combos personalizados;
* Carrinho persistente com LocalStorage;
* Checkout estruturado;
* Integração com WhatsApp;
* Aplicação automática de regras promocionais;
* Controle de brindes progressivos;
* Consulta de informações nutricionais;
* Organização automática dos pedidos para produção.

---

## Resultados

* Redução do tempo de processamento dos pedidos;
* Eliminação de gargalos operacionais;
* Padronização do fluxo comercial;
* Melhor experiência para clientes e operadores;
* Processo preparado para crescimento e escalabilidade;
* Redução da dependência de controles manuais.

---

## Inteligência Artificial no Desenvolvimento

Durante o desenvolvimento do projeto foram utilizadas ferramentas de Inteligência Artificial como apoio para:

* Pesquisa técnica;
* Validação de abordagens arquiteturais;
* Revisão e refinamento de código;
* Documentação técnica;
* Prototipação de funcionalidades;
* Aceleração do processo de desenvolvimento.

A IA foi utilizada como ferramenta de produtividade e aprendizado, mantendo todas as decisões técnicas, implementação e validações sob responsabilidade do desenvolvedor.

---

# Destaques de Engenharia

## Logística Automatizada & Triagem de Cozinha

Integração robusta via WhatsApp com payload estruturado.

O sistema separa automaticamente:

* Combos montados;
* Marmitas avulsas;
* Quantidades;
* Observações do cliente.

Isso permite que a cozinha receba informações organizadas e prontas para produção.

---

## Sanitização de Dados com Regex

Validações em tempo real para:

* CPF;
* CEP;
* Telefone.

Garantindo integridade e consistência dos dados antes do envio.

---

## Performance e Experiência do Usuário

* Interface Mobile-First;
* Persistência do carrinho via LocalStorage;
* Busca local instantânea;
* Feedbacks visuais não intrusivos;
* Layout responsivo;
* Fluxo otimizado para dispositivos móveis.

---

## Integridade Nutricional

As tabelas nutricionais são associadas por identificadores canônicos dos produtos, evitando inconsistências e associações incorretas.

---

## Arquitetura da Aplicação

* React 18
* TypeScript (Strict Mode)
* Context API
* Componentização reutilizável
* Organização modular
* Separação clara de responsabilidades

---

## Design System

Conjunto de componentes e estilos reutilizáveis para:

* Cards;
* Botões;
* Inputs;
* Estados vazios;
* Títulos;
* Elementos de navegação.

Reduzindo inconsistências visuais entre cardápio, carrinho e checkout.

---

# Stack Tecnológica

| Camada         | Ferramentas                  |
| -------------- | ---------------------------- |
| Frontend       | React 18, Vite, Tailwind CSS |
| Linguagem      | TypeScript (Strict Mode)     |
| Estado         | Context API, LocalStorage    |
| Infraestrutura | HostGator, SSL               |
| SEO            | Google Search Console        |
| Versionamento  | Git e GitHub                 |

---

# Regras de Negócio

## Tabela de Preços Dinâmica

Controle unificado de preços individuais e pacotes promocionais através de tipagem centralizada.

---

## Bônus Progressivo Acumulativo

Algoritmo responsável por identificar automaticamente a quantidade de brindes permitidos conforme o volume de combos adquiridos.

Regras:

* 10 unidades → Brinde
* 20 unidades → Brindes adicionais
* 30 unidades → Brindes adicionais

O sistema gera alertas automáticos para a equipe de produção.

---

feature/update-pricing-and-promotions
## Valor Entregue

* **Mais conversão no mobile:** Cardápio compacto, seleção rápida de gramagem e controles de quantidade alinhados para reduzir fricção na compra.
* **Menos erro operacional:** Pedido final enviado pelo WhatsApp com separação entre combos, avulsas, códigos dos pratos, quantidades e gramagem escolhida.
* **Manutenção previsível:** Preços, gramagens, carrinho, checkout e validações foram organizados em contratos TypeScript e utilitários centralizados.
* **Experiência profissional:** Interface responsiva, feedbacks visuais, estado persistente do carrinho e documentação técnica pronta para evolução do produto.

---

## Destaques de Engenharia

* **Logística Automatizada & Triagem de Cozinha:** Integração robusta via WhatsApp com payload segmentado e estruturado. O sistema separa automaticamente **Combos Montados** de **Marmitas Avulsas**, otimizando a esteira de produção da cozinha sem o uso de caracteres especiais ou emojis que quebram leitores de dados.
* **Sanitização com Regex:** Filtros em tempo real para CPF (11 dígitos limitados), CEP e Telefone, garantindo integridade total dos dados antes do envio.
* **Performance & UX:** Interface *Mobile-First*, persistência de estado do carrinho com *LocalStorage* (evitando perda de dados em reloads), busca local por prato/ingrediente, cards compactos, controles centralizados, feedbacks visuais e harmonia de grid com `items-stretch`.
* **Integridade Nutricional:** Tabelas nutricionais vinculadas pelo `id` canônico do produto, preservando a porção e os valores validados por nutricionista.
* **Gramagem Obrigatória:** Seleção explícita de 300g ou 450g para marmitas avulsas e combos, com preço próprio por tamanho, itens separados no carrinho e gramagem enviada no pedido final.
* **Arquitetura Profissional:** Tipagem estrita com TypeScript, componentização limpa e gestão de estado global centralizada via Context API (`CartContext`).
* **Design System Simples:** Classes utilitárias reutilizáveis para cards, botões, inputs, estados vazios e títulos de seção, reduzindo inconsistência visual entre cardápio, carrinho e checkout.

## Checkout Inteligente

Coleta estruturada de:

* Dados pessoais;
* Endereço;
* Informações de entrega;
* Forma de pagamento;
* Observações personalizadas.
master

---

## Busca Inteligente

Pesquisa por:

* Nome;
* Descrição;
* Ingredientes;
* Categoria.

Com normalização de acentuação para melhorar a descoberta dos produtos.

---

## Informações Nutricionais Contextuais

Consulta sob demanda com:

feature/update-pricing-and-promotions
* **Tabela de Preços Dinâmica:** Controle unificado de valores por gramagem. Avulsas: 300g por R$ 22,00 e 450g por R$ 26,90. Combos 450g: 10 unidades por R$ 220,00, 20 unidades por R$ 380,00 e 30 unidades por R$ 510,00.
* **Bônus Progressivo Acumulativo:** Algoritmo dinâmico que escaneia o carrinho e calcula automaticamente o direito a marmitas de brinde de acordo com o volume de combos selecionados (10, 20 ou 30 unidades), emitindo um alerta destacado de `ATENÇÃO COZINHA`.
* **Checkout Inteligente:** Coleta de dados fiscais (CPF), validação de máscara de endereço com foco na cidade de São Paulo e suporte a observações personalizadas que preservam a caixa do texto digitado pelo usuário.
* **Busca Inteligente no Cardápio:** Pesquisa local por nome, descrição, ingredientes e categoria, com normalização de acentos para melhorar descoberta de pratos.
* **Cards de Produto Otimizados:** Layout compacto com hierarquia tipográfica clara, seletor obrigatório de gramagem, tabela nutricional integrada à linha de decisão, seletor de quantidade alinhado ao preço, variação horizontal para telas pequenas e estado visual para itens no carrinho.
* **Feedback de Interação:** Toast discreto com transparência e fade-out para confirmar adição ou atualização de itens sem interromper o fluxo de compra.
* **Resumo Fixo Mobile:** Barra inferior com quantidade de itens, total do pedido e ação rápida para acessar o carrinho em telas pequenas.
* **Fluxo de Combo Aprimorado:** Modal com seleção obrigatória de gramagem, busca interna, barra de progresso, contagem de itens selecionados e destaque visual para marmitas já escolhidas.
* **Tabela Nutricional Contextual:** Exibição sob demanda por clique, painel compacto no mobile, aba lateral no desktop, fechamento por botão dedicado ou clique fora e título completo do prato sem truncamento.
* **Design de Interface:** Sticky Footer para conversão no mobile, componentes responsivos, espaçamento visual controlado, grid padronizado, imagens com recorte consistente e ícones SVG alinhados ao visual do produto.
* **Carrinho e Checkout Refinados:** Carrinho com estado vazio profissional, itens em cards internos, composição de combos organizada e checkout dividido em Dados pessoais, Entrega e Pagamento.

* Overlay responsivo;
* Scroll interno;
* Adaptação para desktop e mobile;
* Exibição completa dos dados nutricionais.
master

---

# Organização dos Componentes

feature/update-pricing-and-promotions
| Componente | Responsabilidade |
| :--- | :--- |
| `MarmitaCard` | Renderiza o card do produto, preço por gramagem, seletor de quantidade centralizado, link nutricional e comportamento de clique fora. |
| `TabelaNutricional` | Exibe os dados nutricionais do prato em overlay com scroll interno e layout adaptável ao nome completo do produto. |
| `ComboModal` | Gerencia a montagem de combos com gramagem obrigatória, busca interna, seleção de marmitas, progresso e controles de quantidade. |
| `CategoryFilter` | Controla a navegação por categorias com chips responsivos e rolagem horizontal no mobile. |
| `Cart` | Exibe carrinho, estado vazio, itens selecionados, composição dos combos, total e chamada para checkout. |
| `CheckoutForm` | Organiza dados pessoais, entrega, pagamento e observações antes do envio via WhatsApp. |
| `CartContext` | Centraliza estado do carrinho, persistência, separação por gramagem e atualização de quantidades. |

| Componente        | Responsabilidade                            |
| ----------------- | ------------------------------------------- |
| MarmitaCard       | Exibição dos produtos e interação principal |
| TabelaNutricional | Apresentação dos dados nutricionais         |
| ComboModal        | Montagem e gerenciamento de combos          |
| CategoryFilter    | Navegação por categorias                    |
| Cart              | Gerenciamento do carrinho                   |
| CheckoutForm      | Processo de checkout                        |
| CartContext       | Estado global da aplicação                  |
master

---

# Qualidade de Dados

* Padronização dos nomes dos produtos.
* Remoção de registros órfãos.
* Validação manual de informações nutricionais.
* Controle de consistência entre catálogo e dados nutricionais.

---

feature/update-pricing-and-promotions
## Auditoria de Design, Performance e Otimização

* **Design mais compacto e alinhado:** Cards revisados para aproveitar melhor o espaço em mobile e desktop, com preço, gramagem e controles de quantidade na mesma linha de decisão de compra.
* **Controles visualmente estáveis:** Botões de menos e mais usam dimensões fixas, `flex`, centralização explícita e ícones SVG, evitando desalinhamento entre estados, telas e densidades de pixel.
* **Bordas e imagens sob controle:** O card mantém `overflow-hidden` no bloco visual e a tabela nutricional abre fora desse recorte, preservando cantos arredondados, imagem consistente e aba lateral sem transbordamento.
* **Performance preservada:** Checkout e montagem de combo continuam carregados sob demanda com `lazy`/`Suspense`, reduzindo o peso inicial do cardápio.
* **Carregamento de imagem otimizado:** Os primeiros cards recebem prioridade de carregamento e os demais usam `loading="lazy"`, `decoding="async"` e dimensões declaradas para reduzir saltos visuais.
* **Sem dependências desnecessárias:** A solução mantém apenas as dependências essenciais de produção (`react`, `react-dom` e `react-router-dom`).
* **CSS enxuto na auditoria local:** A folha gerada pelo Tailwind ficou em aproximadamente 29 KB minificada para o escopo atual da interface.
* **Validação automatizada:** `npm run quality` verifica tipagem, regras de preço por gramagem, exigência de tamanho no carrinho, separação de itens por gramagem e pontos estruturais de performance.

---

## Configuração Local

# Configuração Local

## Clone o repositório

```bash
git clone <url-do-repositorio>
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
master

```env
VITE_WHATSAPP_NUMBER=5511XXXXXXXXX
```

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

feature/update-pricing-and-promotions
## Validação

```bash
npm run quality
npm run typecheck
npm run build
```

Use `npm run quality` para validar contratos TypeScript, regras de preço/gramagem e pontos estruturais de performance. Use `npm run build` para verificar compilação de produção e tamanho dos bundles gerados pelo Vite.

---

# Autor

Danilo Texeira

Desenvolvedor Front-End focado em React, TypeScript, experiência do usuário, automação de processos e Inteligência Artificial aplicada ao desenvolvimento de software.
master
