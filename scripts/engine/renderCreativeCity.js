/**
 * Creative Mind OS - High-Fidelity Architectural Skyline (`renderCreativeCity.js`)
 * Generates an ultra-clean, Vercel/Linear-styled glassmorphic cityscape where repositories become architectural skyscrapers.
 * Uses system fonts and vector icons (no emoji parsing errors) for guaranteed sharp rendering.
 */
const SVGBuilder = require("./svgBuilder");

function renderCreativeCity(projectsData) {
  const width = 800;
  const height = 460;
  const svg = new SVGBuilder(width, height);

  svg.addFilterGlow("city-glow", "#38bdf8", 4);
  svg.addFilterGlow("stealth-glow", "#c084fc", 5);
  svg.addDropShadow("city-shadow", 8, 20, 0.45);
  svg.addGridPattern("city-grid", 32, "#1e293b", 0.35);
  svg.addLinearGradient("city-bg", "#0b1120", "#040711");

  svg.addStyle(`
    .city-header { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 700; fill: #f8fafc; letter-spacing: 2px; }
    .city-sub { font-family: ${svg.fontCode}; font-size: 11px; fill: #64748b; letter-spacing: 1px; }
    .bldg-name { font-family: ${svg.fontUI}; font-size: 13px; font-weight: 700; fill: #f8fafc; text-anchor: middle; }
    .bldg-stats { font-family: ${svg.fontCode}; font-size: 10px; fill: #94a3b8; text-anchor: middle; }
    .bldg-type { font-family: ${svg.fontUI}; font-size: 10px; font-weight: 600; fill: #38bdf8; text-anchor: middle; }
    .billboard-text { font-family: ${svg.fontCode}; font-size: 8px; font-weight: 700; fill: #38bdf8; text-anchor: middle; }
    
    @keyframes windowTwinkle {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 0.15; }
    }
    @keyframes beaconPulse {
      0%, 100% { r: 3px; opacity: 1; filter: drop-shadow(0 0 6px #38bdf8); }
      50% { r: 5px; opacity: 0.4; filter: drop-shadow(0 0 12px #38bdf8); }
    }
    @keyframes stealthShield {
      0%, 100% { stroke-opacity: 0.6; stroke-dashoffset: 0; }
      50% { stroke-opacity: 0.2; stroke-dashoffset: 30; }
    }
    @keyframes droneFly {
      0% { transform: translateX(-100px); }
      100% { transform: translateX(900px); }
    }
    @keyframes droneFlyRev {
      0% { transform: translateX(900px); }
      100% { transform: translateX(-100px); }
    }
    
    .twinkle-1 { animation: windowTwinkle 3.2s infinite ease-in-out; }
    .twinkle-2 { animation: windowTwinkle 4.5s infinite ease-in-out 1s; }
    .twinkle-3 { animation: windowTwinkle 3.8s infinite ease-in-out 2s; }
    .beacon { animation: beaconPulse 1.6s infinite ease-in-out; }
    .stealth-field { stroke-dasharray: 8 12; animation: stealthShield 3.5s infinite linear; }
    .drone-1 { animation: droneFly 18s linear infinite; }
    .drone-2 { animation: droneFlyRev 24s linear infinite 5s; }
  `);

  // Glassmorphic background container
  svg.addGlassCard(10, 10, 780, 440, 16, "url(#city-bg)", "#1e293b", "#38bdf8", "city-shadow");
  svg.addRect({ x: 10, y: 10, width: 780, height: 440, fill: "url(#city-grid)", rx: 16 });

  // Header
  svg.addText("CREATIVE CITY // AUTONOMOUS SKYLINE", { x: 38, y: 44, class: "city-header" });
  svg.addText("LIVE REPOSITORY ARCHITECTURE MATRIX", { x: 38, y: 62, class: "city-sub" });

  // Ground horizon line
  const groundY = 365;
  svg.addLine({ x1: 20, y1: groundY, x2: 780, y2: groundY, stroke: "#334155", "stroke-width": 1.5 });

  // Flying Drones in Sky
  svg.addGroup(`
    <line x1="0" y1="85" x2="24" y2="85" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="12" cy="85" r="2.5" fill="#f43f5e" />
    <text x="32" y="88" font-family="${svg.fontCode}" font-size="8px" fill="#64748b">DRONE-01 [TELEMETRY PACKET]</text>
  `, { class: "drone-1" });

  svg.addGroup(`
    <line x1="0" y1="130" x2="20" y2="130" stroke="#10b981" stroke-width="1.5" />
    <circle cx="10" cy="130" r="2" fill="#10b981" />
  `, { class: "drone-2" });

  // Distant subtle silhouette buildings
  const silhouettes = [
    { x: 45, w: 50, h: 145 }, { x: 125, w: 65, h: 195 }, { x: 235, w: 55, h: 140 },
    { x: 345, w: 75, h: 220 }, { x: 460, w: 60, h: 170 }, { x: 575, w: 70, h: 205 }, { x: 685, w: 55, h: 155 }
  ];
  silhouettes.forEach((s) => {
    svg.addRect({ x: s.x, y: groundY - s.h, width: s.w, height: s.h, fill: "#0c1324", stroke: "#162036", "stroke-width": 1 });
  });

  const projects = projectsData && projectsData.length > 0 ? projectsData : [
    { name: "Creative Mind", type: "Core Neural OS", commits: 540, height: 260, width: 72, color: "#f43f5e", isPrivate: false },
    { name: "BulkUp", type: "Fitness Architecture", commits: 380, height: 210, width: 64, color: "#38bdf8", isPrivate: false },
    { name: "[Classified AI Core]", type: "Classified Neural Node", commits: 340, height: 195, width: 60, color: "#c084fc", isPrivate: true },
    { name: "Portfolio", type: "Interactive Showcase", commits: 190, height: 145, width: 54, color: "#fbbf24", isPrivate: false },
    { name: "Automations", type: "CI/CD Grid & Workers", commits: 120, height: 115, width: 48, color: "#10b981", isPrivate: false }
  ];

  const totalBuildings = projects.length;
  const spacing = 740 / totalBuildings;
  const startX = 30 + spacing / 2;

  projects.forEach((proj, idx) => {
    const { name, type, commits, height: rawH, width: bldgW, color, isPrivate } = proj;
    const bldgH = Math.min(270, Math.max(110, rawH || 160));
    const centerX = startX + idx * spacing;
    const bldgX = centerX - bldgW / 2;
    const bldgY = groundY - bldgH;

    let bldgGroup = "";
    const styleIndex = idx % 4;

    if (styleIndex === 0) {
      // Style 0: Tiered Tower
      const tier1W = bldgW;
      const tier1H = bldgH * 0.5;
      const tier2W = Math.floor(bldgW * 0.75);
      const tier2H = bldgH * 0.35;
      const tier3W = Math.floor(bldgW * 0.45);
      const tier3H = bldgH * 0.15;

      bldgGroup += `<rect x="${centerX - tier1W / 2}" y="${groundY - tier1H}" width="${tier1W}" height="${tier1H}" fill="#0d162a" stroke="${color}" stroke-width="1.6" rx="2" />`;
      bldgGroup += `<rect x="${centerX - tier2W / 2}" y="${groundY - tier1H - tier2H}" width="${tier2W}" height="${tier2H}" fill="#0f1a30" stroke="${color}" stroke-width="1.6" rx="2" />`;
      bldgGroup += `<rect x="${centerX - tier3W / 2}" y="${bldgY}" width="${tier3W}" height="${tier3H}" fill="#111f38" stroke="${color}" stroke-width="1.6" rx="1" />`;
    } else if (styleIndex === 1) {
      // Style 1: Pyramid Glass Top
      const bodyH = bldgH - 28;
      bldgGroup += `<rect x="${bldgX}" y="${bldgY + 28}" width="${bldgW}" height="${bodyH}" fill="#0d162a" stroke="${color}" stroke-width="1.6" rx="2" />`;
      bldgGroup += `<polygon points="${bldgX},${bldgY + 28} ${bldgX + bldgW},${bldgY + 28} ${centerX},${bldgY}" fill="#111f38" stroke="${color}" stroke-width="1.6" />`;
    } else if (styleIndex === 2) {
      // Style 2: Geodesic Dome Top
      const bodyH = bldgH - 24;
      bldgGroup += `<rect x="${bldgX}" y="${bldgY + 24}" width="${bldgW}" height="${bodyH}" fill="#0d162a" stroke="${color}" stroke-width="1.6" rx="2" />`;
      bldgGroup += `<path d="M ${bldgX + 4} ${bldgY + 24} A ${bldgW / 2 - 4} ${bldgW / 2 - 4} 0 0 1 ${bldgX + bldgW - 4} ${bldgY + 24} Z" fill="#111f38" stroke="${color}" stroke-width="1.6" />`;
    } else {
      // Style 3: Angled Modern Monolith
      bldgGroup += `<path d="M ${bldgX} ${groundY} L ${bldgX} ${bldgY + 18} L ${centerX + bldgW / 4} ${bldgY} L ${bldgX + bldgW} ${bldgY} L ${bldgX + bldgW} ${groundY} Z" fill="#0d162a" stroke="${color}" stroke-width="1.6" />`;
    }

    // Antenna Spire & Beacon
    const antennaH = 26;
    bldgGroup += `<line x1="${centerX}" y1="${bldgY}" x2="${centerX}" y2="${bldgY - antennaH}" stroke="${color}" stroke-width="1.6" />`;
    bldgGroup += `<circle cx="${centerX}" cy="${bldgY - antennaH}" r="3" fill="${color}" class="beacon" />`;

    // Hologram Billboard Sign hovering near top
    if (!isPrivate) {
      bldgGroup += `
        <rect x="${centerX - 36}" y="${bldgY - 14}" width="72" height="13" fill="#080e1a" stroke="${color}" stroke-width="1" rx="3" fill-opacity="0.95" />
        <text x="${centerX}" y="${bldgY - 5}" class="billboard-text" fill="${color}">${commits} COMMITS</text>
      `;
    }

    // Architectural Windows Grid
    const cols = Math.floor((bldgW - 16) / 11);
    const rows = Math.floor((bldgH - 45) / 16);
    const winCols = Math.max(2, cols);
    const winRows = Math.max(3, rows);
    const winStartX = centerX - (winCols * 11) / 2 + 2;
    const winStartY = bldgY + 38;

    for (let r = 0; r < winRows; r++) {
      for (let c = 0; c < winCols; c++) {
        const wx = winStartX + c * 11;
        const wy = winStartY + r * 16;
        const twinkleClass = (r + c) % 3 === 0 ? "twinkle-1" : (r + c) % 3 === 1 ? "twinkle-2" : "twinkle-3";
        const isLit = (r * 5 + c * 3 + idx) % 4 !== 0; // 75% lit
        if (isLit) {
          const winColor = isPrivate ? "#c084fc" : color;
          bldgGroup += `<rect x="${wx}" y="${wy}" width="6" height="9" fill="${winColor}" fill-opacity="0.75" rx="1.5" class="${twinkleClass}" />`;
        } else {
          bldgGroup += `<rect x="${wx}" y="${wy}" width="6" height="9" fill="#14213d" rx="1.5" />`;
        }
      }
    }

    // Stealth Forcefield Shield & Vector Padlock for Private Towers
    if (isPrivate) {
      const shieldW = bldgW + 18;
      const shieldH = bldgH + 15;
      bldgGroup += `
        <!-- Pulsing Stealth Shield -->
        <rect x="${centerX - shieldW / 2}" y="${groundY - shieldH}" width="${shieldW}" height="${shieldH}" rx="8" fill="#c084fc" fill-opacity="0.06" stroke="#c084fc" stroke-width="1.8" class="stealth-field" />
        <!-- Vector Padlock Badge (No emoji) -->
        <rect x="${centerX - 46}" y="${bldgY - 16}" width="92" height="15" fill="#0f091c" stroke="#c084fc" stroke-width="1.2" rx="4" />
        ${svg.getVectorPadlock(centerX - 35, bldgY - 8, "#c084fc")}
        <text x="${centerX + 8}" y="${bldgY - 5}" font-family="${svg.fontCode}" font-size="8px" font-weight="700" fill="#c084fc" text-anchor="middle">CLASSIFIED NODE</text>
      `;
    }

    // Digital Ground Reflection
    bldgGroup += `
      <line x1="${bldgX + 5}" y1="${groundY + 5}" x2="${bldgX + bldgW - 5}" y2="${groundY + 5}" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4" />
      <line x1="${bldgX + 12}" y1="${groundY + 11}" x2="${bldgX + bldgW - 12}" y2="${groundY + 11}" stroke="${color}" stroke-width="1" stroke-opacity="0.2" />
    `;

    // Base Label
    bldgGroup += `
      <g transform="translate(0, 0)">
        <text x="${centerX}" y="${groundY + 24}" class="bldg-name" fill="${isPrivate ? "#c084fc" : "#f8fafc"}">${name}</text>
        <text x="${centerX}" y="${groundY + 38}" class="bldg-type" fill="${isPrivate ? "#c084fc" : color}">${type || "Project Hub"}</text>
        <text x="${centerX}" y="${groundY + 52}" class="bldg-stats">${isPrivate ? "PRIVATE PROTOCOL" : `${commits} commits`}</text>
      </g>
    `;

    svg.addGroup(bldgGroup);
  });

  return svg.toString();
}

module.exports = renderCreativeCity;
