// Substitua pelos links reais das planilhas publicadas como CSV
const SHEET_URLS = {
  contactsA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vROHMCk571zNmUYWUwdkzK217sxF_vALvSTbm_tQ9wyRW5eqleXB4JfoGRUEnHB3T9zxxXS-PNIKCSO/pub?output=csv',
  contactsB: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnHTiggKHA64vES0rXQ7I-6imiVH4CBoBXlK73KeqMadODhffZbSfarp82Qsa9p7XLpiuiXIe-5EAP/pub?output=csv'
};

// Função para carregar CSV como JSON
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

// Função pública pra carregar contatos
async function loadContacts(grupo) {
  const url = grupo === 'A' ? SHEET_URLS.contactsA : SHEET_URLS.contactsB;
  return await csvToJson(url);
}
