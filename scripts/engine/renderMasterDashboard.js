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
  // Use a compact 900x450 resolution to perfectly fit GitHub's README bounds
  const svg = new SVGBuilder(900, 450);

  // Strictly standard system fonts to ensure it renders identically on all OS
  svg.fontUI = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
  svg.fontMono = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;

  // --- Styles & Advanced CSS Animations ---
  svg.addStyle(`
    text { font-family: ${svg.fontUI}; }
    .mono { font-family: ${svg.fontMono}; }
    
    .title { font-size: 28px; font-weight: 700; fill: #F8FAFC; letter-spacing: -0.5px; }
    .subtitle { font-size: 14px; font-weight: 400; fill: #94A3B8; }
    
    .section-title { font-size: 11px; font-weight: 600; fill: #64748B; letter-spacing: 1.5px; text-transform: uppercase; }
    
    .metric-val { font-size: 32px; font-weight: 700; fill: #F8FAFC; letter-spacing: -1px; }
    .metric-lbl { font-size: 12px; font-weight: 500; fill: #94A3B8; }
    
    .code-text { font-size: 13px; fill: #E2E8F0; }
    .code-comment { font-size: 13px; fill: #64748B; font-style: italic; }
    .code-keyword { font-size: 13px; fill: #38BDF8; font-weight: 600; }
    .code-string { font-size: 13px; fill: #10B981; }

    @keyframes typing {
      from { stroke-dashoffset: 100; }
      to { stroke-dashoffset: 0; }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    @keyframes slide-up {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bar-fill {
      from { width: 0; }
      to { } /* End state defined in SVG width attr */
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes scanline {
      0% { transform: translateY(-500px); }
      100% { transform: translateY(500px); }
    }

    .anim-slide { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .anim-bar { animation: bar-fill 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .anim-blink { animation: blink 1.2s infinite step-end; }
    .anim-glow { animation: pulse-glow 3s infinite alternate; }
  `);

  // --- Professional Minimalist Gradients ---
  svg.addDef(`
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.5)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.5)" />
    </linearGradient>

    <linearGradient id="primary-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>

    <clipPath id="avatar-clip">
      <circle cx="60" cy="60" r="60" />
    </clipPath>
  `);

  // Background
  svg.addRect({ x: 0, y: 0, width: 900, height: 450, fill: "url(#bg)" });
  
  // Subtle top border highlight
  svg.addRect({ x: 0, y: 0, width: 900, height: 2, fill: "url(#primary-accent)", opacity: 0.8 });

  // Grid background
  let grid = "";
  for (let x = 0; x <= 900; x += 30) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="450" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />\\n`;
  }
  for (let y = 0; y <= 450; y += 30) {
    grid += `<line x1="0" y1="${y}" x2="900" y2="${y}" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />\\n`;
  }
  svg.addRaw(grid);

  // Moving scanline effect (simulating a terminal/HUD)
  svg.addRaw(`
    <rect x="0" y="0" width="900" height="20" fill="url(#primary-accent)" opacity="0.03">
      <animate attributeName="y" values="-20; 470" dur="8s" repeatCount="indefinite" />
    </rect>
  `);

  // --- Extract Data ---
  const userName = escapeXML(data?.user?.name || data?.user?.login || "Engineer");
  const userBio = escapeXML(data?.user?.bio || "Software Engineer");
  const avatar = escapeXML(data?.user?.avatar_url || "");
  const stats = data?.stats || { total_commits: 0, public_repos: 0, stars_received: 0, private_repos_secured: 0 };
  const totalRepos = (stats.public_repos || 0) + (stats.private_repos_secured || 0);

  // --- HEADER ---
  svg.addRaw(`
    <g transform="translate(40, 40)" class="anim-slide" style="animation-delay: 0.1s;">
      <g clip-path="url(#avatar-clip)" transform="scale(0.8) translate(0,0)">
        <image href="${avatar}" width="120" height="120" />
      </g>
      <circle cx="48" cy="48" r="49" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" />
    </g>
  `);

  // Name & Title
  svg.addText(userName, { x: 155, y: 75, class: "title anim-slide", style: "animation-delay: 0.2s;" });
  svg.addText(userBio, { x: 155, y: 100, class: "subtitle anim-slide", style: "animation-delay: 0.3s;" });

  // Terminal cursor blinking next to bio
  svg.addRect({ x: 155 + (userBio.length * 7), y: 88, width: 6, height: 14, fill: "#38BDF8", class: "anim-blink" });

  // --- METRICS ---
  const renderMetric = (x, y, label, value, delay) => `
    <g transform="translate(${x}, ${y})" class="anim-slide" style="animation-delay: ${delay}s;">
      <rect x="0" y="0" width="200" height="90" rx="12" fill="url(#card)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <text x="24" y="35" class="section-title">${label}</text>
      <text x="24" y="70" class="metric-val">${value}</text>
    </g>
  `;
  
  svg.addRaw(renderMetric(40, 150, "TOTAL COMMITS", stats.total_commits.toLocaleString(), 0.4));
  svg.addRaw(renderMetric(260, 150, "REPOSITORIES", totalRepos.toLocaleString(), 0.5));
  svg.addRaw(renderMetric(480, 150, "STARS EARNED", stats.stars_received.toLocaleString(), 0.6));

  // --- TECH STACK (Animated Bars) ---
  svg.addRaw(`
    <g transform="translate(40, 270)" class="anim-slide" style="animation-delay: 0.7s;">
      <rect x="0" y="0" width="420" height="150" rx="12" fill="url(#card)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <text x="24" y="30" class="section-title">CORE TECHNOLOGIES</text>
  `);

  const langs = data?.languages || [];
  const displayLangs = langs.slice(0, 4);

  let stackHtml = "";
  displayLangs.forEach((lang, i) => {
    const sy = 55 + (i * 24);
    const fillWidth = Math.max(4, (lang.rawPct / 100) * 220);
    stackHtml += `
      <text x="24" y="${sy + 8}" class="subtitle" style="font-size: 12px; font-weight: 500; fill: #E2E8F0;">${escapeXML(lang.name)}</text>
      <text x="396" y="${sy + 8}" class="subtitle" text-anchor="end" style="font-size: 11px;">${escapeXML(lang.pct)}</text>
      <rect x="120" y="${sy}" width="220" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
      <rect x="120" y="${sy}" width="${fillWidth}" height="4" rx="2" fill="url(#primary-accent)" class="anim-bar" />
    `;
  });
  svg.addRaw(stackHtml);
  svg.addRaw(`</g>`);

  // --- TERMINAL / CODE SECTION ---
  svg.addRaw(`
    <g transform="translate(480, 270)" class="anim-slide" style="animation-delay: 0.8s;">
      <rect x="0" y="0" width="380" height="150" rx="12" fill="#020617" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      
      <!-- Terminal header -->
      <rect x="0" y="0" width="380" height="30" fill="rgba(255,255,255,0.02)" />
      <circle cx="20" cy="15" r="4" fill="#EF4444" opacity="0.8" />
      <circle cx="36" cy="15" r="4" fill="#F59E0B" opacity="0.8" />
      <circle cx="52" cy="15" r="4" fill="#10B981" opacity="0.8" />
      <text x="70" y="19" class="mono" style="font-size: 11px; fill: #64748B;">~/${userName.toLowerCase()}/system.ts</text>
      
      <!-- Code lines -->
      <text x="20" y="60" class="mono code-comment">// Initialize core architecture</text>
      <text x="20" y="80" class="mono code-text"><tspan class="code-keyword">const</tspan> engineer = <tspan class="code-keyword">new</tspan> Developer({</text>
      <text x="35" y="100" class="mono code-text">status: <tspan class="code-string">"Compiling robust solutions"</tspan>,</text>
      <text x="35" y="120" class="mono code-text">uptime: <tspan class="code-string">"99.99%"</tspan></text>
      <text x="20" y="140" class="mono code-text">});</text>
    </g>
  `);

  // System Status ping at bottom right
  svg.addRaw(`
    <g transform="translate(740, 42)" class="anim-slide" style="animation-delay: 0.9s;">
      <circle cx="0" cy="0" r="4" fill="#10B981" />
      <circle cx="0" cy="0" r="4" fill="#10B981" class="anim-glow" />
      <text x="12" y="4" class="mono" style="font-size: 10px; fill: #10B981; letter-spacing: 1px;">ALL SYSTEMS NOMINAL</text>
    </g>
  `);

  return svg.toString();
}

module.exports = renderMasterDashboard;
