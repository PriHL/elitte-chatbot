// Simula logs em tempo real
function log(message) {
  const logBox = document.getElementById("logBox");
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  logBox.innerHTML += `[${timestamp}] ${message}\n`;
  logBox.scrollTop = logBox.scrollHeight;
}

// Simula rodar o bot
function startBot() {
  log("🟢 Iniciando automação...");
  runBot();
}

function stopBot() {
  log("🔴 Parando automação...");
}

// Simula função do bot.js
async function runBot() {
  for (let i = 0; i < 10; i++) {
    const username = ["@2m.scouting", "@scou.mmodels", "@virtual.choices", "@your.digitaltransition"][i % 4];

    log(`📦 Usando perfil: ${username}`);
    log(`🔍 Procurando contato...`);
    log(`📩 Mensagem enviada para @usuario_alvo_${i}`);

    const delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    await new Promise(r => setTimeout(r, delay));
  }

  log("🏁 Todos os perfis terminaram o envio.");
}