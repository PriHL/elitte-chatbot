// Dados dos 10 perfis do Instagram
const profiles = [
  { id: 1, username: "2m.scouting", grupo: "A", status: "offline", lastActivity: "" },
  { id: 2, username: "scou.mmodels", grupo: "A", status: "offline", lastActivity: "" },
  { id: 3, username: "scouteronline21", grupo: "A", status: "offline", lastActivity: "" },
  { id: 4, username: "virtual.scoutt", grupo: "A", status: "offline", lastActivity: "" },
  { id: 5, username: "on.scouter", grupo: "A", status: "offline", lastActivity: "" },
  { id: 6, username: "profissional.scout", grupo: "A", status: "offline", lastActivity: "" },
  { id: 7, username: "mood.profissional", grupo: "A", status: "offline", lastActivity: "" },
  { id: 8, username: "profissional.dm", grupo: "A", status: "offline", lastActivity: "" },
  { id: 9, username: "virtual.choices", grupo: "B", status: "offline", lastActivity: "" },
  { id: 10, username: "your.digitaltransition", grupo: "C", status: "offline", lastActivity: "" }
];

const profileContainer = document.getElementById("profilesContainer");

function updateDashboard() {
  profileContainer.innerHTML = "";

  profiles.forEach(profile => {
    const card = document.createElement("div");
    card.className = "profile-card";

    const currentStatus = profile.status || "offline";
    const statusClass = currentStatus === "online"
      ? "online"
      : currentStatus === "sending"
        ? "sending"
        : "offline";

    card.innerHTML = `
      <strong>@${profile.username}</strong><br/>
      Grupo: ${profile.grupo}<br/>
      Status: <span class="status ${statusClass}">${currentStatus.toUpperCase()}</span><br/>
      Última Atividade: ${profile.lastActivity || 'Nenhuma'}
    `;

    profileContainer.appendChild(card);
  });
}

// Simula mudança de status dos perfis (você pode substituir por dados reais)
setInterval(() => {
  profiles.forEach(profile => {
    if (Math.random() > 0.8) {
      profile.status = "sending";
      profile.lastActivity = `Mensagem enviada para @usuario_alvo_${Math.floor(Math.random() * 1000)}`;
    } else if (Math.random() > 0.5) {
      profile.status = "online";
      profile.lastActivity = "Logado há alguns segundos";
    } else {
      profile.status = "offline";
      profile.lastActivity = "";
    }
  });

  updateDashboard();
}, 5000);

updateDashboard(); // Primeira renderização