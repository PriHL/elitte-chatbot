// URLs das planilhas publicadas como CSV
const SHEET_URLS = {
  groupA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj8LIFK3j19XrJMgq56HYahkCYP5eZk_P-JD5tNfj9G_UmUkylqmCopvwko4NfKQ9YzfF9SykNEsWw/pub?output=csv',
  groupB: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnHTiggKHA64vES0rXQ7I-6imiVH4CBoBXlK73KeqMadODhffZbSfarp82Qsa9p7XLpiuiXIe-5EAP/pub?output=csv',
  groupC: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ69lM2AAQWKsvQuC2KtdJVJM_1J2-8Qj0Vex4SgEsBysty8nziuYrgFG25IUAbhXqtXK60QINVpqec/pub?output=csv'
};

// Função pra carregar CSV e transformar em JSON
async function loadContactsFromSheet(url) {
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
  return contacts;
}