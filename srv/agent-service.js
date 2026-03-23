const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  this.on('ask', async (req) => {
    const q = (req.data.question || "").toLowerCase().trim();

    if (isUnsafe(q)) {
      return "This assistant provides safe, educational guidance only.";
    }

    if (q.includes("normal")) {
      return "Many body responses are natural and vary from person to person. Educational understanding helps separate facts from myths.";
    }

    if (q.includes("stress") || q.includes("relax")) {
      return "Relaxation can be influenced by hormones and the nervous system. This can be part of normal body processes.";
    }

    if (q.includes("frequency")) {
      return "Frequency differs across individuals. It is mainly a concern only if it disrupts daily life, work, or wellbeing.";
    }

    return "This assistant provides safe, non-explicit, educational body awareness and health guidance.";
  });
});

function isUnsafe(text) {
  const blocked = ["porn", "xxx", "explicit", "graphic"];
  return blocked.some(word => text.includes(word));
}