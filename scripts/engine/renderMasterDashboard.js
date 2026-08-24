/**
 * Creative Mind OS - Master Dashboard (`renderMasterDashboard.js`)
 * RPG Character Sheet Theme.
 * Generates an SVG simulating a gamified profile.
 */
const SVGBuilder = require("./svgBuilder");

function escapeXML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderMasterDashboard(data) {
  const svg = new SVGBuilder(1440, 900);

  // Set RPG Font Stack (using system fonts but styled heavily)
  svg.fontUI = `'Courier New', Courier, monospace, system-ui, sans-serif`;

  // --- Styles & Animations ---
  svg.addStyle(`
    .text-name { font-family: ${svg.fontUI}; font-size: 48px; font-weight: bold; fill: #FCE29F; letter-spacing: 2px; }
    .text-title { font-family: ${svg.fontUI}; font-size: 20px; font-weight: normal; fill: #B3A4C9; }
    .text-lvl { font-family: ${svg.fontUI}; font-size: 32px; font-weight: bold; fill: #FFFFFF; }
    .text-section { font-family: ${svg.fontUI}; font-size: 24px; font-weight: bold; fill: #FCE29F; letter-spacing: 4px; text-transform: uppercase; }
    .text-attr { font-family: ${svg.fontUI}; font-size: 22px; font-weight: bold; fill: #E5E5E5; }
    .text-val { font-family: ${svg.fontUI}; font-size: 28px; font-weight: bold; fill: #FCE29F; }
    .text-item-title { font-family: ${svg.fontUI}; font-size: 22px; font-weight: bold; fill: #7DF9FF; }
    .text-item-desc { font-family: ${svg.fontUI}; font-size: 16px; fill: #B3A4C9; }
    
    @keyframes floatParticle {
      0% { transform: translateY(0px) translateX(0px); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
    }
    @keyframes fillBar {
      0% { width: 0; }
      100% { } /* Reaches natural width */
    }
    @keyframes pulseGlow {
      0% { filter: drop-shadow(0 0 10px rgba(252, 226, 159, 0.2)); }
      50% { filter: drop-shadow(0 0 25px rgba(252, 226, 159, 0.6)); }
      100% { filter: drop-shadow(0 0 10px rgba(252, 226, 159, 0.2)); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    
    .anim-bar { animation: fillBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .anim-glow { animation: pulseGlow 4s infinite alternate; }
    .particle { animation: floatParticle 8s infinite linear; }
  `);

  // --- Gradients & Defs ---
  svg.addDef(`
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1625" />
      <stop offset="100%" stop-color="#0D0A14" />
    </linearGradient>
    <linearGradient id="panel-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(45, 38, 64, 0.6)" />
      <stop offset="100%" stop-color="rgba(30, 25, 45, 0.9)" />
    </linearGradient>
    <linearGradient id="hp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF3366" />
      <stop offset="100%" stop-color="#FF6699" />
    </linearGradient>
    <linearGradient id="mp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#33CCFF" />
      <stop offset="100%" stop-color="#66FFFF" />
    </linearGradient>
    <linearGradient id="xp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#33FF99" />
      <stop offset="100%" stop-color="#99FFCC" />
    </linearGradient>
    <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE29F" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA8000" />
    </linearGradient>
  `);

  // --- Background ---
  svg.addRect({ x: 0, y: 0, width: 1440, height: 900, fill: "url(#bg-grad)" });
  
  // Ambient particles
  let particles = "";
  for(let i=0; i<30; i++) {
    const px = Math.random() * 1440;
    const py = 100 + Math.random() * 800;
    const size = 1 + Math.random() * 3;
    const dur = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    particles += `<circle cx="${px}" cy="${py}" r="${size}" fill="#FCE29F" class="particle" style="animation-duration: ${dur}s; animation-delay: -${delay}s;" opacity="0" />\n`;
  }
  svg.addRaw(particles);

  // Border Frame
  svg.addRect({ x: 20, y: 20, width: 1400, height: 860, fill: "none", stroke: "url(#gold-border)", "stroke-width": 4, rx: 12 });
  svg.addRect({ x: 26, y: 26, width: 1388, height: 848, fill: "none", stroke: "rgba(252, 226, 159, 0.3)", "stroke-width": 1, rx: 8 });

  // Data Extraction
  const userName = escapeXML(data?.user?.name || "Player 1");
  const userBio = escapeXML(data?.user?.bio || "Software Engineer");
  const avatar = escapeXML(data?.user?.avatar_url || "");
  const stats = data?.stats || { total_commits: 1, public_repos: 1, stars_received: 0 };
  
  const level = Math.max(1, Math.floor((stats.total_commits || 0) / 100));
  const currentXP = (stats.total_commits || 0) % 100;
  const xpPct = (currentXP / 100) * 100;

  // --- LEFT COLUMN: CHARACTER ---
  const LEFT_X = 60;
  
  // Avatar Frame
  svg.addRaw(`
    <g transform="translate(${LEFT_X}, 80)">
      <circle cx="150" cy="150" r="130" fill="url(#panel-bg)" stroke="url(#gold-border)" stroke-width="6" class="anim-glow" />
      <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(252, 226, 159, 0.2)" stroke-width="2" stroke-dasharray="10 5" />
      <!-- Simulated Avatar Pattern/Pixel Art base if image fails -->
      <circle cx="150" cy="150" r="120" fill="#2D2640" />
      <path d="M 90 200 Q 150 150 210 200 L 210 270 L 90 270 Z" fill="#1A1625" />
      <circle cx="150" cy="120" r="45" fill="#4B3F6B" />
  `);
  
  svg.addRaw(`</g>`);

  // Character Info
  svg.addText(userName.toUpperCase(), { x: LEFT_X + 150, y: 440, class: "text-name", "text-anchor": "middle" });
  svg.addText(`Class: ${userBio}`, { x: LEFT_X + 150, y: 480, class: "text-title", "text-anchor": "middle" });
  
  // Level Badge
  svg.addRaw(`
    <g transform="translate(${LEFT_X + 100}, 510)">
      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="url(#panel-bg)" stroke="url(#gold-border)" stroke-width="3" />
      <text x="50" y="60" class="text-lvl" text-anchor="middle">LV${level}</text>
    </g>
  `);

  // HP / MP / XP Bars
  const drawBar = (y, label, valStr, pct, grad) => {
    const w = 260;
    const fillW = Math.max(10, (pct / 100) * w);
    return `
      <text x="${LEFT_X}" y="${y}" font-family="${svg.fontUI}" font-size="18px" font-weight="bold" fill="#E5E5E5">${label}</text>
      <text x="${LEFT_X + w}" y="${y}" font-family="${svg.fontUI}" font-size="18px" font-weight="bold" fill="#fff" text-anchor="end">${valStr}</text>
      <rect x="${LEFT_X}" y="${y + 10}" width="${w}" height="20" rx="4" fill="#0D0A14" stroke="#4B3F6B" stroke-width="2" />
      <rect x="${LEFT_X + 2}" y="${y + 12}" width="${fillW - 4}" height="16" rx="2" fill="url(#${grad})" class="anim-bar" />
    `;
  };

  svg.addRaw(`
    <g transform="translate(0, 650)">
      ${drawBar(0, "HP (Vitality)", "100%", 100, "hp-grad")}
      ${drawBar(50, "MP (Energy)", `${stats.public_repos * 15} / 100`, Math.min(100, stats.public_repos * 15), "mp-grad")}
      ${drawBar(100, "XP (Next Lvl)", `${currentXP} / 100`, xpPct, "xp-grad")}
    </g>
  `);


  // --- MIDDLE COLUMN: ATTRIBUTES & SKILLS ---
  const MID_X = 460;
  
  // Attributes Panel
  svg.addRect({ x: MID_X, y: 80, width: 440, height: 280, fill: "url(#panel-bg)", stroke: "#4B3F6B", "stroke-width": 2, rx: 12 });
  svg.addText("🗡️ ATTRIBUTES", { x: MID_X + 30, y: 130, class: "text-section" });
  svg.addLine({ x1: MID_X + 30, y1: 150, x2: MID_X + 410, y2: 150, stroke: "rgba(252, 226, 159, 0.2)", "stroke-width": 2 });

  const drawAttr = (y, name, val, icon) => `
    <text x="${MID_X + 30}" y="${y}" class="text-attr">${icon} ${name}</text>
    <text x="${MID_X + 400}" y="${y}" class="text-val" text-anchor="end">${val}</text>
    <line x1="${MID_X + 30}" y1="${y + 15}" x2="${MID_X + 410}" y2="${y + 15}" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" stroke-dasharray="4 4" />
  `;

  const totalLanguages = data?.languages?.length || 0;
  svg.addRaw(`
    ${drawAttr(200, "STR (Total Commits)", stats.total_commits, "⚔️")}
    ${drawAttr(250, "INT (Languages Known)", totalLanguages, "📖")}
    ${drawAttr(300, "AGI (Stars Earned)", stats.stars_received, "⚡")}
    ${drawAttr(350, "DEF (Public Repos)", stats.public_repos, "🛡️")}
  `);

  // Skills Panel
  svg.addRect({ x: MID_X, y: 400, width: 440, height: 440, fill: "url(#panel-bg)", stroke: "#4B3F6B", "stroke-width": 2, rx: 12 });
  svg.addText("🔮 SKILL TREE", { x: MID_X + 30, y: 450, class: "text-section" });
  svg.addLine({ x1: MID_X + 30, y1: 470, x2: MID_X + 410, y2: 470, stroke: "rgba(252, 226, 159, 0.2)", "stroke-width": 2 });

  const langs = data?.languages || [];
  const displayLangs = langs.slice(0, 5); // Top 5
  
  if (displayLangs.length === 0) {
    svg.addText("No skills acquired yet...", { x: MID_X + 30, y: 520, class: "text-item-desc" });
  }

  let skillHtml = "";
  displayLangs.forEach((lang, i) => {
    const sy = 510 + (i * 70);
    // Convert rawPct to a fake level 1-99
    const skillLevel = Math.max(1, Math.min(99, Math.round(lang.rawPct || 1)));
    skillHtml += `
      <text x="${MID_X + 30}" y="${sy}" font-family="${svg.fontUI}" font-size="20px" font-weight="bold" fill="#E5E5E5">${escapeXML(lang.name)}</text>
      <text x="${MID_X + 410}" y="${sy}" font-family="${svg.fontUI}" font-size="16px" font-weight="bold" fill="#33CCFF" text-anchor="end">Lvl ${skillLevel}</text>
      <rect x="${MID_X + 30}" y="${sy + 15}" width="380" height="12" rx="6" fill="#0D0A14" />
      <rect x="${MID_X + 30}" y="${sy + 15}" width="${(skillLevel / 100) * 380}" height="12" rx="6" fill="url(#mp-grad)" class="anim-bar" />
    `;
  });
  svg.addRaw(skillHtml);


  // --- RIGHT COLUMN: INVENTORY / EQUIPMENT ---
  const RIGHT_X = 940;
  
  svg.addRect({ x: RIGHT_X, y: 80, width: 440, height: 760, fill: "url(#panel-bg)", stroke: "#4B3F6B", "stroke-width": 2, rx: 12 });
  svg.addText("🎒 INVENTORY & EQUIPMENT", { x: RIGHT_X + 30, y: 130, class: "text-section" });
  svg.addLine({ x1: RIGHT_X + 30, y1: 150, x2: RIGHT_X + 410, y2: 150, stroke: "rgba(252, 226, 159, 0.2)", "stroke-width": 2 });

  const projects = data?.featured_projects || [];
  
  const slots = [
    { type: "Weapon", icon: "🗡️", color: "#FF3366" },
    { type: "Shield", icon: "🛡️", color: "#33CCFF" },
    { type: "Artifact", icon: "💍", color: "#FCE29F" },
    { type: "Armor", icon: "🥋", color: "#33FF99" }
  ];

  let invHtml = "";
  for (let i = 0; i < 4; i++) {
    const slot = slots[i];
    const proj = projects[i];
    const py = 190 + (i * 150);
    
    // Slot box
    invHtml += `
      <rect x="${RIGHT_X + 30}" y="${py}" width="80" height="80" rx="8" fill="#1A1625" stroke="${slot.color}" stroke-width="2" />
      <text x="${RIGHT_X + 70}" y="${py + 50}" font-size="40px" text-anchor="middle">${slot.icon}</text>
      
      <text x="${RIGHT_X + 130}" y="${py + 25}" font-family="${svg.fontUI}" font-size="14px" font-weight="bold" fill="${slot.color}" letter-spacing="1px" text-transform="uppercase">[ Equipped ${slot.type} ]</text>
    `;
    
    if (proj) {
      invHtml += `
        <text x="${RIGHT_X + 130}" y="${py + 50}" class="text-item-title">${escapeXML(proj.name)}</text>
        <text x="${RIGHT_X + 130}" y="${py + 75}" class="text-item-desc">${escapeXML(proj.description).substring(0, 35)}...</text>
      `;
    } else {
      invHtml += `
        <text x="${RIGHT_X + 130}" y="${py + 50}" font-family="${svg.fontUI}" font-size="22px" font-weight="bold" fill="#4B3F6B">Empty Slot</text>
      `;
    }
    
    if (i < 3) {
      invHtml += `<line x1="${RIGHT_X + 30}" y1="${py + 115}" x2="${RIGHT_X + 410}" y2="${py + 115}" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />`;
    }
  }
  
  // Status Footer
  svg.addRaw(`
    <g transform="translate(${RIGHT_X + 30}, 790)">
      <circle cx="10" cy="-5" r="5" fill="#33FF99" style="animation: blink 2s infinite;" />
      <text x="25" y="0" font-family="${svg.fontUI}" font-size="14px" fill="#33FF99" font-weight="bold">SYSTEM STATUS: ONLINE</text>
      <text x="25" y="20" font-family="${svg.fontUI}" font-size="12px" fill="#B3A4C9">Last Save: ${new Date().toLocaleDateString()}</text>
    </g>
  `);

  svg.addRaw(invHtml);

  return svg.toString();
}

module.exports = renderMasterDashboard;
