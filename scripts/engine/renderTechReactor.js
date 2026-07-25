/**
 * Creative Mind OS - Programming Language Fusion Reactor (`renderTechReactor.js`)
 * Generates an ultra-sleek, Apple/Vercel-styled multi-ring fusion arc dial representing repository language distribution.
 */
const SVGBuilder = require("./svgBuilder");

function renderTechReactor(data) {
  const width = 800;
  const height = 280;
  const svg = new SVGBuilder(width, height);

  svg.addFilterGlow("reactor-glow", "#38bdf8", 4);
  svg.addDropShadow("reactor-shadow", 8, 20, 0.45);
  svg.addGridPattern("reactor-grid", 32, "#1e293b", 0.35);
  svg.addLinearGradient("reactor-bg", "#0b1120", "#040711");

  svg.addStyle(`
    .reactor-title { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 700; fill: #f8fafc; letter-spacing: 2px; }
    .reactor-sub { font-family: ${svg.fontCode}; font-size: 11px; fill: #64748b; letter-spacing: 1px; }
    .lang-name { font-family: ${svg.fontUI}; font-size: 13px; font-weight: 700; fill: #f8fafc; }
    .lang-pct { font-family: ${svg.fontCode}; font-size: 13px; font-weight: 700; }
    
    @keyframes spinCW {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spinCCW {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    .ring-1 { transform-origin: 160px 150px; animation: spinCW 25s linear infinite; }
    .ring-2 { transform-origin: 160px 150px; animation: spinCCW 35s linear infinite; }
    .ring-3 { transform-origin: 160px 150px; animation: spinCW 45s linear infinite; }
  `);

  svg.addGlassCard(10, 10, 780, 260, 16, "url(#reactor-bg)", "#1e293b", "#a855f7", "reactor-shadow");
  svg.addRect({ x: 10, y: 10, width: 780, height: 260, fill: "url(#reactor-grid)", rx: 16 });

  svg.addText("LANGUAGE FUSION REACTOR // MULTI-RING TECH CONDUIT", { x: 38, y: 44, class: "reactor-title" });
  svg.addText("PRIMARY CODEBASE METRICS & SYNTAX DISTRIBUTION MATRIX", { x: 38, y: 62, class: "reactor-sub" });

  // Left: Multi-Ring Fusion Dial
  const cx = 160;
  const cy = 150;
  svg.addGroup(`
    <circle cx="${cx}" cy="${cy}" r="74" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="#38bdf8" stroke-width="6" stroke-dasharray="140 100" stroke-linecap="round" class="ring-1" />
    <circle cx="${cx}" cy="${cy}" r="48" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="90 80" stroke-linecap="round" class="ring-2" />
    <circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="#fbbf24" stroke-width="4" stroke-dasharray="60 60" stroke-linecap="round" class="ring-3" />
    <circle cx="${cx}" cy="${cy}" r="18" fill="#a855f7" filter="url(#reactor-glow)" />
    <circle cx="${cx}" cy="${cy}" r="6" fill="#ffffff" />
  `);

  // Right: Precise Language Distribution Bars
  const languages = data?.languages || [
    { name: "TypeScript / JavaScript", pct: "42.5%", color: "#38bdf8", width: 220 },
    { name: "Node.js & Backend Architecture", pct: "28.0%", color: "#10b981", width: 150 },
    { name: "Python & AI Models", pct: "16.5%", color: "#fbbf24", width: 90 },
    { name: "Flutter / Dart Mobile", pct: "13.0%", color: "#a855f7", width: 70 }
  ];

  let barsGroup = "";
  const startX = 300;
  const startY = 100;
  languages.forEach((l, idx) => {
    const y = startY + idx * 38;
    barsGroup += `
      <text x="${startX}" y="${y}" class="lang-name">${l.name}</text>
      <text x="${startX + 440}" y="${y}" class="lang-pct" fill="${l.color}" text-anchor="end">${l.pct}</text>
      <rect x="${startX}" y="${y + 8}" width="440" height="8" fill="#0f172a" stroke="#334155" rx="4" />
      <rect x="${startX}" y="${y + 8}" width="${l.width * 1.8}" height="8" fill="${l.color}" rx="4" />
    `;
  });

  svg.addGroup(barsGroup);
  return svg.toString();
}

module.exports = renderTechReactor;
