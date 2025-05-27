let isRunning = true;

// Simula carregamento do bot
function startBot() {
  log("🟢 Iniciando automação...");
  runBot();
}

function stopBot() {
  isRunning = false;
  log("🔴 Parando automação...");
}

function log(message) {
  const logBox = document.getElementById("logBox");
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  logBox.innerHTML += `[${timestamp}] ${message}\n`;
  logBox.scrollTop = logBox.scrollHeight;
}

// Roda todas as etapas nos 10 perfis
async function runBot() {
  for (let i = 0; i < profiles.length && isRunning; i++) {
    const profile = profiles[i];
    const grupo = profile.grupo.toLowerCase();

    log(`📦 Usando perfil: @${profile.username} → Grupo ${grupo.toUpperCase()}`);

    let browser, page;

    try {
      browser = await chromium.launch({ headless: false });
      page = await browser.newPage();

      await loginInstagram(page, profile);

      const contacts = await loadContactsFromSheet(grupo);

      for (let j = 0; j < contacts.length; j++) {
        const contact = contacts[j];

        if (!contact.Username || contact.Status === 'Enviado') continue;

        await sendMessageToContact(page, contact, profile);

        setTimeout(async () => {
          const replied = await checkIfContactReplied(page, contact);
          if (!replied) {
            log(`⏳ Nenhuma resposta de @${contact.Username}`);
          }
        }, 10000);

        const delayBetweenContacts = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        await new Promise(r => setTimeout(r, delayBetweenContacts));
      }

      await browser.close();

      const delayBetweenProfiles = Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000;
      log(`⏳ Pausa de ${delayBetweenProfiles / 1000}s antes do próximo perfil...`);
      await new Promise(r => setTimeout(r, delayBetweenProfiles));

    } catch (e) {
      log(`🚫 Erro com perfil @${profile.username}: ${e.message}`);
      if (browser && browser.isConnected()) await browser.close();
    }
  }

  log("🏁 Todos os perfis terminaram o envio.");
}