# 🍱 Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o Projeto:** 🚀 [nutricomp.com.br](https://nutricomp.com.br)

Sistema escalável de cardápio digital e automação de logística para marmitaria fitness. Focado em **UX de alta conversão**, **Clean Code** e separação de fluxos de produção.

---

## ⚡ Destaques de Engenharia

* **Logística Automatizada & Triagem de Cozinha:** Integração robusta via WhatsApp com payload segmentado e estruturado. O sistema separa automaticamente **Combos Montados** de **Marmitas Avulsas**, otimizando a esteira de produção da cozinha sem o uso de caracteres especiais ou emojis que quebram leitores de dados.
* **Sanitização com Regex:** Filtros em tempo real para CPF (11 dígitos limitados), CEP e Telefone, garantindo integridade total dos dados antes do envio.
* **Performance & UX:** Interface *Mobile-First*, persistência de estado do carrinho com *LocalStorage* (evitando perda de dados em reloads) e harmonia de grid com `items-stretch`.
* **Arquitetura Profissional:** Tipagem estrita com TypeScript, componentização limpa e gestão de estado global centralizada via Context API (`CartContext`).

---

## 🛠️ Stack Tecnológica

| Camada | Ferramentas |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Linguagem** | TypeScript (Strict Mode) |
| **Estado/Ícones** | Context API, Lucide React |
| **Infra/SEO** | HostGator, SSL, Google Search Console |

---

## 📋 Regras de Negócio & Diferenciais

* **Tabela de Preços Dinâmica:** Controle unificado de valores individuais (R$ 22,00) e pacotes promocionais progressivos diretamente no ecossistema de tipos.
* **Bônus Progressivo Acumulativo:** Algoritmo dinâmico que escaneia o carrinho e calcula automaticamente o direito a marmitas de brinde de acordo com o volume de combos selecionados (10, 20 ou 30 unidades), emitindo um alerta destacado de `ATENÇÃO COZINHA`.
* **Checkout Inteligente:** Coleta de dados fiscais (CPF), validação de máscara de endereço com foco na cidade de São Paulo e suporte a observações personalizadas que preservam a caixa do texto digitado pelo usuário.
* **Design de Interface:** Sticky Footer para conversão no mobile, travas de altura mínima contra quebras de layout e design responsivo avançado.

---

## ⚙️ Configuração Local

1. Clone o repositório.
2. Crie um arquivo `.env` na raiz do projeto.
3. Insira a seguinte variável de ambiente:
```env
VITE_WHATSAPP_NUMBER=5511XXXXXXXXX # (DDI + DDD + número de destino sem espaços ou traços)