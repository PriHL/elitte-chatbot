const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Acessa o Instagram
  await page.goto('https://instagram.com ', { waitUntil: 'networkidle' });

  // Faz login manualmente
  console.log("✋ Pausa: faça login manualmente e pressione Enter no terminal");
  await new Promise(r => process.stdin.on('data', r));

  // Vai para nova mensagem
  await page.goto('https://www.instagram.com/direct/new/ ');
  await page.waitForTimeout(5000);

  // Digita o nome do contato-alvo
  const targetUsername = "pri_horita"; // <- Troque isso
  console.log(`🔍 Procurando perfil: @${targetUsername}`);

  try {
    // Aguarda o campo de pesquisa aparecer
    await page.waitForSelector('input[placeholder="Telefone, nome de usuário ou e-mail"]', { timeout: 20000 });
    await page.type('input[placeholder="Telefone, nome de usuário ou e-mail"]', targetUsername);
    console.log("✅ Pesquisando com placeholder correto!");
  } catch (e) {
    console.log("❌ Campo com placeholder não encontrado.");
    console.log("🔁 Tentando com classes CSS...");

    try {
      await page.waitForSelector('input.x1i10hfl.xggy1nq.x1s68kgs', { timeout: 20000 });
      await page.type('input.x1i10hfl.xggy1nq.x1s68kgs', targetUsername);
      console.log("✅ Pesquisa feita com classes CSS!");
    } catch (e) {
      console.log("❌ Não foi possível encontrar o campo de pesquisa.");
      await browser.close();
      return;
    }
  }

  await page.waitForTimeout(2000);

  // Clica no primeiro resultado da pesquisa
  try {
    await page.click('div[role="option"]', { timeout: 10000 });
    console.log("✅ Perfil selecionado!");
  } catch (e) {
    console.log("❌ Não encontrou nenhum perfil.");
    await browser.close();
    return;
  }

  // Clica em "Conversar"
  try {
    await page.click('button:has-text("Conversar")', { timeout: 10000 });
    console.log("✅ Botão 'Conversar' clicado!");
  } catch (e) {
    try {
      await page.click('button:has-text("Mensagens")', { timeout: 10000 });
      console.log("✅ Botão 'Mensagens' clicado!");
    } catch (e) {
      console.log("❌ Nenhum botão de iniciar conversa encontrado.");
      await browser.close();
      return;
    }
  }

  // Escreve e envia a mensagem
  try {
    await page.fill('textarea', 'Ei! Tudo bem? Vi seu perfil e achei muito massa!');
    await page.click('button[type=submit]');
    console.log("✅ Mensagem enviada!");
  } catch (e) {
    console.log("❌ Campo de texto não encontrado.");
  }

  await page.waitForTimeout(3000);
  await browser.close();
})();