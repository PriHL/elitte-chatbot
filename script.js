// Dados dos seus perfis
const profiles = [
  { id: 1, username: "2m.scouting", grupo: "A", tipo: "pessoa_fisica" },
  { id: 2, username: "scou.mmodels", grupo: "A", tipo: "pessoa_fisica" },
  { id: 3, username: "scouteronline21", grupo: "A", tipo: "pessoa_fisica" },
  { id: 4, username: "virtual.scoutt", grupo: "A", tipo: "pessoa_fisica" },
  { id: 5, username: "on.scouter", grupo: "A", tipo: "pessoa_fisica" },
  { id: 6, username: "profissional.scout", grupo: "A", tipo: "pessoa_fisica" },
  { id: 7, username: "mood.profissional", grupo: "A", tipo: "pessoa_fisica" },
  { id: 8, username: "profissional.dm", grupo: "A", tipo: "pessoa_fisica" },
  { id: 9, username: "virtual.choices", grupo: "B", tipo: "influencer" },
  { id: 10, username: "your.digitaltransition", grupo: "C", tipo: "outros_clientes" }
];

// URLs das planilhas publicadas como CSV
const SHEET_URLS = {
  groupA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj8LIFK3j19XrJMgq56HYahkCYP5eZk_P-JD5tNfj9G_UmUkylqmCopvwko4NfKQ9YzfF9SykNEsWw/pub?output=csv',
  groupB: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnHTiggKHA64vES0rXQ7I-6imiVH4CBoBXlK73KeqMadODhffZbSfarp82Qsa9p7XLpiuiXIe-5EAP/pub?output=csv',
  groupC: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ69lM2AAQWKsvQuC2KtdJVJM_1J2-8Qj0Vex4SgEsBysty8nziuYrgFG25IUAbhXqtXK60QINVpqec/pub?output=csv',
  historySheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgWTSm23kRDwxwHpkuKWeUd9CzZ8c77HQ14bsEPA4u4jJV2O1PdByP8HZz0ypVPOkXcGdDT87JFx1P/pub?gid=0&single=true&output=csv'
};

// Carrega contatos do Google Sheets
async function loadContactsFromSheet(grupo) {
  const url = grupo === 'A' ? SHEET_URLS.groupA : grupo === 'B' ? SHEET_URLS.groupB : SHEET_URLS.groupC;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');

    const contacts = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i] ? values[i].trim() : '';
        return obj;
      }, {});
    });

    console.log(`✅ Contatos carregados: ${contacts.length}`);
    return contacts;
  } catch (error) {
    console.error(`❌ Erro ao carregar planilha do grupo ${grupo}:`, error.message);
    return [];
  }
}

// Carrega histórico do Google Sheets
async function loadHistoryFromSheet() {
  try {
    const response = await fetch(SHEET_URLS.historySheetUrl);
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');

    const history = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i] ? values[i].trim() : '';
        return obj;
      }, {});
    });

    console.log(`✅ Histórico carregado: ${history.length} registros`);

    const historyListDiv = document.getElementById("historyList");
    historyListDiv.innerHTML = `<h2>Histórico de Envios</h2>`;

    if (history.length === 0) {
      historyListDiv.innerHTML += "<p>Nenhum histórico encontrado.</p>";
      return;
    }

    history.forEach(entry => {
      const card = document.createElement("div");
      card.className = "history-card";

      card.innerHTML = `
        <strong>@${entry.Perfil}</strong><br/>
        Para: @${entry.Contato}<br/>
        Data: ${entry.Data}<br/>
        Status: <span class="status">${entry.Status}</span>
      `;

      historyListDiv.appendChild(card);
    });
  } catch (e) {
    console.error(`❌ Erro ao carregar histórico:`, e.message);
  }
}

// Preenche seleção de perfis
const profileSelector = document.getElementById("profileSelector");
const contactListDiv = document.getElementById("contactList");

profiles.forEach(profile => {
  const option = document.createElement("option");
  option.value = profile.id;
  option.textContent = `${profile.username} (Grupo ${profile.grupo})`;
  profileSelector.appendChild(option);
});

// Mostra contatos ao selecionar perfil
profileSelector.onchange = async () => {
  const selectedProfile = profiles.find(p => p.id == profileSelector.value);

  if (!selectedProfile) return;

  contactListDiv.innerHTML = `<h2>Contatos - @${selectedProfile.username}</h2>`;

  let filteredContacts = [];

  if (selectedProfile.grupo === "A") {
    filteredContacts = (await loadContactsFromSheet("A")).filter(c => c.tipo === "pessoa_fisica");
  } else if (selectedProfile.grupo === "B") {
    filteredContacts = (await loadContactsFromSheet("B")).filter(c => c.tipo === "influencer");
  } else if (selectedProfile.grupo === "C") {
    const contacts = await loadContactsFromSheet("C");
    filteredContacts = contacts.filter(c =>
      ["medico", "atelie", "clinica_medica", "salao_beauty", "advogado", "fotografo"].includes(c.tipo)
    );
  }

  if (filteredContacts.length === 0) {
    contactListDiv.innerHTML += "<p>Nenhum contato disponível.</p>";
    return;
  }

  filteredContacts.forEach(contact => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const currentStatus = contact.status || "Não enviado";
    const statusClass = contact.status === "Enviado" ? "enviado" : "nao_enviado";

    card.innerHTML = `
      <strong>@${contact.name}</strong><br/>
      Tipo: ${contact.tipo}<br/>
      Status: <span class="status ${statusClass}">${currentStatus}</span><br/>
      Última Etapa: ${contact.lastMessage || 'Nenhuma'}
    `;

    contactListDiv.appendChild(card);
  });
};

// Carrega histórico assim que a página abrir
window.onload = async () => {
  await profileSelector.onchange(); // carrega contatos do primeiro perfil
  await loadHistoryFromSheet();     // carrega histórico
};