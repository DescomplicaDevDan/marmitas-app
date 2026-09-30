# Nutricomp — case técnico

## Visão em 60 segundos

Aplicação freelance de Front-end, desenvolvida individualmente com React e TypeScript, para explorar um catálogo, selecionar gramagens, montar combos, revisar o carrinho e preparar uma mensagem de pedido para atendimento pelo WhatsApp.

O objetivo é organizar a seleção antes do atendimento. Não há medição publicada de impacto comercial nem confirmação automática de pedidos.

## Fluxo e arquitetura

```text
Catálogo → produto → gramagem → preço → carrinho → checkout → mensagem → WhatsApp
                                      ↕
                                 LocalStorage
```

- `src/data/`: catálogo e informações nutricionais mantidos no código.
- `src/utils/tamanhos.ts`: opções de gramagem e preço.
- `src/contexts/CartContext.tsx`: estado compartilhado, quantidades, totais e persistência.
- `src/components/ComboModal.tsx`: seleção da composição do combo.
- `src/components/CheckoutForm.tsx`: dados de entrega e construção do link `wa.me`.

## Decisões e contrapartidas

**Context API:** catálogo, carrinho e checkout precisam acessar a mesma seleção. Evita repassar os dados por vários níveis; não há necessidade demonstrada de uma biblioteca adicional de estado.

**LocalStorage:** mantém o carrinho após recarregar no mesmo navegador, sem backend. Não sincroniza dispositivos nem é fonte confiável de preços. O atendimento precisa conferir os valores.

**Produto + gramagem:** um mesmo prato de 300g e 450g precisa ocupar posições distintas. Avulsas iguais incrementam quantidade; combos recebem um identificador com timestamp e preservam suas escolhas separadamente.

**Totais derivados:** quantidade e preço são somados a partir do carrinho, evitando manter um segundo estado para o total.

**Carregamento sob demanda:** checkout e montador de combos utilizam `lazy` e `Suspense`. Isso separa código de fluxos que só são usados após uma interação.

## Regras de negócio verificáveis

1. Não adicionar marmita sem selecionar gramagem.
2. Manter tamanhos distintos separados e usar o preço correspondente.
3. Exigir a quantidade completa de escolhas para finalizar um combo.
4. Recalcular total ao alterar quantidade e remover o item ao diminuir sua última unidade.
5. Restaurar seleção e composição após recarregar.
6. Exigir dados obrigatórios antes de gerar a mensagem.

## Um problema real no celular

**Problema:** o primeiro clique de quantidade no carrinho podia ser perdido.

**Reprodução:** adicionar um prato e tentar aumentar sua quantidade no carrinho em largura móvel.

**Causa:** o `mousedown` de um cartão removia a seleção e mudava o layout antes da conclusão do clique.

**Correção registrada:** mover a limpeza de seleção para `click`.

**Regressão:** o cenário “altera quantidade, recalcula total e remove item”, em `tests/pedido.spec.ts`, verifica o comportamento em desktop e celular simulado. O registro histórico da correção está em [VALIDACAO.md](VALIDACAO.md).

## Testes, responsividade e acessibilidade

Playwright verifica seleção, combos, persistência, quantidades, formulário, mensagem e ausência de transbordamento horizontal em 1440 × 900 e 390 × 844. O teste intercepta a abertura do WhatsApp e usa dados fictícios: não envia pedidos.

Controles possuem nomes acessíveis em cenários cobertos. Isso não demonstra conformidade completa de acessibilidade: navegação por teclado, foco dos modais, leitores de tela e aparelhos físicos ainda precisam de avaliação específica.

O CI executa instalação pelo lockfile, TypeScript, verificações de qualidade, build e Playwright. O resultado de uma execução deve ser consultado no Actions; configurar o workflow não comprova que ele já passou remotamente.

## Limitações e próximos passos

- Não há backend, estoque em tempo real, pagamento ou API do WhatsApp.
- A tentativa de abrir o WhatsApp limpa o carrinho sem comprovar envio; revisar esse comportamento e bloqueio de pop-up é uma melhoria pendente.
- A validação de CPF, telefone e CEP não comprova autenticidade.
- Dados persistidos e preços no navegador não podem autorizar cobranças.
- Combos usam timestamp como identificador; uma evolução pode adotar identificadores resistentes a colisões.
- Com backend, validação de preço, estoque e criação de pedido devem acontecer no servidor.
- Um catálogo de 10 mil itens exigiria avaliar paginação, busca e carregamento de dados; não foi testada essa escala.

## Demonstração

[Aplicação](https://www.nutricomp.com.br/) · [Código](https://github.com/DescomplicaDevDan/marmitas-app) · [Validação histórica](VALIDACAO.md)
