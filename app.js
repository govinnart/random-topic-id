const topicOutput = document.getElementById('topicOutput');
const generateBtn = document.getElementById('generateBtn');

const templates = [
  'Strategi {tema} yang relevan untuk {audiens} dalam situasi {formal}.',
  'Peran {tema} untuk membentuk masa depan {audiens} dengan gaya {formal}.',
  'Langkah sederhana menerapkan nilai {tema} bagi {audiens} secara {formal}.',
  'Mengapa isu {tema} penting dibahas oleh {audiens} dalam forum {formal}.',
  'Dari tantangan ke peluang: pendekatan {tema} untuk {audiens} secara {formal}.',
];

const fallback = {
  tema: ['pendidikan', 'lingkungan', 'kepemimpinan', 'teknologi', 'motivasi'],
  audiens: ['pelajar', 'mahasiswa', 'masyarakat umum', 'profesional'],
  formal: ['formal', 'semi-formal', 'santai'],
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getFilterValue(id, key) {
  const selected = document.getElementById(id).value.trim();
  return selected || randomItem(fallback[key]);
}

function generateTopic() {
  const tema = getFilterValue('temaSelect', 'tema');
  const audiens = getFilterValue('audiensSelect', 'audiens');
  const formal = getFilterValue('formalSelect', 'formal');

  const template = randomItem(templates);
  const result = template
    .replace('{tema}', tema)
    .replace('{audiens}', audiens)
    .replace('{formal}', formal);

  topicOutput.textContent = result;
}

generateBtn.addEventListener('click', generateTopic);
