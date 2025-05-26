// Dados dos perfis (você pode carregar via API depois)
const profiles = [
  { id: 1, username: "2m.scouting", grupo: "A" },
  { id: 2, username: "scou.mmodels", grupo: "A" },
  { id: 3, username: "scouteronline21", grupo: "A" },
  { id: 4, username: "virtual.scoutt", grupo: "A" },
  { id: 5, username: "on.scouter", grupo: "A" },
  { id: 6, username: "profissional.scout", grupo: "A" },
  { id: 7, username: "mood.profissional", grupo: "A" },
  { id: 8, username: "profissional.dm", grupo: "A" },
  { id: 9, username: "virtual.choices", grupo: "B" },
  { id: 10, username: "your.digitaltransition", grupo: "C" }
];

// Contatos segmentados por tipo
const contacts = {
  A: [
    { name: "ana_lopes", tipo: "pessoa_fisica", status: "Não enviado" },
    { name: "carlos_moraes", tipo: "pessoa_fisica", status: "Enviado" },
    { name: "mariana_santos", tipo: "pessoa_fisica", status: "Não enviado" },
    { name: "jessica_df", tipo: "pessoa_fisica", status: "Não enviado" }
  ],
  B: [
    { name: "moda_estilo_df", tipo: "influencer", status: "Enviado" },
    { name: "fotos_profissional", tipo: "influencer", status: "Não enviado" },
    { name: "beleza_carioca", tipo: "influencer", status: "Não enviado" },
    { name: "fitness_life_df", tipo: "influencer", status: "Enviado" }
  ],
  C: [
    { name: "dr_carlos_medico", tipo: "medico", status: "Não enviado" },
    { name: "studio_flor_do_cerrado", tipo: "atelie", status: "Não enviado" },
    { name: "clinic_centro_df", tipo: "clinica_medica", status: "Enviado" },
    { name: "rejuvenescer_clinica", tipo: "clinica_medica", status: "Não enviado" },
    { name: "beleza_norte_shopping", tipo: "salao_beauty", status: "Enviado" },
    { name: "cabelo_e_estilo", tipo: "salao_beauty", status: "Não enviado" },
    { name: "adv_tatiana_direito", tipo: "advogado", status: "Não enviado" },
    { name: "foto_andre_df", tipo: "fotografo", status: "Enviado" }
  ]
};

// Preenche seleção de perfis
const profileSelector = document.getElementById("profileSelector");
const contactListDiv = document.getElementById("contactList");
const selectedGroupLabel = document.getElementById("selectedGroupLabel");

profiles.forEach(profile => {
  const option = document.createElement("option");
  option.value = profile.id;
  option.textContent = `${profile.username} (Grupo ${profile.grupo})`;
  profileSelector.appendChild(option);
});

// Mostra contatos ao selecionar perfil
profileSelector.onchange = () => {
  const selectedProfile = profiles.find(p => p.id == profileSelector.value);

  if (!selectedProfile) return;

  selectedGroupLabel.textContent = selectedProfile.grupo.toUpperCase();
  contactListDiv.innerHTML = `<h3>Contatos - @${selectedProfile.username}</h3>`;

  const grupo = selectedProfile.grupo;
  const filteredContacts = contacts[grupo] || [];

  if (filteredContacts.length === 0) {
    contactListDiv.innerHTML += "<p>Nenhum contato disponível.</p>";
    return;
  }

  filteredContacts.forEach(contact => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const currentStatus = contact.status || "Não enviado";
    const statusClass = contact.status === "Enviado"
      ? "enviado"
      : contact.status === "Respondido"
        ? "respondido"
        : "nao_enviado";

    card.innerHTML = `
      <strong>@${contact.name}</strong><br/>
      Tipo: ${contact.tipo}<br/>
      Status: <span class="status ${statusClass}">${currentStatus}</span><br/>
      Última Etapa: ${contact.lastMessage || 'Nenhuma'}
    `;

    contactListDiv.appendChild(card);
  });
};

// Função pra adicionar log na interface
function addLog(message) {
  const logBox = document.getElementById("statusLog");
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  logBox.innerHTML += `[${timestamp}] ${message}\n`;
  logBox.scrollTop = logBox.scrollHeight;
}

// Simula início da automação
document.getElementById("startBotBtn").onclick = () => {
  addLog("🟢 Iniciando robô...");
  simulateBotStart();
};

// Simula parada da automação
document.getElementById("stopBotBtn").onclick = () => {
  addLog("🔴 Parando robô...");
};

// Simulação de início do bot
function simulateBotStart() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= profiles.length) {
      clearInterval(interval);
      addLog("🏁 Todos os perfis terminaram o envio.");
      return;
    }

    const profile = profiles[i];
    addLog(`📦 Usando perfil: @${profile.username} → Grupo ${profile.grupo}`);
    i++;
  }, 3000); // simula o envio a cada 3 segundos
}

