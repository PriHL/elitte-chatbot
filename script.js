const SHEET_URLS = {
  messages: 'COLE_AQUI_O_LINK_DA_PLANILHA_DE_MENSAGENS',
  contactsA: 'COLE_AQUI_O_LINK_DA_PLANILHA_DE_CONTATOS_GRUPO_A',
  contactsB: 'COLE_AQUI_O_LINK_DA_PLANILHA_DE_CONTATOS_GRUPO_B'
};

async function csvToJson(url) {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i] ? values[i].trim() : '';
      return obj;
    }, {});
  });
  return data;
}

async function loadMessages() {
  const data = await csvToJson(SHEET_URLS.messages);
  const grouped = { grupoA: [], grupoB: [] };

  data.forEach(row => {
    if (row.Grupo === 'A') grouped.grupoA.push(row.Mensagem);
    else if (row.Grupo === 'B') grouped.grupoB.push(row.Mensagem);
  });

  return grouped;
}

async function loadContacts(grupo) {
  const url = grupo === 'A' ? SHEET_URLS.contactsA : SHEET_URLS.contactsB;
  const data = await csvToJson(url);
  return data;
}