# Nutricomp — Cardápio digital e preparação de pedidos

Aplicação freelance de front-end para consultar marmitas, montar combos e preparar um pedido para envio pelo WhatsApp.

[Ver aplicação](https://www.nutricomp.com.br/) · [Cenários de teste e evidências](docs/VALIDACAO.md)

## Problema e escopo

O projeto organiza a seleção de produtos e aplica regras de gramagem, quantidade e preço antes do atendimento pelo WhatsApp. O cliente monta o pedido na interface e recebe uma mensagem preenchida para enviar.

A aplicação não envia mensagens automaticamente, não usa a API do WhatsApp, não processa pagamentos e não confirma o pedido com a cozinha. O frete e a confirmação são combinados no atendimento. Não há medições publicadas de redução de tempo ou retrabalho.

## Funcionalidades

- Catálogo com categorias, pesquisa por produtos/ingredientes e informações nutricionais.
- Marmitas de 300g e 450g, com preços por tamanho e seleção obrigatória de gramagem.
- Montagem de combos com quantidade definida.
- Carrinho com alteração de quantidade, remoção e persistência no navegador.
- Checkout com dados de entrega, preferência de pagamento e geração da mensagem.

## Tecnologias e decisões

**React 18, TypeScript, Tailwind CSS e Vite.**

- **Context API:** compartilha o carrinho entre catálogo e checkout.
- **LocalStorage:** mantém a seleção no mesmo navegador; não sincroniza dispositivos.
- **Identificação por produto e gramagem:** mantém versões de 300g e 450g separadas.
- **Regras de preço em `src/utils/tamanhos.ts`:** concentram as opções de tamanho.
- **Carregamento sob demanda:** checkout e montador de combos usam `lazy` e `Suspense`.

| Local | Responsabilidade |
| --- | --- |
| `src/components/` | Catálogo, combos, carrinho e formulário |
| `src/contexts/CartContext.tsx` | Estado e persistência do carrinho |
| `src/data/` | Catálogo e informações nutricionais |
| `src/utils/tamanhos.ts` | Preços por tamanho |
| `tests/pedido.spec.ts` | Testes de comportamento no navegador |

## Executar localmente

Use Node.js 22 LTS e npm.

```bash
git clone https://github.com/DescomplicaDevDan/marmitas-app.git
cd marmitas-app
npm ci
```

Crie `.env.local` na raiz e configure o número de atendimento com país e DDD, apenas dígitos:

```env
VITE_WHATSAPP_NUMBER=5511XXXXXXXXX
```

Substitua o exemplo por um número válido. Essa variável é pública no front-end: não coloque senhas ou tokens nela.

```bash
npm run dev
```

Abra o endereço informado pelo Vite. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Verificações

```bash
npm run quality
npm run build
npx playwright install chromium
npm run test:e2e
```

`quality` verifica regras de preço e algumas condições no código-fonte; essas verificações estáticas não substituem os testes de comportamento. O build verifica a compilação e gera os arquivos de produção.

Os testes Playwright exercitam a interface em 1440 × 900 e 390 × 844. O WhatsApp é interceptado: nenhum pedido real é enviado. Consulte os cenários, resultados e limites em [VALIDACAO.md](docs/VALIDACAO.md).

## Limitações conhecidas

- O catálogo é mantido no código; não há painel administrativo, estoque em tempo real ou backend de pedidos.
- CPF, telefone e CEP têm normalização de dígitos e campos obrigatórios, mas não validação completa de autenticidade.
- Abrir o WhatsApp não confirma envio nem recebimento. Atualmente o carrinho é limpo após a tentativa de abertura, inclusive se o navegador bloquear a janela.
- Os testes de tela usam Chromium com dimensões simuladas; não equivalem a testes em aparelhos físicos, Safari ou Firefox.
- Dados no LocalStorage podem ser alterados pelo usuário; o pedido e os valores precisam ser conferidos no atendimento.

## Apoio no desenvolvimento

Ferramentas de IA foram utilizadas como apoio à pesquisa, prototipação, revisão e documentação. Os testes e as limitações estão descritos neste repositório para permitir a avaliação das entregas.

## Autor

[Danilo Texeira](https://github.com/DescomplicaDevDan) · [LinkedIn](https://www.linkedin.com/in/danilo-texeira-dev/)
