# 🥗 MarmitaCard - Nutricomp

Sistema de pedido de marmitas fitness desenvolvido com **React**, **TypeScript** e **Tailwind CSS**.

## 🚀 Novas Funcionalidades

- **Integração Direta com WhatsApp**: Envio automático do pedido formatado, detalhando itens, combos e escolhas do cliente.
- **Validação de Entrada (UX)**: 
  - Campos de Telefone, CEP e Número aceitam apenas dígitos numéricos.
  - Limitação de caracteres para evitar erros de digitação (Telefone: 11 dígitos, CEP: 8 dígitos).
- **Checkout Inteligente**: Resumo de valores e campo para observações adicionais.

## 🛠️ Tecnologias
- React + Vite
- TypeScript
- Tailwind CSS
- Context API (Cart Management)

## 📋 Como o Pedido Chega no WhatsApp
O pedido é enviado de forma organizada para facilitar o cálculo do frete pelo administrador:
- Detalhes do cliente e contato.
- Lista de itens e composições de combos.
- Endereço de entrega completo para cálculo de frete manual.