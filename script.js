 // Dados dos perfis do Instagram
const profiles = [
  // Grupo A - pessoas físicas
  { id: 1, username: "2m.scouting", password: "dfgo000", grupo: "A" },
  { id: 2, username: "profissional.dm", password: "bhgo82", grupo: "A" },
  { id: 3, username: "scou.mmodels", password: "mkt1928", grupo: "A" },
  { id: 4, username: "scouteronline21", password: "arl1313", grupo: "A" },
  { id: 5, username: "virtual.scoutt", password: "gup0909", grupo: "A" },
  { id: 6, username: "on.scouter", password: "gup0909", grupo: "A" },
  { id: 7, username: "mood.profissional", password: "luu333", grupo: "A" },
  { id: 8, username: "profissional.scout", password: "jj900000", grupo: "A" },
  { id: 9, username: "virtual.choices", password: "verdade", grupo: "B" },
  { id: 10, username: "your.digitaltransition", password: "verdade", grupo: "C" }
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

// Simula mudança de status dos perfis
setInterval(() => {
  profiles.forEach(profile => {
    if (Math.random() > 0.9) {
      profile.status = "respondido";
      profile.lastReplied = `@usuario_alvo_${Math.floor(Math.random() * 1000)}`;
    } else if (Math.random() > 0.5) {
      profile.status = "sending";
    } else {
      profile.status = "offline";
    }
  });

  updateDashboard();
}, 5000);

updateDashboard(); // Primeira renderização