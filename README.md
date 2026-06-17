# 🍱 Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o Projeto:** 🚀 [nutricomp.com.br](https://www.nutricomp.com.br)

Sistema escalável de cardápio digital e automação de logística para marmitaria fitness. Focado em **UX de alta conversão**, **Clean Code** e separação de fluxos de produção.

---

## ⚡ Destaques de Engenharia

* **Logística Automatizada & Triagem de Cozinha:** Integração robusta via WhatsApp com payload segmentado e estruturado. O sistema separa automaticamente **Combos Montados** de **Marmitas Avulsas**, otimizando a esteira de produção da cozinha sem o uso de caracteres especiais ou emojis que quebram leitores de dados.
* **Sanitização com Regex:** Filtros em tempo real para CPF (11 dígitos limitados), CEP e Telefone, garantindo integridade total dos dados antes do envio.
* **Performance & UX:** Interface *Mobile-First*, persistência de estado do carrinho com *LocalStorage* (evitando perda de dados em reloads), busca local por prato/ingrediente, cards compactos, feedbacks visuais e harmonia de grid com `items-stretch`.
* **Integridade Nutricional:** Tabelas nutricionais vinculadas pelo `id` canônico do produto, evitando associação incorreta entre pratos visualmente parecidos ou códigos legados.
* **Arquitetura Profissional:** Tipagem estrita com TypeScript, componentização limpa e gestão de estado global centralizada via Context API (`CartContext`).

---

## 🛠️ Stack Tecnológica

| Camada | Ferramentas |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Linguagem** | TypeScript (Strict Mode) |
| **Estado** | Context API, LocalStorage |
| **Infra/SEO** | HostGator, SSL, Google Search Console |

---

## 📋 Regras de Negócio & Diferenciais

* **Tabela de Preços Dinâmica:** Controle unificado de valores individuais (R$ 22,00) e pacotes promocionais progressivos diretamente no ecossistema de tipos.
* **Bônus Progressivo Acumulativo:** Algoritmo dinâmico que escaneia o carrinho e calcula automaticamente o direito a marmitas de brinde de acordo com o volume de combos selecionados (10, 20 ou 30 unidades), emitindo um alerta destacado de `ATENÇÃO COZINHA`.
* **Checkout Inteligente:** Coleta de dados fiscais (CPF), validação de máscara de endereço com foco na cidade de São Paulo e suporte a observações personalizadas que preservam a caixa do texto digitado pelo usuário.
* **Busca Inteligente no Cardápio:** Pesquisa local por nome, descrição, ingredientes e categoria, com normalização de acentos para melhorar descoberta de pratos.
* **Cards de Produto Otimizados:** Layout compacto com hierarquia tipográfica clara, seletor de quantidade alinhado ao preço, variação horizontal para telas pequenas e estado visual para itens no carrinho.
* **Feedback de Interação:** Toast discreto com transparência e fade-out para confirmar adição ou atualização de itens sem interromper o fluxo de compra.
* **Resumo Fixo Mobile:** Barra inferior com quantidade de itens, total do pedido e ação rápida para acessar o carrinho em telas pequenas.
* **Fluxo de Combo Aprimorado:** Modal com busca interna, barra de progresso, contagem de itens selecionados e destaque visual para marmitas já escolhidas.
* **Tabela Nutricional Contextual:** Exibição sob demanda por clique, painel compacto no mobile, overlay sobre o card no desktop, fechamento por botão dedicado ou clique fora e título completo do prato sem truncamento.
* **Design de Interface:** Sticky Footer para conversão no mobile, componentes responsivos, espaçamento visual controlado e grid padronizado para reduzir ruído visual.

---

## 🧩 Organização dos Componentes

| Componente | Responsabilidade |
| :--- | :--- |
| `MarmitaCard` | Renderiza o card do produto, preço, seletor de quantidade, link nutricional e comportamento de clique fora. |
| `TabelaNutricional` | Exibe os dados nutricionais do prato em overlay com scroll interno e layout adaptável ao nome completo do produto. |
| `ComboModal` | Gerencia a montagem de combos com busca interna, seleção de marmitas, progresso e controles de quantidade. |
| `CategoryFilter` | Controla a navegação por categorias com chips responsivos e rolagem horizontal no mobile. |
| `CartContext` | Centraliza estado do carrinho, persistência e atualização de quantidades. |

---

## ✅ Qualidade de Dados

* Os nomes dos produtos com tabela nutricional foram padronizados para refletir o nome completo do prato.
* Registros nutricionais sem produto correspondente foram removidos para evitar dados órfãos.
* Pratos sem dados nutricionais confiáveis permanecem sem link de informação nutricional até validação da tabela oficial.

---

## ⚙️ Configuração Local

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
