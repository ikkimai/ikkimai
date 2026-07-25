/**
 * Creative Mind OS - Commit Energy Production Plant (`renderEnergyPlant.js`)
 * Generates an ultra-clean, Apple/Vercel-styled energy telemetry instrument fueled by contribution commits.
 */
const SVGBuilder = require("./svgBuilder");

function renderEnergyPlant(data) {
  const width = 800;
  const height = 240;
  const svg = new SVGBuilder(width, height);

  svg.addFilterGlow("energy-glow", "#10b981", 4);
  svg.addFilterGlow("lightning-glow", "#f43f5e", 5);
  svg.addDropShadow("energy-shadow", 6, 18, 0.45);
  svg.addGridPattern("energy-grid", 28, "#1e293b", 0.35);
  svg.addLinearGradient("energy-bg", "#0b1120", "#040711");

  svg.addStyle(`
    .plant-title { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 700; fill: #f8fafc; letter-spacing: 2px; }
    .plant-sub { font-family: ${svg.fontCode}; font-size: 11px; fill: #64748b; letter-spacing: 1px; }
    .label-code { font-family: ${svg.fontCode}; font-size: 11px; font-weight: 700; fill: #94a3b8; letter-spacing: 1px; }
    .val-code { font-family: ${svg.fontUI}; font-size: 26px; font-weight: 800; fill: #f8fafc; }
    .status-badge { font-family: ${svg.fontCode}; font-size: 11px; font-weight: 700; fill: #10b981; }
    .overdrive-badge { font-family: ${svg.fontCode}; font-size: 11px; font-weight: 700; fill: #f43f5e; }
    
    @keyframes plasmaFlow {
      0% { stroke-dashoffset: 100; opacity: 0.7; }
      50% { opacity: 1; stroke-width: 3px; }
      100% { stroke-dashoffset: 0; opacity: 0.7; }
    }
    @keyframes lightningFlash {
      0%, 90%, 100% { opacity: 0.1; stroke-width: 1px; }
      92%, 96% { opacity: 1; stroke-width: 3px; filter: drop-shadow(0 0 10px #f43f5e); }
    }
    @keyframes turbineSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .plasma-line { stroke-dasharray: 12 12; animation: plasmaFlow 2.8s linear infinite; }
    .lightning-bolt { animation: lightningFlash 2.5s infinite ease-in-out; }
    .turbine { transform-origin: 130px 130px; animation: turbineSpin 7s linear infinite; }
  `);

  svg.addGlassCard(10, 10, 780, 220, 16, "url(#energy-bg)", "#1e293b", "#10b981", "energy-shadow");
  svg.addRect({ x: 10, y: 10, width: 780, height: 220, fill: "url(#energy-grid)", rx: 16 });

  svg.addText("COMMIT ENERGY PLANT // HIGH-VOLTAGE POWER REACTOR", { x: 38, y: 44, class: "plant-title" });
  svg.addText("CONVERTING CONTRIBUTIONS INTO CLEAN DIGITAL MEGAWATTS", { x: 38, y: 62, class: "plant-sub" });

  // Left Section: Turbine Core
  const tCx = 130;
  const tCy = 130;
  svg.addGroup(`
    <circle cx="${tCx}" cy="${tCy}" r="52" stroke="#334155" stroke-width="2" fill="#0f172a" />
    <circle cx="${tCx}" cy="${tCy}" r="44" stroke="#10b981" stroke-width="2" stroke-dasharray="10 10" fill="none" class="turbine" />
    <circle cx="${tCx}" cy="${tCy}" r="30" stroke="#38bdf8" stroke-width="2" stroke-dasharray="18 14" fill="none" class="turbine" style="animation-direction: reverse;" />
    <circle cx="${tCx}" cy="${tCy}" r="14" fill="#10b981" filter="url(#energy-glow)" />
    <!-- High-voltage discharge vector inside core -->
    <path d="M ${tCx - 6} ${tCy - 18} L ${tCx + 4} ${tCy - 4} L ${tCx - 4} ${tCy + 2} L ${tCx + 6} ${tCy + 18}" stroke="#f43f5e" stroke-width="2" fill="none" class="lightning-bolt" />
  `);

  // Plasma connection
  svg.addLine({ x1: 182, y1: 130, x2: 250, y2: 130, stroke: "#10b981", "stroke-width": 2.5, class: "plasma-line" });
  svg.addCircle({ cx: 250, cy: 130, r: 4, fill: "#10b981" });

  // Center/Right Section: Commit Power Cells
  const commits = data?.stats?.total_commits || 1520;
  const mw = data?.stats?.power_output_mw || 84.5;
  const isOverdrive = commits > 1000 || mw > 80;

  svg.addText("ENERGY PRODUCTION LEVEL", { x: 270, y: 90, class: "label-code" });
  svg.addText(`${commits} COMMITS = ${mw} MW OUTPUT`, { x: 270, y: 118, class: "val-code" });

  // Power Bars
  let barGroup = "";
  const totalCells = 24;
  const activeCells = Math.min(totalCells, Math.floor((commits / 2000) * totalCells) || 18);
  const startX = 270;
  const barY = 134;
  const cellW = 16;
  const cellH = 32;

  for (let i = 0; i < totalCells; i++) {
    const cx = startX + i * (cellW + 4);
    if (i < activeCells) {
      const color = i > totalCells * 0.8 ? "#f43f5e" : i > totalCells * 0.55 ? "#fbbf24" : "#10b981";
      barGroup += `<rect x="${cx}" y="${barY}" width="${cellW}" height="${cellH}" fill="${color}" rx="3" />`;
    } else {
      barGroup += `<rect x="${cx}" y="${barY}" width="${cellW}" height="${cellH}" fill="#1e293b" rx="3" />`;
    }
  }
  svg.addGroup(barGroup);

  // Status Bar
  svg.addRect({ x: 270, y: barY + cellH + 16, width: 480, height: 26, fill: "#0f172a", stroke: "#334155", rx: 6 });
  if (isOverdrive) {
    svg.addCircle({ cx: 286, cy: barY + cellH + 29, r: 4.5, fill: "#f43f5e" });
    svg.addText(`⚡ SYSTEM OVERDRIVE ACTIVE // TURBINE RPM: 12,400 // REACTIVITY 99.9%`, { x: 302, y: barY + cellH + 33, class: "overdrive-badge" });
  } else {
    svg.addCircle({ cx: 286, cy: barY + cellH + 29, r: 4, fill: "#10b981" });
    svg.addText(`SYSTEM STABLE // REACTIVITY 99.8% // CORE FREQUENCY 4.2 GHz`, { x: 302, y: barY + cellH + 33, class: "status-badge" });
  }

  return svg.toString();
}

module.exports = renderEnergyPlant;
