# 🍱 Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o Projeto:** 🚀 [nutricomp.com.br](https://nutricomp.com.br)

Sistema escalável de cardápio digital e automação de logística para marmitaria fitness. Focado em **UX de alta conversão** e **Clean Code**.

---

## ⚡ Destaques de Engenharia

* **Logística Automatizada:** Integração via WhatsApp com payload formatado para produção (Itens, Combos e Brindes Acumulativos).
* **Sanitização com Regex:** Filtros em tempo real para CPF (11 dígitos), CEP e Telefone, garantindo integridade total dos dados.
* **Performance & UX:** Interface *Mobile-First*, persistência com *LocalStorage* e harmonia de grid com `items-stretch`.
* **Arquitetura Profissional:** Tipagem estrita com TypeScript e gestão de estado via Context API.

---

## 🛠️ Stack Tecnológica

| Camada | Ferramentas |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Linguagem** | TypeScript (Strict Mode) |
| **Estado/Ícones** | Context API, Lucide React |
| **Infra/SEO** | HostGator, SSL, Google Search Console |

---

## 📋 Diferenciais do Produto

* **Checkout Inteligente:** Coleta de dados fiscais (CPF) e observações personalizadas.
* **Bônus Promocional:** Cálculo automático de marmitas grátis por volume de combos.
* **Privacidade:** Omissão estratégica de dados sensíveis no payload da mensagem.
* **Design de Interface:** Sticky Footer, travas de altura mínima e design responsivo avançado.

---

## ⚙️ Configuração Local

1. Clone o repositório.
2. Crie um arquivo `.env` na raiz:
```env
3. Insira: VITE_WHATSAPP_NUMBER=(DDI+DDD+somente número).
