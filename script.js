// Dados simulados dos perfis do Instagram
const profiles = [
  { username: "perfil1", grupo: "A", status: "offline", lastReplied: null },
  { username: "perfil2", grupo: "B", status: "offline", lastReplied: null },
  { username: "perfil3", grupo: "C", status: "offline", lastReplied: null }
];

function updateDashboard(profiles) {
  const profileContainer = document.getElementById("profilesContainer");
  profileContainer.innerHTML = "";

  profiles.forEach(profile => {
    const card = document.createElement("div");
    card.className = "profile-card";

    const currentStatus = profile.status || "offline";
    const statusClass = currentStatus === "online"
      ? "online"
      : currentStatus === "respondido"
        ? "respondido"
        : "sending";

    card.innerHTML = `
      <strong>@${profile.username}</strong><br/>
      Grupo: ${profile.grupo}<br/>
      Status: <span class="status ${statusClass}">${currentStatus.toUpperCase()}</span><br/>
      Última resposta: <strong>${profile.lastReplied || 'Nenhuma'}</strong>
    `;

    profileContainer.appendChild(card);
  });
}

// Atualiza dados a cada 5 segundos
setInterval(() => {
  const updatedProfiles = [...profiles].map(p => ({
    ...p,
    status: ['online', 'offline', 'sending', 'respondido'][Math.floor(Math.random() * 4)],
    lastReplied: Math.random() > 0.9 ? `@usuario_alvo_${Math.floor(Math.random() * 1000)}` : p.lastReplied
  }));

  updateDashboard(updatedProfiles);
}, 5000);

// Carrega dados iniciais
updateDashboard(profiles);