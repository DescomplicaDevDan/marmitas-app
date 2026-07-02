# Nutricomp - Sistema de Gestão de Pedidos

> **Acesse o projeto:** https://www.nutricomp.com.br

Sistema web de cardápio digital e gestão de pedidos desenvolvido para uma empresa do segmento de suplementação alimentar.

O projeto substitui um processo comercial realizado manualmente via WhatsApp por um fluxo digital automatizado, reduzindo retrabalho operacional, padronizando regras de negócio e proporcionando uma experiência de compra simples, rápida e responsiva.

---

# Problema

Antes da aplicação, todo o processo de vendas era realizado manualmente pelo WhatsApp, exigindo:

- Conferência manual dos produtos;
- Aplicação manual de promoções;
- Organização individual dos pedidos;
- Comunicação repetitiva entre atendimento e cozinha;
- Controle operacional descentralizado.

Esse cenário gerava:

- Retrabalho operacional;
- Maior tempo de atendimento;
- Risco de inconsistências nos pedidos;
- Dificuldade para escalar as vendas;
- Dependência de processos manuais;
- Gargalos entre atendimento e produção.

---

# Solução

Foi desenvolvida uma aplicação utilizando **React**, **TypeScript** e **Tailwind CSS** para automatizar todo o fluxo comercial.

A plataforma oferece:

- Cardápio digital responsivo;
- Montagem de combos personalizados;
- Seleção obrigatória de gramagem;
- Carrinho persistente via LocalStorage;
- Checkout estruturado;
- Integração com WhatsApp;
- Aplicação automática das regras comerciais;
- Busca inteligente de produtos;
- Consulta de informações nutricionais;
- Organização automática dos pedidos para produção.

---

# Resultados

- Redução significativa do tempo de processamento dos pedidos;
- Eliminação de gargalos operacionais;
- Padronização do fluxo comercial;
- Melhor experiência para clientes e operadores;
- Processo preparado para crescimento e escalabilidade;
- Redução da dependência de controles manuais.

---

# Inteligência Artificial no Desenvolvimento

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento para:

- Pesquisa técnica;
- Validação de abordagens arquiteturais;
- Revisão de código;
- Documentação técnica;
- Prototipação de funcionalidades;
- Aceleração do desenvolvimento.

A IA foi utilizada exclusivamente como ferramenta de produtividade e apoio técnico. Todas as decisões de arquitetura, implementação, validação e regras de negócio foram definidas pelo desenvolvedor.

---

# Destaques de Engenharia

## Logística Automatizada

A integração com o WhatsApp gera um payload estruturado contendo:

- Combos;
- Marmitas avulsas;
- Gramagem;
- Quantidades;
- Observações do cliente.

Isso permite que a cozinha receba pedidos organizados e prontos para produção.

---

## Arquitetura

- React 18
- TypeScript (Strict Mode)
- Context API
- Componentização reutilizável
- Organização modular
- Separação de responsabilidades
- Contratos tipados

---

## Performance e UX

- Interface Mobile First;
- Layout responsivo;
- Persistência do carrinho com LocalStorage;
- Busca instantânea;
- Lazy Loading;
- Suspense;
- Feedback visual não intrusivo;
- Carregamento otimizado das imagens.

---

## Integridade dos Dados

Validações utilizando Regex para:

- CPF;
- CEP;
- Telefone.

As informações nutricionais são vinculadas através do identificador canônico dos produtos, evitando inconsistências.

---

## Design System

Biblioteca de componentes reutilizáveis para:

- Cards;
- Botões;
- Inputs;
- Navegação;
- Estados vazios;
- Componentes de checkout.

---

# Funcionalidades

- Catálogo digital responsivo;
- Categorias de produtos;
- Busca por nome, descrição, ingredientes e categoria;
- Normalização de acentos na pesquisa;
- Seleção obrigatória de gramagem;
- Carrinho persistente;
- Checkout completo;
- Integração com WhatsApp;
- Informações nutricionais contextuais;
- Organização automática dos pedidos.

---

# Regras de Negócio

## Precificação

Sistema centralizado responsável por controlar:

- Valores por gramagem;
- Valores promocionais;
- Consistência dos preços através de contratos TypeScript.

---

## Checkout Inteligente

Coleta estruturada de:

- Dados pessoais;
- Endereço;
- Forma de pagamento;
- Observações do cliente.

---

## Informações Nutricionais

A consulta nutricional funciona através de overlay responsivo com:

- Scroll interno;
- Adaptação para desktop e mobile;
- Exibição completa das informações nutricionais.

---

# Valor Entregue

## Para o cliente

- Processo de compra mais rápido;
- Melhor experiência em dispositivos móveis;
- Interface intuitiva;
- Consulta nutricional integrada.

## Para a operação

- Redução do retrabalho;
- Pedidos padronizados;
- Organização automática da produção;
- Menor incidência de erros operacionais.

## Para manutenção

- Código modular;
- Componentização reutilizável;
- Contratos TypeScript;
- Organização previsível do projeto.

---

# Organização dos Componentes

| Componente | Responsabilidade |
|------------|------------------|
| `MarmitaCard` | Renderização dos produtos |
| `ComboModal` | Montagem dos combos |
| `CategoryFilter` | Navegação por categorias |
| `Cart` | Gerenciamento do carrinho |
| `CheckoutForm` | Processo de checkout |
| `TabelaNutricional` | Exibição das informações nutricionais |
| `CartContext` | Estado global da aplicação |

---

# Stack Tecnológica

| Camada | Tecnologias |
|---------|-------------|
| Front-end | React 18 + Vite |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Estado | Context API |
| Persistência | LocalStorage |
| Infraestrutura | HostGator + SSL |
| SEO | Google Search Console |
| Versionamento | Git + GitHub |

---

# Qualidade

O projeto possui validações para garantir:

- Tipagem TypeScript;
- Regras de precificação;
- Seleção obrigatória de gramagem;
- Consistência do carrinho;
- Build de produção.

```bash
npm run quality
npm run typecheck
npm run build
```

---

# Configuração Local

## Clone o projeto

```bash
git clone <url-do-repositorio>
```

## Variáveis de ambiente

```env
VITE_WHATSAPP_NUMBER=5511XXXXXXXXX
```

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

---

# Autor

**Danilo Texeira**

Desenvolvedor Front-End com foco em React, TypeScript, arquitetura de aplicações, experiência do usuário, automação de processos e Inteligência Artificial aplicada ao desenvolvimento de software.