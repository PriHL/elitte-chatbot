const audio = new Audio('./notification.wav');

function notifyUser(contactUsername) {
  console.log(`🔔 @${contactUsername} respondeu! É hora de interagir.`);
  audio.play().catch(err => console.error("🔊 Erro ao tocar som:", err));
}

async function loadHistoryFromSheet() {
  try {
    const response = await fetch(SHEET_URLS.historySheetUrl);
    const text = await response.text();
    const lines = text.split('\n').slice(1); // ignora cabeçalho

    lines.forEach(line => {
      const [date, time, profile, contact, status, message] = line.split(',');

      const foundProfile = profiles.find(p => p.username === profile);
      if (foundProfile && contact) {
        foundProfile.status = "respondido";
        foundProfile.lastReplied = contact;
      }
    });

    updateDashboard();

  } catch (error) {
    console.error("❌ Erro ao carregar histórico:", error.message);
  }
}

// Atualiza a cada 10 segundos
setInterval(loadHistoryFromSheet, 10000);
loadHistoryFromSheet();