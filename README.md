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

## Checkout Inteligente

Coleta estruturada de:

* Dados pessoais;
* Endereço;
* Informações de entrega;
* Forma de pagamento;
* Observações personalizadas.

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

* Overlay responsivo;
* Scroll interno;
* Adaptação para desktop e mobile;
* Exibição completa dos dados nutricionais.

---

# Organização dos Componentes

| Componente        | Responsabilidade                            |
| ----------------- | ------------------------------------------- |
| MarmitaCard       | Exibição dos produtos e interação principal |
| TabelaNutricional | Apresentação dos dados nutricionais         |
| ComboModal        | Montagem e gerenciamento de combos          |
| CategoryFilter    | Navegação por categorias                    |
| Cart              | Gerenciamento do carrinho                   |
| CheckoutForm      | Processo de checkout                        |
| CartContext       | Estado global da aplicação                  |

---

# Qualidade de Dados

* Padronização dos nomes dos produtos.
* Remoção de registros órfãos.
* Validação manual de informações nutricionais.
* Controle de consistência entre catálogo e dados nutricionais.

---

# Configuração Local

## Clone o repositório

```bash
git clone <url-do-repositorio>
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

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

---

# Autor

Danilo Texeira

Desenvolvedor Front-End focado em React, TypeScript, experiência do usuário, automação de processos e Inteligência Artificial aplicada ao desenvolvimento de software.
