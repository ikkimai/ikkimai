/**
 * Creative Mind OS - Daily Mission & System Directive (`renderDailyMission.js`)
 * Generates a clean, Apple/Vercel-styled directive card displaying daily quotes and operational goals.
 */
const SVGBuilder = require("./svgBuilder");

function renderDailyMission(quoteData) {
  const width = 800;
  const height = 120;
  const svg = new SVGBuilder(width, height);

  svg.addFilterGlow("mission-glow", "#38bdf8", 4);
  svg.addDropShadow("mission-shadow", 6, 16, 0.4);
  svg.addGridPattern("mission-grid", 24, "#1e293b", 0.35);
  svg.addLinearGradient("mission-bg", "#0b1120", "#040711");

  svg.addStyle(`
    .mission-title { font-family: ${svg.fontUI}; font-size: 14px; font-weight: 700; fill: #38bdf8; letter-spacing: 2px; }
    .mission-quote { font-family: ${svg.fontUI}; font-size: 15px; font-weight: 600; fill: #f8fafc; font-style: italic; }
    .mission-author { font-family: ${svg.fontCode}; font-size: 11px; font-weight: 700; fill: #64748b; }
    
    @keyframes targetSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .radar-icon { transform-origin: 50px 60px; animation: targetSpin 12s linear infinite; }
  `);

  svg.addGlassCard(10, 10, 780, 100, 14, "url(#mission-bg)", "#1e293b", "#38bdf8", "mission-shadow");
  svg.addRect({ x: 10, y: 10, width: 780, height: 100, fill: "url(#mission-grid)", rx: 14 });

  // Radar Target Icon
  svg.addGroup(`
    <circle cx="50" cy="60" r="22" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
    <circle cx="50" cy="60" r="16" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 6" class="radar-icon" />
    <circle cx="50" cy="60" r="5" fill="#38bdf8" />
  `);

  const quote = quoteData || { quote: "Build systems that empower minds and redefine architectural limits.", author: "Nicolas // Creative Mind" };
  svg.addText("DAILY OPERATIONAL DIRECTIVE // AI SYSTEM MISSION", { x: 88, y: 40, class: "mission-title" });
  svg.addText(`"${quote.quote}"`, { x: 88, y: 64, class: "mission-quote" });
  svg.addText(`— ${quote.author || "Creative Mind OS Kernel"}`, { x: 88, y: 86, class: "mission-author" });

  return svg.toString();
}

module.exports = renderDailyMission;
