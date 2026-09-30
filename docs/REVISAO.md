# Revisão de qualidade — 30/09/2026

- TypeScript (`tsc -b`) e verificações de qualidade: passaram.
- Build de produção: passou com `npm run build -- --configLoader runner`.
- Playwright: 12 testes passaram (seis cenários em desktop e celular simulado), sobre o build servido por `vite preview`.
- `npm audit`: zero vulnerabilidades reportadas após atualizar dependências, incluindo Vite 7.3.6 e plugin React 5.2.
- CI: substituído o template por instalação via lockfile, qualidade, build e testes em Chromium. Execução remota ainda não verificada.

## Ambiente e reprodução

Validação local no Windows com Node.js 26.4.0. O CI está configurado para Node.js 22; use 22.12 ou superior. A atualização para Vite 7 altera o alvo padrão para navegadores modernos; não foi verificada compatibilidade com navegadores antigos.

Neste sandbox, o carregador padrão da configuração do Vite falha ao ler diretórios ancestrais. A opção oficial `--configLoader runner` permitiu compilar. Para testar o resultado sem depender do servidor de desenvolvimento:

```powershell
$env:VITE_WHATSAPP_NUMBER='5500000000000'
npm run build -- --configLoader runner
npm run preview -- --configLoader runner --host 127.0.0.1 --port 4173
# Em outro terminal:
npm run test:e2e
```

Esse número é fictício e usado apenas para testes; configure o contato real para publicação. O teste intercepta `window.open` e não envia mensagens.

O carregador padrão e o ambiente Node.js 22 do CI ainda devem ser verificados no GitHub Actions. O registro de 17/09 em VALIDACAO.md foi preservado como evidência histórica.

## Referências da migração

- [Vite 5 para 6](https://v6.vite.dev/guide/migration)
- [Vite 6 para 7](https://v7.vite.dev/guide/migration)

## Pendências funcionais mantidas explícitas

Tratamento de bloqueio de pop-up e confirmação antes de limpar o carrinho; avaliação manual de acessibilidade e aparelhos físicos; validação completa de dados e preços no atendimento ou futuro backend.
