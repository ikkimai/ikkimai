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
  const svg = new SVGBuilder(900, 450);

  // Premium font stack
  svg.fontUI = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
  svg.fontMono = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;

  // --- Styles & Advanced CSS Animations ---
  svg.addStyle(`
    text { font-family: ${svg.fontUI}; }
    .mono { font-family: ${svg.fontMono}; }
    
    .title { font-size: 34px; font-weight: 800; fill: #FFFFFF; letter-spacing: -0.5px; }
    .subtitle { font-size: 15px; font-weight: 400; fill: #A1A1AA; letter-spacing: 0.5px; }
    
    .section-title { font-size: 10px; font-weight: 700; fill: #52525B; letter-spacing: 3px; text-transform: uppercase; }
    
    .metric-val { font-size: 42px; font-weight: 800; fill: #FFFFFF; letter-spacing: -2px; }
    .metric-lbl { font-size: 11px; font-weight: 600; fill: #71717A; letter-spacing: 1px; text-transform: uppercase; }
    
    .tech-name { font-size: 13px; font-weight: 600; fill: #E4E4E7; }
    .tech-pct { font-size: 12px; font-weight: 500; fill: #71717A; }

    .proj-name { font-size: 16px; font-weight: 700; fill: #FFFFFF; }
    .proj-desc { font-size: 12px; font-weight: 400; fill: #A1A1AA; }

    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideRight { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .fade-in { animation: fade 1.5s ease-in-out forwards; }
    .bar-grow { stroke-dasharray: 200; stroke-dashoffset: 200; animation: slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .blink { animation: blink 1.2s infinite; }
    .float { animation: float 6s ease-in-out infinite; }
  `);

  // --- Gradients & Defs ---
  svg.addDef(`
    <!-- Ultra dark pure background -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050505" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>

    <!-- Subtle Accent Gradient (Emerald/Cyan style) -->
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>

    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.15)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>

    <!-- Drop shadow for the avatar -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <clipPath id="avatar-clip">
      <circle cx="55" cy="55" r="55" />
    </clipPath>
  `);

  // --- BACKGROUND & GRID ---
  svg.addRect({ x: 0, y: 0, width: 900, height: 450, fill: "url(#bg)" });
  
  // Architect blueprint grid (very subtle)
  let grid = "";
  for (let x = 0; x <= 900; x += 45) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="450" stroke="rgba(255, 255, 255, 0.015)" stroke-width="1" />\\n`;
  }
  for (let y = 0; y <= 450; y += 45) {
    grid += `<line x1="0" y1="${y}" x2="900" y2="${y}" stroke="rgba(255, 255, 255, 0.015)" stroke-width="1" />\\n`;
  }
  svg.addRaw(grid);

  // Decorative border frame
  svg.addRect({ x: 1, y: 1, width: 898, height: 448, fill: "none", stroke: "rgba(255,255,255,0.05)", "stroke-width": 1 });
  svg.addRect({ x: 5, y: 5, width: 890, height: 440, fill: "none", stroke: "rgba(255,255,255,0.02)", "stroke-width": 1 });
  
  // Crosshairs in corners
  const crosshair = (x, y) => `
    <path d="M ${x-6} ${y} L ${x+6} ${y} M ${x} ${y-6} L ${x} ${y+6}" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  `;
  svg.addRaw(crosshair(20, 20) + crosshair(880, 20) + crosshair(20, 430) + crosshair(880, 430));

  // --- EXTRACT DATA ---
  const userName = escapeXML(data?.user?.name || data?.user?.login || "Senior Engineer");
  const userBio = escapeXML(data?.user?.bio || "Software Engineer & Architect");
  // Default to a base64 encoded transparent 1x1 if missing
  const avatar = data?.user?.avatar_url && data.user.avatar_url.startsWith('data:image') 
                 ? data.user.avatar_url 
                 : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                 
  const stats = data?.stats || { total_commits: 0, public_repos: 0, stars_received: 0, private_repos_secured: 0 };
  const totalRepos = (stats.public_repos || 0) + (stats.private_repos_secured || 0);

  // --- HEADER SECTION (Avatar + Name) ---
  svg.addRaw(`
    <g transform="translate(45, 45)" class="fade-in">
      <circle cx="55" cy="55" r="58" fill="none" stroke="url(#accent)" stroke-width="1" stroke-dasharray="4 4" style="transform-origin: 55px 55px; animation: rotate 30s linear infinite;" opacity="0.5" />
      <circle cx="55" cy="55" r="55" fill="#111" filter="url(#shadow)" />
      <g clip-path="url(#avatar-clip)">
        <image href="${avatar}" width="110" height="110" preserveAspectRatio="xMidYMid slice" />
      </g>
    </g>
  `);

  svg.addText(userName, { x: 180, y: 90, class: "title fade-in" });
  svg.addText(userBio, { x: 180, y: 115, class: "subtitle fade-in" });
  // Blinking terminal block
  svg.addRect({ x: 180 + (userBio.length * 8) - 10, y: 104, width: 8, height: 12, fill: "#10B981", class: "blink" });

  // Divider line
  svg.addRaw(`<line x1="180" y1="140" x2="850" y2="140" stroke="url(#line-grad)" stroke-width="1" class="fade-in" />`);

  // --- METRICS SECTION ---
  const metric = (x, y, value, label) => `
    <g transform="translate(${x}, ${y})" class="fade-in">
      <text x="0" y="0" class="metric-val">${value}</text>
      <text x="2" y="20" class="metric-lbl">${label}</text>
      <circle cx="-15" cy="-12" r="3" fill="#10B981" filter="url(#glow)" opacity="0.6" />
    </g>
  `;
  
  svg.addRaw(metric(200, 210, stats.total_commits.toLocaleString(), "Lifetime Commits"));
  svg.addRaw(metric(440, 210, totalRepos.toLocaleString(), "Total Repositories"));
  svg.addRaw(metric(680, 210, stats.stars_received.toLocaleString(), "Stars Earned"));

  // --- TECHNOLOGIES SECTION ---
  svg.addText("ENGINEERING STACK", { x: 45, y: 280, class: "section-title fade-in" });

  const langs = data?.languages || [];
  const displayLangs = langs.slice(0, 4);

  let stackHtml = "";
  displayLangs.forEach((lang, i) => {
    const sy = 310 + (i * 32);
    // Draw minimalist horizontal lines instead of thick boxes
    stackHtml += `
      <g class="fade-in">
        <text x="45" y="${sy + 4}" class="tech-name">${escapeXML(lang.name)}</text>
        <text x="365" y="${sy + 4}" class="tech-pct" text-anchor="end">${escapeXML(lang.pct)}</text>
        <!-- Background track -->
        <line x1="145" y1="${sy}" x2="315" y2="${sy}" stroke="rgba(255,255,255,0.05)" stroke-width="2" stroke-linecap="round" />
        <!-- Filled track -->
        <line x1="145" y1="${sy}" x2="${145 + ((lang.rawPct/100) * 170)}" y2="${sy}" stroke="url(#accent)" stroke-width="2" stroke-linecap="round" class="bar-grow" />
      </g>
    `;
  });
  svg.addRaw(stackHtml);

  // Vertical Separator
  svg.addRaw(`<line x1="450" y1="260" x2="450" y2="410" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`);

  // --- FEATURED ARCHITECTURE (Projects) ---
  svg.addText("FEATURED ARCHITECTURE", { x: 500, y: 280, class: "section-title fade-in" });

  const projects = data?.featured_projects || [];
  let projHtml = "";
  for(let i=0; i<2; i++) {
    const py = 300 + (i * 55);
    if (projects[i]) {
      projHtml += `
        <g transform="translate(500, ${py})" class="fade-in">
          <!-- Geometric marker -->
          <rect x="0" y="0" width="12" height="12" fill="none" stroke="#10B981" stroke-width="1" />
          <rect x="4" y="4" width="4" height="4" fill="#10B981" opacity="0.5" />
          
          <text x="25" y="11" class="proj-name">${escapeXML(projects[i].name)}</text>
          <text x="25" y="30" class="proj-desc">${escapeXML(projects[i].description).substring(0, 50)}</text>
        </g>
      `;
    }
  }
  svg.addRaw(projHtml);

  // Status Indicator
  svg.addRaw(`
    <g transform="translate(730, 45)" class="fade-in">
      <rect x="0" y="0" width="120" height="24" rx="12" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1" />
      <circle cx="15" cy="12" r="3" fill="#10B981" class="blink" filter="url(#glow)" />
      <text x="25" y="16" class="mono" style="font-size: 10px; fill: #10B981; font-weight: 600;">SYSTEM ONLINE</text>
    </g>
  `);

  return svg.toString();
}

module.exports = renderMasterDashboard;
