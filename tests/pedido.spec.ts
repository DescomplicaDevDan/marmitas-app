import { test, expect, type Page } from '@playwright/test';

const cart = (page: Page) => page.locator('#carrinho-secao');
async function addMeal(page: Page, size = '300g') {
  await page.getByPlaceholder('Buscar por prato ou ingrediente').fill('Macarrão com almôndega de carne');
  await page.getByRole('button', { name: size, exact: true }).click();
  await page.getByRole('button', { name: 'Aumentar quantidade', exact: true }).first().click();
}

test.beforeEach(async ({ page }) => { await page.goto('/'); });

test('combo exige quantidade completa e gramagem', async ({ page }) => {
  await page.getByRole('button', { name: /Montar/ }).first().click();
  const modal = page.locator('div.fixed').filter({ has: page.getByRole('button', { name: 'Fechar', exact: true }) });
  await expect(modal.getByRole('button', { name: 'Escolha 300g ou 450g' })).toBeDisabled();
  const progress = await modal.getByText(/0 de \d+ selecionadas/).textContent();
  const goal = Number(progress!.match(/de (\d+)/)![1]);
  for (let i = 0; i < goal; i++) await modal.getByRole('button', { name: 'Aumentar quantidade' }).first().click();
  await expect(modal.getByRole('button', { name: 'Escolha 300g ou 450g' })).toBeDisabled();
  await modal.getByRole('button', { name: /^450g/ }).click();
  await modal.getByRole('button', { name: 'Finalizar Seleção' }).click();
  await expect(cart(page)).toContainText('450g');
  await expect(cart(page)).toContainText('Composição:');
  await page.reload();
  await expect(cart(page)).toContainText('Composição:');
});

test('exige gramagem, separa tamanhos e persiste após recarregar', async ({ page }) => {
  await page.getByPlaceholder('Buscar por prato ou ingrediente').fill('Macarrão com almôndega de carne');
  await page.getByRole('button', { name: 'Aumentar quantidade' }).first().click();
  await expect(page.getByText('Escolha 300g ou 450g antes de adicionar')).toBeVisible();
  await expect(cart(page).getByRole('button', { name: 'Remover item' })).toHaveCount(0);
  await addMeal(page);
  await addMeal(page, '450g');
  await expect(cart(page).getByRole('button', { name: 'Remover item' })).toHaveCount(2);
  await expect(cart(page)).toContainText('48,90');
  await page.reload();
  await expect(cart(page).getByRole('button', { name: 'Remover item' })).toHaveCount(2);
  await expect(cart(page)).toContainText('300g');
  await expect(cart(page)).toContainText('450g');
  await expect(cart(page)).toContainText('48,90');
});

test('altera quantidade, recalcula total e remove item', async ({ page }) => {
  await addMeal(page);
  await cart(page).getByRole('button', { name: 'Aumentar quantidade' }).click();
  await expect(cart(page)).toContainText('44,00');
  await cart(page).getByRole('button', { name: 'Diminuir quantidade' }).click();
  await expect(cart(page)).toContainText('22,00');
  await cart(page).getByRole('button', { name: 'Remover item' }).click();
  await expect(cart(page).getByRole('button', { name: 'Remover item' })).toHaveCount(0);
  await page.reload();
  await expect(cart(page).getByRole('button', { name: 'Remover item' })).toHaveCount(0);
});

test('gera mensagem sem enviar pedido real e bloqueia formulário vazio', async ({ page }) => {
  await page.evaluate(() => {
    (window as any).openedUrl = null;
    window.open = ((url: string) => { (window as any).openedUrl = url; return null; }) as any;
  });
  await addMeal(page, '450g');
  await page.getByRole('button', { name: 'Finalizar Pedido via WhatsApp' }).click();
  await page.getByRole('button', { name: 'Enviar pedido', exact: true }).click();
  expect(await page.evaluate(() => (window as any).openedUrl)).toBeNull();
  for (const [name, value] of Object.entries({
    'Nome completo': 'Cliente de teste', CPF: '00000000000', WhatsApp: '11000000000',
    'Endereço': 'Rua de teste', 'Nº': '123', CEP: '00000000', Bairro: 'Bairro de teste', Cidade: 'São Paulo',
  })) await page.getByPlaceholder(name, { exact: true }).fill(value);
  await page.getByPlaceholder('Observações do pedido').fill('Teste & conferência');
  await page.getByRole('button', { name: 'Enviar pedido', exact: true }).click();
  const url = new URL(await page.evaluate(() => (window as any).openedUrl));
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/5500000000000');
  const message = url.searchParams.get('text')!;
  for (const value of ['Cliente de teste', '450g', '26.90', 'Rua de teste', 'PIX', 'Teste & conferência']) expect(message).toContain(value);
});

test('busca vazia e carrinho corrompido têm recuperação', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('@Nutricomp:cart', '{inválido'));
  await page.reload();
  await page.getByPlaceholder('Buscar por prato ou ingrediente').fill('produto-inexistente-xyz');
  await expect(page.getByText('Nenhum prato encontrado')).toBeVisible();
  await page.getByRole('button', { name: 'Ver todos', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Macarrão com almôndega de carne', exact: true })).toBeVisible();
});

test('catálogo e checkout cabem na largura da tela', async ({ page }, testInfo) => {
  await expect(page.getByPlaceholder('Buscar por prato ou ingrediente')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `docs/evidencias/${testInfo.project.name}-catalogo.png`, fullPage: true });
  await addMeal(page);
  await page.getByRole('button', { name: 'Finalizar Pedido via WhatsApp' }).click();
  await expect(page.getByPlaceholder('Nome completo')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Enviar pedido', exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `docs/evidencias/${testInfo.project.name}-checkout.png` });
});
