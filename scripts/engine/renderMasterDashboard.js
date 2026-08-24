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

  // Set Modern Font Stack
  svg.fontUI = `system-ui, -apple-system, 'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif`;

  // --- Styles & Animations ---
  svg.addStyle(`
    .text-title { font-family: ${svg.fontUI}; font-size: 56px; font-weight: 800; fill: #FFFFFF; letter-spacing: -1px; }
    .text-subtitle { font-family: ${svg.fontUI}; font-size: 24px; font-weight: 500; fill: #A1A1AA; }
    
    .text-section { font-family: ${svg.fontUI}; font-size: 16px; font-weight: 600; fill: #71717A; letter-spacing: 2px; text-transform: uppercase; }
    
    .metric-value { font-family: ${svg.fontUI}; font-size: 48px; font-weight: 800; fill: #FFFFFF; letter-spacing: -1px; }
    .metric-label { font-family: ${svg.fontUI}; font-size: 16px; font-weight: 500; fill: #A1A1AA; }
    
    .proj-title { font-family: ${svg.fontUI}; font-size: 24px; font-weight: 600; fill: #FFFFFF; }
    .proj-desc { font-family: ${svg.fontUI}; font-size: 16px; font-weight: 400; fill: #A1A1AA; line-height: 1.5; }
    
    .lang-name { font-family: ${svg.fontUI}; font-size: 16px; font-weight: 500; fill: #E4E4E7; }
    .lang-pct { font-family: ${svg.fontUI}; font-size: 14px; font-weight: 500; fill: #71717A; }

    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideRight {
      0% { width: 0; }
      100% { }
    }
    @keyframes pulseSoft {
      0% { opacity: 0.8; }
      50% { opacity: 1; filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4)); }
      100% { opacity: 0.8; }
    }
    @keyframes orbit {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .anim-fade { animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .anim-bar { animation: slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .anim-pulse { animation: pulseSoft 4s infinite alternate; }
  `);

  // --- Gradients & Defs ---
  svg.addDef(`
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050505" />
      <stop offset="100%" stop-color="#0A0A0A" />
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(25, 25, 25, 0.6)" />
      <stop offset="100%" stop-color="rgba(15, 15, 15, 0.4)" />
    </linearGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#D946EF" />
    </linearGradient>
    <linearGradient id="accent-muted" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(99, 102, 241, 0.5)" />
      <stop offset="100%" stop-color="rgba(139, 92, 246, 0.5)" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="avatar-clip">
      <circle cx="120" cy="120" r="120" />
    </clipPath>
  `);

  // --- Background ---
  svg.addRect({ x: 0, y: 0, width: 1440, height: 900, fill: "url(#bg-grad)" });
  
  // Ambient Grid Background
  let grid = "";
  for (let x = 0; x < 1440; x += 60) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="900" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />\\n`;
  }
  for (let y = 0; y < 900; y += 60) {
    grid += `<line x1="0" y1="${y}" x2="1440" y2="${y}" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />\\n`;
  }
  svg.addRaw(grid);

  // Decorative Abstract Orbs
  svg.addRaw(`
    <circle cx="200" cy="150" r="300" fill="#6366F1" opacity="0.05" filter="url(#glow)" />
    <circle cx="1200" cy="700" r="400" fill="#D946EF" opacity="0.04" filter="url(#glow)" />
  `);

  // Data Extraction
  const userName = escapeXML(data?.user?.name || data?.user?.login || "Senior Engineer");
  const userBio = escapeXML(data?.user?.bio || "Software Engineer & Architect");
  const avatar = escapeXML(data?.user?.avatar_url || "");
  const stats = data?.stats || { total_commits: 0, public_repos: 0, stars_received: 0, private_repos_secured: 0 };
  const totalRepos = (stats.public_repos || 0) + (stats.private_repos_secured || 0);

  // --- HEADER & PROFILE SECTION ---
  // Avatar
  svg.addRaw(`
    <g transform="translate(80, 80)" class="anim-fade" style="animation-delay: 0.1s;">
      <circle cx="80" cy="80" r="84" fill="none" stroke="url(#accent-grad)" stroke-width="2" opacity="0.5" class="anim-pulse" />
      <g clip-path="url(#avatar-clip)" transform="scale(0.666) translate(0,0)">
        <image href="${avatar}" width="240" height="240" />
      </g>
    </g>
  `);

  // Name & Title
  svg.addText(userName, { x: 280, y: 135, class: "text-title anim-fade", style: "animation-delay: 0.2s;" });
  svg.addText(userBio, { x: 280, y: 175, class: "text-subtitle anim-fade", style: "animation-delay: 0.3s;" });
  
  // Tag / Status
  svg.addRaw(`
    <g transform="translate(280, 205)" class="anim-fade" style="animation-delay: 0.4s;">
      <rect x="0" y="0" width="160" height="32" rx="16" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(99, 102, 241, 0.3)" stroke-width="1" />
      <circle cx="16" cy="16" r="4" fill="#34D399" />
      <text x="30" y="21" font-family="${svg.fontUI}" font-size="13px" font-weight="600" fill="#34D399" letter-spacing="1px">SYSTEM ONLINE</text>
    </g>
  `);

  // --- METRICS ROW ---
  const renderMetricCard = (x, y, label, value, delay) => `
    <g transform="translate(${x}, ${y})" class="anim-fade" style="animation-delay: ${delay}s;">
      <rect x="0" y="0" width="340" height="160" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <text x="32" y="55" class="text-section">${label}</text>
      <text x="32" y="115" class="metric-value">${value}</text>
      <path d="M 280 115 L 300 95 L 310 105 L 330 75" fill="none" stroke="url(#accent-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" />
    </g>
  `;

  svg.addRaw(renderMetricCard(80, 300, "TOTAL COMMITS", stats.total_commits.toLocaleString(), 0.5));
  svg.addRaw(renderMetricCard(440, 300, "REPOSITORIES", totalRepos.toLocaleString(), 0.6));
  svg.addRaw(renderMetricCard(800, 300, "STARS EARNED", stats.stars_received.toLocaleString(), 0.7));

  // --- TECH STACK SECTION ---
  svg.addRaw(`
    <g transform="translate(80, 500)" class="anim-fade" style="animation-delay: 0.8s;">
      <rect x="0" y="0" width="600" height="320" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <text x="40" y="50" class="text-section">ENGINEERING STACK</text>
  `);

  const langs = data?.languages || [];
  const displayLangs = langs.slice(0, 5);

  let stackHtml = "";
  displayLangs.forEach((lang, i) => {
    const sy = 90 + (i * 45);
    const fillWidth = Math.max(10, (lang.rawPct / 100) * 400);
    stackHtml += `
      <text x="40" y="${sy}" class="lang-name">${escapeXML(lang.name)}</text>
      <text x="160" y="${sy}" class="lang-pct">${escapeXML(lang.pct)}</text>
      <rect x="220" y="${sy - 10}" width="330" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="220" y="${sy - 10}" width="${fillWidth}" height="6" rx="3" fill="url(#accent-grad)" class="anim-bar" />
    `;
  });
  if (displayLangs.length === 0) {
    stackHtml += `<text x="40" y="100" class="lang-name">Analyzing repositories...</text>`;
  }
  
  svg.addRaw(stackHtml);
  svg.addRaw(`</g>`);

  // --- FEATURED ARCHITECTURE SECTION ---
  svg.addRaw(`
    <g transform="translate(710, 500)" class="anim-fade" style="animation-delay: 0.9s;">
      <rect x="0" y="0" width="650" height="320" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <text x="40" y="50" class="text-section">FEATURED ARCHITECTURE</text>
  `);

  const projects = data?.featured_projects || [];
  let projHtml = "";
  
  for(let i=0; i<2; i++) {
    const py = 80 + (i * 110);
    if (projects[i]) {
      projHtml += `
        <rect x="40" y="${py}" width="570" height="90" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <text x="65" y="${py + 35}" class="proj-title">${escapeXML(projects[i].name)}</text>
        <text x="65" y="${py + 65}" class="proj-desc">${escapeXML(projects[i].description).substring(0, 60)}</text>
        <circle cx="580" cy="${py + 45}" r="16" fill="rgba(255,255,255,0.05)" />
        <path d="M 577 39 L 585 45 L 577 51" fill="none" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      `;
    }
  }

  svg.addRaw(projHtml);
  svg.addRaw(`</g>`);

  // Abstract futuristic decoration on the top right
  svg.addRaw(`
    <g transform="translate(1250, 150)" opacity="0.3" class="anim-fade" style="animation-delay: 1s;">
      <circle cx="0" cy="0" r="80" fill="none" stroke="url(#accent-grad)" stroke-width="1" stroke-dasharray="4 8" style="animation: orbit 20s linear infinite;" />
      <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="animation: orbit 15s linear infinite reverse;" />
      <circle cx="0" cy="0" r="40" fill="none" stroke="url(#accent-grad)" stroke-width="2" stroke-dasharray="10 5" style="animation: orbit 10s linear infinite;" />
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" filter="url(#glow)" />
    </g>
  `);

  return svg.toString();
}

module.exports = renderMasterDashboard;
