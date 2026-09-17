# Validação — 17/09/2026

## Resultado

- `npm run quality`: passou.
- `npm run build`: passou.
- `npm run test:e2e`: **12 testes passaram**, seis cenários em duas dimensões de tela.
- Ambiente: Chromium do Playwright, execução local; desktop 1440 × 900 e celular simulado 390 × 844.

| Cenário | Desktop | Celular simulado |
| --- | --- | --- |
| Combo exige quantidade completa e gramagem; composição persiste | Passou | Passou |
| Avulsa exige gramagem; tamanhos separados; persistência após recarregar | Passou | Passou |
| Aumentar, diminuir, recalcular total e remover | Passou | Passou |
| Formulário vazio bloqueado; mensagem gerada com itens, entrega e pagamento | Passou | Passou |
| Recuperação de carrinho com JSON inválido e pesquisa sem resultados | Passou | Passou |
| Catálogo e checkout sem transbordamento horizontal | Passou | Passou |

O teste de mensagem intercepta `window.open` e usa dados fictícios. Nenhuma mensagem é enviada ao WhatsApp.

## Correção encontrada pelos testes

No celular, o primeiro clique para aumentar a quantidade no carrinho podia ser perdido: o evento `mousedown` de um cartão removia sua seleção e alterava o layout antes da conclusão do clique. A limpeza de seleção passou a ocorrer em `click`, após a ação. O teste reproduziu a falha antes da correção e passou depois.

## Evidências visuais

- [Catálogo em desktop](evidencias/desktop-catalogo.png)
- [Checkout em desktop](evidencias/desktop-checkout.png)
- [Catálogo em celular](evidencias/mobile-catalogo.png)
- [Checkout em celular](evidencias/mobile-checkout.png)

As imagens foram geradas durante os testes locais. No desktop, o carrinho/checkout tem rolagem interna. No celular, o catálogo usa uma coluna; alguns textos e controles são pequenos e merecem avaliação adicional em aparelhos físicos.

## Limites e próximos cuidados

- Não foram verificados Safari, Firefox, dispositivos físicos nem conformidade completa de acessibilidade.
- Não foram medidos resultados comerciais, desempenho em rede lenta ou cobertura percentual de testes.
- A tentativa de abrir o WhatsApp limpa o carrinho sem comprovar envio; o bloqueio de pop-up ainda precisa de tratamento específico.
- O teste de formulário confirma campos obrigatórios, não validação real de CPF, CEP ou telefone.
- A instalação informou 10 alertas em dependências (2 baixos, 3 moderados e 5 altos). A atualização dessas dependências precisa de revisão própria; o resultado dos testes não equivale a uma auditoria de segurança.

## Reproduzir

Siga a instalação do README e execute:

```bash
npx playwright install chromium
npm run test:e2e
```

O servidor de testes inicia automaticamente. As capturas ficam em `docs/evidencias/`; traces de falhas ficam em `test-results/` e não são versionados.
