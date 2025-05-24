const profileSelector = document.getElementById("profileSelector");
const contactListDiv = document.getElementById("contactList");

// Preenche seleção de perfis
profiles.forEach(profile => {
  const option = document.createElement("option");
  option.value = profile.id;
  option.textContent = `${profile.username} (Grupo ${profile.grupo})`;
  profileSelector.appendChild(option);
});

// Quando selecionar perfil, filtra contatos
profileSelector.onchange = () => {
  const selectedProfile = profiles.find(p => p.id == profileSelector.value);

  if (!selectedProfile) return;

  // Limpa a lista antiga
  contactListDiv.innerHTML = `<h2>Contatos - @${selectedProfile.username}</h2>`;

  let filteredContacts = [];

  if (selectedProfile.grupo === "A") {
    // Grupo A → só mostra pessoas físicas
    filteredContacts = contacts.filter(c => c.tipo === "pessoa_fisica");
  } else if (selectedProfile.grupo === "B") {
    // Grupo B → só mostra influencers
    filteredContacts = contacts.filter(c => c.tipo === "influencer");
  } else if (selectedProfile.grupo === "C") {
    // Grupo C → todos os outros tipos de cliente
    filteredContacts = contacts.filter(c => 
      ["loja", "atelie", "clinica_medica", "salao_beauty", "medico", "arquiteto", "advogado", "fotografo"].includes(c.tipo)
    );
  }

  // Mostra os contatos filtrados
  if (filteredContacts.length === 0) {
    contactListDiv.innerHTML += "<p>Nenhum contato disponível.</p>";
    return;
  }

  filteredContacts.forEach(contact => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const currentStatus = contact.responded ? "Respondido" : "Não enviado";
    const statusClass = contact.responded ? "enviado" : "nao_enviado";

    card.innerHTML = `
      <strong>@${contact.name}</strong><br/>
      Tipo: ${contact.tipo}<br/>
      Status: <span class="status ${statusClass}">${currentStatus}</span><br/>
      Última Etapa: ${contact.lastMessage || 'Nenhuma'}
      <button class="btn btn-blue" onclick="sendFirstMessage('${contact.name}', '${selectedProfile.username}')">Enviar Primeira Mensagem</button>
    `;

    contactListDiv.appendChild(card);
  });
};

// Simula envio da primeira mensagem
function sendFirstMessage(contactName, profileUsername) {
  const confirmSend = confirm(`Deseja simular envio para @${contactName}?`);
  if (confirmSend) {
    alert(`📩 Mensagem simulada enviada para @${contactName} pelo perfil @${profileUsername}`);
  }
}