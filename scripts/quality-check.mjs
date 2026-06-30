import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import ts from 'typescript';

const root = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function loadTamanhosModule() {
  const source = await readFile(join(root, 'src/utils/tamanhos.ts'), 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`;
  return import(moduleUrl);
}

const { getOpcoesTamanho } = await loadTamanhosModule();

const marmitaAvulsa = {
  id: '1',
  nome: 'Marmita teste',
  preco: 22,
  imagem: '/combo-marmitas.webp',
  categoria: 'Carne',
};

assert(getOpcoesTamanho(marmitaAvulsa).find((opcao) => opcao.tamanho === '300g')?.preco === 22, 'Avulsa 300g deve manter o preco base.');
assert(getOpcoesTamanho(marmitaAvulsa).find((opcao) => opcao.tamanho === '450g')?.preco === 26.9, 'Avulsa 450g deve custar R$ 26,90.');

const combos = [
  { nome: 'Combo 10 unidades', precoBase: 194, preco450g: 220 },
  { nome: 'Combo 20 unidades', precoBase: 329, preco450g: 380 },
  { nome: 'Combo 30 unidades', precoBase: 449, preco450g: 510 },
];

for (const combo of combos) {
  const opcoes = getOpcoesTamanho({
    id: combo.nome,
    nome: combo.nome,
    preco: combo.precoBase,
    imagem: '/combo-marmitas.webp',
    categoria: 'Combo',
  });

  assert(opcoes.find((opcao) => opcao.tamanho === '300g')?.preco === combo.precoBase, `${combo.nome} 300g deve manter o preco base.`);
  assert(opcoes.find((opcao) => opcao.tamanho === '450g')?.preco === combo.preco450g, `${combo.nome} 450g deve ter preco especifico.`);
}

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
assert(Object.keys(packageJson.dependencies ?? {}).length <= 3, 'Mudanca nao deve adicionar dependencia de producao desnecessaria.');

const cardapio = await readFile(join(root, 'src/pages/Cardapio.tsx'), 'utf8');
assert(cardapio.includes('lazy(() =>'), 'Checkout e combo devem permanecer com lazy loading.');

const cartContext = await readFile(join(root, 'src/contexts/CartContext.tsx'), 'utf8');
assert(cartContext.includes('if (!tamanho)'), 'Carrinho deve recusar itens sem gramagem.');
assert(cartContext.includes('`${marmita.id}-${tamanho}`'), 'Itens avulsos devem ser separados por gramagem no carrinho.');

console.log('Quality checks passed.');
