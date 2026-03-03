const topicData = {
  tema: [
    "pendidikan",
    "teknologi",
    "lingkungan",
    "kesehatan",
    "budaya",
    "kepemimpinan",
    "kewirausahaan",
    "literasi digital",
    "ekonomi kreatif",
    "kesehatan mental",
  ],
  audiens: [
    "siswa SMP",
    "siswa SMA",
    "mahasiswa",
    "karyawan",
    "orang tua",
    "masyarakat umum",
    "komunitas lokal",
    "pelaku UMKM",
  ],
  gaya: ["inspiratif", "persuasif", "informatif", "reflektif"],
  template: [
    "Peran {tema} dalam membentuk masa depan {audiens}",
    "Mengapa {tema} penting untuk kehidupan sehari-hari",
    "Strategi {gaya} untuk meningkatkan kesadaran tentang {tema} bagi {audiens}",
    "Tantangan dan peluang {tema} di era modern untuk {audiens}",
    "Bagaimana pendekatan {gaya} dapat memperkuat {tema} di kalangan {audiens}",
    "Langkah praktis menerapkan {tema} secara {gaya} untuk {audiens}",
  ],
};

const RECENT_HISTORY_LIMIT = 6;
const recentTopics = [];

function getFilterValue(id, fallbackList) {
  const input = document.querySelector(`#${id}`);
  if (!input) {
    return fallbackList;
  }

  const value = input.value?.trim().toLowerCase();
  if (!value || value === "semua") {
    return fallbackList;
  }

  return fallbackList.includes(value) ? [value] : fallbackList;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function renderTemplate(template, params) {
  return template.replace(/\{(tema|audiens|gaya)\}/g, (_, key) => params[key]);
}

function buildCandidatePool(filters) {
  const candidates = [];

  topicData.template.forEach((template) => {
    filters.tema.forEach((tema) => {
      filters.audiens.forEach((audiens) => {
        filters.gaya.forEach((gaya) => {
          candidates.push(
            renderTemplate(template, {
              tema,
              audiens,
              gaya,
            })
          );
        });
      });
    });
  });

  return candidates;
}

function selectTopic(candidates) {
  const uniqueCandidates = candidates.filter((item) => !recentTopics.includes(item));
  const source = uniqueCandidates.length > 0 ? uniqueCandidates : candidates;
  const chosen = pickRandom(source);

  recentTopics.push(chosen);
  if (recentTopics.length > RECENT_HISTORY_LIMIT) {
    recentTopics.shift();
  }

  return chosen;
}

function generateTopic() {
  const filters = {
    tema: getFilterValue("temaFilter", topicData.tema),
    audiens: getFilterValue("audiensFilter", topicData.audiens),
    gaya: getFilterValue("gayaFilter", topicData.gaya),
  };

  const candidates = buildCandidatePool(filters);
  const topicOutput = document.querySelector("#topicOutput");

  if (!topicOutput) {
    return "";
  }

  if (!candidates.length) {
    topicOutput.textContent = "Tidak ada topik yang cocok dengan filter saat ini.";
    return "";
  }

  const generatedTopic = selectTopic(candidates);
  topicOutput.textContent = generatedTopic;
  return generatedTopic;
}

function bindTopicGenerator() {
  const generateBtn = document.querySelector("#generateBtn");

  if (generateBtn) {
    generateBtn.addEventListener("click", generateTopic);
    generateBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        generateTopic();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", bindTopicGenerator);
