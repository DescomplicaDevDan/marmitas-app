# Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o Projeto:** [nutricomp.com.br](https://www.nutricomp.com.br)

Sistema escalável de cardápio digital e automação de logística para marmitaria fitness. Focado em **UX de alta conversão**, **Clean Code** e separação de fluxos de produção.

---

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
* **Integridade Nutricional:** Tabelas nutricionais vinculadas pelo `id` canônico do produto, evitando associação incorreta entre pratos visualmente parecidos ou códigos legados.
* **Gramagem Obrigatória:** Seleção explícita de 300g ou 450g para marmitas avulsas e combos, com preço próprio por tamanho, itens separados no carrinho e gramagem enviada no pedido final.
* **Arquitetura Profissional:** Tipagem estrita com TypeScript, componentização limpa e gestão de estado global centralizada via Context API (`CartContext`).
* **Design System Simples:** Classes utilitárias reutilizáveis para cards, botões, inputs, estados vazios e títulos de seção, reduzindo inconsistência visual entre cardápio, carrinho e checkout.

---

## Stack Tecnológica

| Camada | Ferramentas |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Linguagem** | TypeScript (Strict Mode) |
| **Estado** | Context API, LocalStorage |
| **Infra/SEO** | HostGator, SSL, Google Search Console |

---

## Regras de Negócio & Diferenciais

* **Tabela de Preços Dinâmica:** Controle unificado de valores por gramagem. Avulsas: 300g por R$ 22,00 e 450g por R$ 26,90. Combos 450g: 10 unidades por R$ 220,00, 20 unidades por R$ 380,00 e 30 unidades por R$ 510,00.
* **Bônus Progressivo Acumulativo:** Algoritmo dinâmico que escaneia o carrinho e calcula automaticamente o direito a marmitas de brinde de acordo com o volume de combos selecionados (10, 20 ou 30 unidades), emitindo um alerta destacado de `ATENÇÃO COZINHA`.
* **Checkout Inteligente:** Coleta de dados fiscais (CPF), validação de máscara de endereço com foco na cidade de São Paulo e suporte a observações personalizadas que preservam a caixa do texto digitado pelo usuário.
* **Busca Inteligente no Cardápio:** Pesquisa local por nome, descrição, ingredientes e categoria, com normalização de acentos para melhorar descoberta de pratos.
* **Cards de Produto Otimizados:** Layout compacto com hierarquia tipográfica clara, seletor obrigatório de gramagem, tabela nutricional integrada à linha de decisão, seletor de quantidade alinhado ao preço, variação horizontal para telas pequenas e estado visual para itens no carrinho.
* **Feedback de Interação:** Toast discreto com transparência e fade-out para confirmar adição ou atualização de itens sem interromper o fluxo de compra.
* **Resumo Fixo Mobile:** Barra inferior com quantidade de itens, total do pedido e ação rápida para acessar o carrinho em telas pequenas.
* **Fluxo de Combo Aprimorado:** Modal com seleção obrigatória de gramagem, busca interna, barra de progresso, contagem de itens selecionados e destaque visual para marmitas já escolhidas.
* **Tabela Nutricional Contextual:** Exibição sob demanda por clique, painel compacto no mobile, overlay sobre o card no desktop, fechamento por botão dedicado ou clique fora e título completo do prato sem truncamento.
* **Design de Interface:** Sticky Footer para conversão no mobile, componentes responsivos, espaçamento visual controlado, grid padronizado, imagens com recorte consistente e ícones SVG alinhados ao visual do produto.
* **Carrinho e Checkout Refinados:** Carrinho com estado vazio profissional, itens em cards internos, composição de combos organizada e checkout dividido em Dados pessoais, Entrega e Pagamento.

---

## Organização dos Componentes

| Componente | Responsabilidade |
| :--- | :--- |
| `MarmitaCard` | Renderiza o card do produto, preço por gramagem, seletor de quantidade centralizado, link nutricional e comportamento de clique fora. |
| `TabelaNutricional` | Exibe os dados nutricionais do prato em overlay com scroll interno e layout adaptável ao nome completo do produto. |
| `ComboModal` | Gerencia a montagem de combos com gramagem obrigatória, busca interna, seleção de marmitas, progresso e controles de quantidade. |
| `CategoryFilter` | Controla a navegação por categorias com chips responsivos e rolagem horizontal no mobile. |
| `Cart` | Exibe carrinho, estado vazio, itens selecionados, composição dos combos, total e chamada para checkout. |
| `CheckoutForm` | Organiza dados pessoais, entrega, pagamento e observações antes do envio via WhatsApp. |
| `CartContext` | Centraliza estado do carrinho, persistência, separação por gramagem e atualização de quantidades. |

---

## Qualidade de Dados

* Os nomes dos produtos com tabela nutricional foram padronizados para refletir o nome completo do prato.
* Registros nutricionais sem produto correspondente foram removidos para evitar dados órfãos.
* Pratos sem dados nutricionais confiáveis permanecem sem link de informação nutricional até validação da tabela oficial.

---

## Configuração Local

1. Clone o repositório.
2. Crie um arquivo `.env` na raiz do projeto.
3. Insira a seguinte variável de ambiente:
```env
VITE_WHATSAPP_NUMBER=5511XXXXXXXXX # (DDI + DDD + número de destino sem espaços ou traços)
```

4. Instale as dependências:
```bash
npm install
```

5. Execute o projeto em ambiente local:
```bash
npm run dev
```

## Validação

```bash
npm run quality
npm run typecheck
npm run build
```

Use `npm run quality` para validar contratos TypeScript, regras de preço/gramagem e pontos estruturais de performance. Use `npm run build` para verificar compilação de produção e tamanho dos bundles gerados pelo Vite.
