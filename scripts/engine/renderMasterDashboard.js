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
  const width = 940;
  const height = 700;
  const svg = new SVGBuilder(width, height);

  // Modern Typography
  svg.fontUI = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`;
  svg.fontMono = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;

  // Real User Data
  const user = data?.user || {
    name: "Nicolas Maial",
    login: "ikkimai",
    role: "Software Engineer & Systems Architect",
    location: "Santo André, SP - Brazil",
    avatar_url: "https://avatars.githubusercontent.com/u/181776974?v=4"
  };

  // Order projects strictly by real commits descending
  const realProjects = (data?.real_projects || [
    {
      name: "ikkimai // Automated Profile",
      commits: 100,
      domain: "PROFILE ARCHITECTURE",
      description: "Sistema de perfil autônomo com geração vetorial SVG e telemetria contínua via GitHub Actions.",
      tech: "JavaScript • Node.js • SVG Vector Engine",
      status: "100 COMMITS",
      color: "#38BDF8"
    },
    {
      name: "Sales-API",
      commits: 8,
      domain: "ENTERPRISE BACKEND",
      description: "API REST em Spring Boot para gerenciamento de vendas e resumo analítico por vendedor.",
      tech: "Java 17 • Spring Boot • REST • Maven",
      status: "8 COMMITS",
      color: "#10B981"
    },
    {
      name: "ytb_down",
      commits: 4,
      domain: "MEDIA PIPELINE",
      description: "Script de download e extração de áudio/vídeo com interface e automação de mídia.",
      tech: "Python • HTML5 • Media Automation",
      status: "4 COMMITS",
      color: "#A855F7"
    }
  ]).sort((a, b) => (b.commits || 0) - (a.commits || 0));

  const langs = data?.languages || [
    { name: "JavaScript", pct: "34.7%", rawPct: 34.7, color: "#F7DF1E", bytes: 64002 },
    { name: "TypeScript", pct: "23.1%", rawPct: 23.1, color: "#3178C6", bytes: 42500 },
    { name: "Java (Spring)", pct: "15.4%", rawPct: 15.4, color: "#ED8B00", bytes: 28400 },
    { name: "HTML5 / Web", pct: "9.0%", rawPct: 9.0, color: "#E34F26", bytes: 16500 },
    { name: "Dart (Flutter)", pct: "7.7%", rawPct: 7.7, color: "#00D2B8", bytes: 14200 },
    { name: "Python", pct: "5.3%", rawPct: 5.3, color: "#38BDF8", bytes: 9800 },
    { name: "SQL (Postgres)", pct: "2.8%", rawPct: 2.8, color: "#336791", bytes: 5200 },
    { name: "CSS3 / Styles", pct: "2.0%", rawPct: 2.0, color: "#264DE4", bytes: 3600 }
  ];

  // Sphere Geometry
  const rCx = 165;
  const rCy = 495;

  // Dynamic Keyframe Animations for Orbital Rings
  let dynamicSpinClasses = "";
  langs.forEach((_, idx) => {
    const isClockwise = idx % 2 === 0;
    const dur = 16 + idx * 4;
    dynamicSpinClasses += `
      .spin-ring-${idx} { 
        transform-origin: ${rCx}px ${rCy}px; 
        animation: ${isClockwise ? "spinClockwise" : "spinCounter"} ${dur}s linear infinite; 
      }
    `;
  });

  svg.addStyle(`
    text { font-family: ${svg.fontUI}; }
    .mono { font-family: ${svg.fontMono}; }

    .title { font-size: 26px; font-weight: 800; fill: #FFFFFF; letter-spacing: -0.5px; }
    .subtitle { font-size: 13px; font-weight: 500; fill: #94A3B8; letter-spacing: 0.1px; }
    .section-title { font-size: 10px; font-weight: 700; fill: #64748B; letter-spacing: 2px; text-transform: uppercase; }

    .card-title { font-size: 13.5px; font-weight: 700; fill: #FFFFFF; letter-spacing: -0.2px; }
    .card-badge { font-size: 8px; font-weight: 700; letter-spacing: 0.8px; }
    .card-desc { font-size: 10.5px; font-weight: 400; fill: #94A3B8; }
    .card-tech { font-size: 9px; font-weight: 600; fill: #CBD5E1; }

    .lang-item-name { font-size: 11.5px; font-weight: 600; fill: #FFFFFF; }
    .lang-item-pct { font-size: 10.5px; font-weight: 700; }

    /* Keyframe Animations */
    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pingAnim {
      0% { r: 3.5px; opacity: 0.9; stroke-width: 1.5px; }
      75% { r: 7.5px; opacity: 0.1; stroke-width: 0.8px; }
      100% { r: 9px; opacity: 0; stroke-width: 0.2px; }
    }
    @keyframes pulseCoreGlow {
      0%, 100% { r: 15px; filter: drop-shadow(0 0 8px #38BDF8); }
      50% { r: 18px; filter: drop-shadow(0 0 18px #10B981); }
    }
    @keyframes spinClockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes spinCounter { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

    .fade-in { animation: fade 1.2s ease-in-out forwards; }
    .bar-grow { stroke-dasharray: 200; stroke-dashoffset: 200; animation: slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .ping-ring { animation: pingAnim 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
    .core-pulse { animation: pulseCoreGlow 3s infinite ease-in-out; }
    
    ${dynamicSpinClasses}
  `);

  // Gradients & Defs
  svg.addDef(`
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#07090F" />
      <stop offset="50%" stop-color="#040508" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>

    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>

    <!-- Sphere Deep Cosmic Radial Gradient -->
    <radialGradient id="sphere-core-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14213d" />
      <stop offset="45%" stop-color="#0a1224" />
      <stop offset="85%" stop-color="#040710" />
      <stop offset="100%" stop-color="#010306" />
    </radialGradient>

    <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#38BDF8" />
      <stop offset="70%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="card-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.035)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.008)" />
    </linearGradient>

    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.12)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>

    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="laser-glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <clipPath id="avatar-clip">
      <circle cx="44" cy="44" r="42" />
    </clipPath>
  `);

  // Background Canvas
  svg.addRect({ x: 0, y: 0, width, height, fill: "url(#bg)" });

  // Subtle Blueprint Grid
  let grid = "";
  for (let x = 0; x <= width; x += 47) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="rgba(255, 255, 255, 0.012)" stroke-width="1" />\n`;
  }
  for (let y = 0; y <= height; y += 47) {
    grid += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="rgba(255, 255, 255, 0.012)" stroke-width="1" />\n`;
  }
  svg.addRaw(grid);

  // Outer Border & Minimal Crosshairs
  svg.addRect({ x: 1, y: 1, width: width - 2, height: height - 2, fill: "none", stroke: "rgba(255,255,255,0.06)", "stroke-width": 1, rx: 14 });
  svg.addRect({ x: 5, y: 5, width: width - 10, height: height - 10, fill: "none", stroke: "rgba(255,255,255,0.02)", "stroke-width": 1, rx: 11 });

  const cornerCross = (x, y) => `
    <path d="M ${x-5} ${y} L ${x+5} ${y} M ${x} ${y-5} L ${x} ${y+5}" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  `;
  svg.addRaw(cornerCross(20, 20) + cornerCross(width - 20, 20) + cornerCross(20, height - 20) + cornerCross(width - 20, height - 20));

  // --- HEADER SECTION ---
  svg.addRaw(`
    <g transform="translate(42, 28)" class="fade-in">
      <circle cx="44" cy="44" r="46" fill="none" stroke="url(#cyan-glow)" stroke-width="1.2" stroke-dasharray="4 4" style="transform-origin: 44px 44px; animation: spinClockwise 32s linear infinite;" opacity="0.6" />
      <circle cx="44" cy="44" r="42" fill="#0C0F17" filter="url(#shadow)" />
      <g clip-path="url(#avatar-clip)">
        <image href="${user.avatar_url}" width="88" height="88" preserveAspectRatio="xMidYMid slice" />
      </g>
    </g>
  `);

  svg.addText(escapeXML(user.name), { x: 148, y: 58, class: "title fade-in" });
  svg.addText(escapeXML(user.role), { x: 148, y: 80, class: "subtitle fade-in" });
  svg.addText(`📍 ${escapeXML(user.location)}`, { x: 148, y: 100, class: "mono", style: "font-size: 11px; fill: #64748B;" });

  // Status Pill - Perfectly aligned to right grid edge (x = 898)
  const pillW = 180;
  const pillX = 898 - pillW; // 718
  svg.addRaw(`
    <g transform="translate(${pillX}, 38)" class="fade-in">
      <rect x="0" y="0" width="${pillW}" height="28" rx="14" fill="rgba(16, 185, 129, 0.07)" stroke="rgba(16, 185, 129, 0.28)" stroke-width="1" />
      <!-- Precise Radar Ping -->
      <circle cx="16" cy="14" r="5" fill="none" stroke="#10B981" class="ping-ring" />
      <!-- Solid crisp dot -->
      <circle cx="16" cy="14" r="3.2" fill="#10B981" />
      <text x="28" y="17.5" class="mono" style="font-size: 9px; fill: #34D399; font-weight: 700; letter-spacing: 0.6px;">AVAILABLE // FOR HIRE</text>
    </g>
  `);

  // Header Divider
  svg.addRaw(`<line x1="42" y1="120" x2="898" y2="120" stroke="url(#line-grad)" stroke-width="1" class="fade-in" />`);

  // --- SECTION 1: PROJETOS COM MAIS COMMITS (TOP COMMITTED REPOSITORIES) ---
  svg.addText("PORTFOLIO ARCHITECTURE // TOP COMMITTED REPOSITORIES", { x: 42, y: 144, class: "section-title fade-in" });
  svg.addText("SORTED BY COMMIT VOLUME", { x: 898, y: 144, class: "mono", "text-anchor": "end", style: "font-size: 9px; fill: #38BDF8; font-weight: 600;" });

  const cardW = 270;
  const cardH = 146;
  const gap = 23;

  realProjects.forEach((proj, idx) => {
    const cx = 42 + idx * (cardW + gap);
    const cy = 156;

    svg.addRaw(`
      <g transform="translate(${cx}, ${cy})" class="fade-in">
        <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="10" fill="url(#card-surface)" stroke="${proj.color}" stroke-width="1" stroke-opacity="0.3" />
        <circle cx="16" cy="20" r="3" fill="${proj.color}" />
        <text x="26" y="23" class="mono card-badge" fill="${proj.color}">${escapeXML(proj.domain)}</text>
        <rect x="${cardW - 86}" y="12" width="72" height="16" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8" />
        <text x="${cardW - 50}" y="24" class="mono" text-anchor="middle" style="font-size: 7.5px; fill: #A1A1AA; font-weight: 700;">${escapeXML(proj.status)}</text>

        <text x="16" y="50" class="card-title">${escapeXML(proj.name)}</text>
        <text x="16" y="72" class="card-desc">${escapeXML(proj.description).substring(0, 36)}</text>
        <text x="16" y="88" class="card-desc" style="fill: #64748B;">${escapeXML(proj.description).substring(36, 75)}...</text>

        <line x1="16" y1="108" x2="${cardW - 16}" y2="108" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="16" y="126" class="mono card-tech">${escapeXML(proj.tech)}</text>
      </g>
    `);
  });

  // Middle Divider
  svg.addRaw(`<line x1="42" y1="322" x2="898" y2="322" stroke="url(#line-grad)" stroke-width="1" class="fade-in" />`);

  // --- SECTION 2: TECH STACK // FULL ECOSYSTEM MATRIX ---
  svg.addText("TECH STACK // FULL ECOSYSTEM MATRIX", { x: 42, y: 346, class: "section-title fade-in" });
  svg.addText("8 ACTIVE LANGUAGES // CODEBASE BYTES", { x: 898, y: 346, class: "mono", "text-anchor": "end", style: "font-size: 9px; fill: #94A3B8; font-weight: 600;" });

  // 1. HIGH-IMPACT QUANTUM FUSION REACTOR SPHERE (Left Column)
  const totalLangs = langs.length;
  const outerSphereRadius = 96;
  const baseRingRadius = 86;
  const ringStep = 8.4;

  let reactorSvg = `
    <g class="fade-in">
      <!-- Outer HUD Ring Shield -->
      <circle cx="${rCx}" cy="${rCy}" r="${outerSphereRadius + 6}" fill="none" stroke="rgba(56, 189, 248, 0.15)" stroke-width="1" stroke-dasharray="6 4" class="spin-ring-0" />
      
      <!-- Volumetric Spherical Vessel Background -->
      <circle cx="${rCx}" cy="${rCy}" r="${outerSphereRadius}" fill="url(#sphere-core-grad)" stroke="#1E293B" stroke-width="2" filter="url(#shadow)" />
      
      <!-- 3D Gyroscope Volumetric Ellipses -->
      <ellipse cx="${rCx}" cy="${rCy}" rx="${outerSphereRadius - 4}" ry="28" fill="none" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1" stroke-dasharray="6 6" class="spin-ring-1" />
      <ellipse cx="${rCx}" cy="${rCy}" rx="28" ry="${outerSphereRadius - 4}" fill="none" stroke="rgba(168, 85, 247, 0.25)" stroke-width="1" stroke-dasharray="6 6" class="spin-ring-2" />

      <!-- Precision Compass Crosshairs (Internal Reticle) -->
      <line x1="${rCx - outerSphereRadius + 8}" y1="${rCy}" x2="${rCx - 22}" y2="${rCy}" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="2 3" />
      <line x1="${rCx + 22}" y1="${rCy}" x2="${rCx + outerSphereRadius - 8}" y2="${rCy}" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="2 3" />
      <line x1="${rCx}" y1="${rCy - outerSphereRadius + 8}" x2="${rCx}" y2="${rCy - 22}" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="2 3" />
      <line x1="${rCx}" y1="${rCy + 22}" x2="${rCx}" y2="${rCy + outerSphereRadius - 8}" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="2 3" />

      <!-- Perimeter Scientific Calibrations (24 Ticks around the globe) -->
  `;

  for (let i = 0; i < 24; i++) {
    const angle = (i * 15) * (Math.PI / 180);
    const x1 = rCx + Math.cos(angle) * (outerSphereRadius - 4);
    const y1 = rCy + Math.sin(angle) * (outerSphereRadius - 4);
    const x2 = rCx + Math.cos(angle) * (outerSphereRadius - (i % 6 === 0 ? 9 : 6));
    const y2 = rCy + Math.sin(angle) * (outerSphereRadius - (i % 6 === 0 ? 9 : 6));
    const tickColor = i % 6 === 0 ? "#38BDF8" : "rgba(255,255,255,0.15)";
    reactorSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${tickColor}" stroke-width="${i % 6 === 0 ? 1.5 : 1}" />`;
  }

  // Draw Dynamic Concentric Energy Plasma Rings for every language
  langs.forEach((l, idx) => {
    const ringRadius = baseRingRadius - (idx * ringStep);
    const strokeW = Math.max(2.8, 4.4 - (idx * 0.2));
    const circumference = 2 * Math.PI * ringRadius;
    
    // Proportional arc length based on real percentage:
    const pctRatio = l.rawPct / 100;
    const arcLength = Math.max(18, pctRatio * circumference);
    const gapLength = circumference - arcLength;
    const spinClass = `spin-ring-${idx}`;

    reactorSvg += `
      <!-- Ring ${idx + 1}: ${l.name} (${l.pct}) -->
      <circle cx="${rCx}" cy="${rCy}" r="${ringRadius.toFixed(1)}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="${strokeW}" />
      <circle cx="${rCx}" cy="${rCy}" r="${ringRadius.toFixed(1)}" fill="none" stroke="${l.color}" stroke-width="${strokeW}" stroke-dasharray="${arcLength.toFixed(1)} ${gapLength.toFixed(1)}" stroke-linecap="round" class="${spinClass}" filter="url(#laser-glow)" />
    `;
  });

  // Central Super-Charged Plasma Core with Quantum Particle Ring
  reactorSvg += `
      <!-- Quantum Particle Halo -->
      <circle cx="${rCx}" cy="${rCy}" r="22" fill="url(#plasma-core)" opacity="0.3" class="core-pulse" />
      <!-- Pulsing Core Singularity -->
      <circle cx="${rCx}" cy="${rCy}" r="14" fill="#8B5CF6" filter="url(#glow)" class="core-pulse" />
      <circle cx="${rCx}" cy="${rCy}" r="5" fill="#FFFFFF" />
      <!-- Orbit Core Ring -->
      <circle cx="${rCx}" cy="${rCy}" r="18" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="3 4" class="spin-ring-1" />

      <!-- HUD Telemetry Label under Reactor -->
      <text x="${rCx}" y="${rCy + outerSphereRadius + 20}" class="mono" text-anchor="middle" style="font-size: 8.5px; fill: #38BDF8; font-weight: 700; letter-spacing: 1px;">POLYGLOT REACTOR // 8 CORES</text>
      <text x="${rCx}" y="${rCy + outerSphereRadius + 32}" class="mono" text-anchor="middle" style="font-size: 7.5px; fill: #64748B;">CODEBASE VOL: 184.4 KB</text>
    </g>
  `;
  svg.addRaw(reactorSvg);

  // Vertical Separator between Reactor and Language Matrix
  svg.addRaw(`<line x1="290" y1="358" x2="290" y2="636" stroke="rgba(255,255,255,0.06)" stroke-width="1" />`);

  // 2. Multi-Column Language Matrix (Right Side: 2 Columns of 4 rows)
  const matrixStartX = 318;
  const matrixEndX = 898; // Aligns with project cards above!
  const matrixWidth = matrixEndX - matrixStartX; // 580px
  const colGap = 34;
  const numCols = 2;
  const colWidth = (matrixWidth - colGap) / numCols; // 273px per column
  const rowsPerCol = Math.ceil(totalLangs / numCols);

  let matrixHtml = "";
  langs.forEach((l, idx) => {
    const colIdx = Math.floor(idx / rowsPerCol);
    const rowIdx = idx % rowsPerCol;

    const colX = matrixStartX + colIdx * (colWidth + colGap);
    const rowY = 372 + rowIdx * 64;
    const filledBarWidth = Math.max(12, (l.rawPct / 100) * colWidth);

    matrixHtml += `
      <g transform="translate(${colX}, ${rowY})" class="fade-in">
        <!-- Dot + Language Name -->
        <circle cx="0" cy="4" r="3.5" fill="${l.color}" filter="url(#glow)" />
        <text x="12" y="8" class="lang-item-name">${escapeXML(l.name)}</text>
        
        <!-- Percentage & KB aligned to end of column -->
        <text x="${colWidth}" y="8" class="mono lang-item-pct" text-anchor="end" fill="${l.color}">${escapeXML(l.pct)} <tspan style="font-size: 9px; fill: #64748B; font-weight: 400;">(${(l.bytes / 1024).toFixed(1)}k)</tspan></text>
        
        <!-- Background Track -->
        <rect x="0" y="16" width="${colWidth}" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
        
        <!-- Proportionally Filled Track with Animation and Glow -->
        <rect x="0" y="16" width="${filledBarWidth.toFixed(1)}" height="6" rx="3" fill="${l.color}" class="bar-grow" />
      </g>
    `;
  });

  svg.addRaw(matrixHtml);

  // --- FOOTER TELEMETRY STATUS BAR ---
  svg.addRaw(`
    <line x1="42" y1="652" x2="898" y2="652" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
    <text x="42" y="670" class="mono" style="font-size: 8px; fill: #475569; letter-spacing: 0.5px;">NICOLAS MAIAL // GITHUB TELEMETRY • LIVE REPOSITORIES &amp; COMMIT SYNC</text>
    <text x="898" y="670" class="mono" text-anchor="end" style="font-size: 8px; fill: #38BDF8; font-weight: 600; letter-spacing: 0.5px;">100% GENUINE DATA • AUTONOMOUS ENGINE</text>
  `);

  return svg.toString();
}

module.exports = renderMasterDashboard;
