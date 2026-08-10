/**
 * Creative Mind OS - Master Dashboard (`renderMasterDashboard.js`)
 * Generates a unified 1440x900 dashboard replicating an ultra-premium AI landing page.
 * Features staggered cinematic build sequence (loads in pieces), Premium Plus Pro colors, and precise SVG physics.
 */
const SVGBuilder = require("./svgBuilder");

function project3D(x, y, z, fov, viewDist) {
  const factor = fov / (viewDist + z);
  return { x: x * factor, y: y * factor, scale: factor };
}

function renderMasterDashboard(data) {
  const svg = new SVGBuilder(1440, 900);

  // Deep Premium Aesthetics Styles & Cinematic Orchestration Keyframes
  svg.addStyle(`
    .text-title { font-family: ${svg.fontUI}; font-size: 54px; font-weight: 500; fill: #ffffff; letter-spacing: -2px; }
    .text-subtitle { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 400; fill: #8a8f98; line-height: 1.6; }
    .text-metric-val { font-family: ${svg.fontUI}; font-size: 38px; font-weight: 400; fill: #ffffff; letter-spacing: -1px; }
    .text-card-title { font-family: ${svg.fontUI}; font-size: 13px; font-weight: 600; fill: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; }
    .text-sm { font-family: ${svg.fontUI}; font-size: 13px; fill: #8a8f98; }
    
    /* Orchestration Animations */
    @keyframes revealText { 0% { transform: translateX(-30px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
    @keyframes fadeUp { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
    @keyframes popInCore { 0% { transform: scale(0.6); opacity: 0; filter: blur(10px); } 60% { transform: scale(1.05); filter: blur(0px); } 100% { transform: scale(1); opacity: 1; } }
    @keyframes drawLines { 0% { opacity: 0; stroke-dasharray: 200; stroke-dashoffset: 200; } 100% { opacity: 1; stroke-dasharray: 200; stroke-dashoffset: 0; } }
    @keyframes ejectNode { 0% { transform: scale(0) translate(0, 0); opacity: 0; } 100% { transform: scale(1) translate(0, 0); opacity: 1; } }
    @keyframes expandBar { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
    @keyframes slideUpData { 0% { transform: translateY(15px) scaleY(0.1); opacity: 0; } 100% { transform: translateY(0) scaleY(1); opacity: 1; } }
    
    /* Physics Animations */
    @keyframes floatNode { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes pulseParticle { 0%, 100% { r: 1.5; opacity: 0.8; } 50% { r: 3.5; opacity: 1; filter: drop-shadow(0 0 8px rgba(255,255,255,1)); } }
    
    /* Sequence Classes */
    .seq-reveal { opacity: 0; animation: revealText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .seq-fade-up { opacity: 0; animation: fadeUp 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .seq-core { opacity: 0; transform-origin: 620px 400px; animation: popInCore 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .seq-lines { animation: drawLines 2s ease-out forwards; }
    .seq-node { opacity: 0; animation: ejectNode 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform-origin: center; }
    
    .anim-bar { opacity: 0; transform-origin: bottom; animation: slideUpData 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .anim-progress { transform-origin: left; animation: expandBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `);

  // Premium Plus Pro Gradient Definitions
  svg.addDef(`
    <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(129, 140, 248, 0.20)" />
      <stop offset="50%" stop-color="rgba(192, 132, 252, 0.08)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0)" />
    </radialGradient>
    <linearGradient id="node-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(56, 189, 248, 0.7)" />
      <stop offset="100%" stop-color="rgba(192, 132, 252, 0.3)" />
    </linearGradient>
  `);

  const HERO_X = 80;
  const RIGHT_X = 1000;
  const RIGHT_W = 400;

  // --- CENTER HERO (Welcome Sequence) ---
  svg.addGroup(`
    <g class="seq-reveal" style="animation-delay: 0.1s;">
      <path d="M 80 80 L 90 95 L 100 80 M 90 95 L 90 110" stroke="#818cf8" stroke-width="2" fill="none" />
      <text x="120" y="95" font-family="${svg.fontUI}" font-size="14px" font-weight="600" fill="#ffffff" letter-spacing="2px">CREATIVE MIND OS</text>
    </g>
  `);

  svg.addText("WELCOME TO CREATIVE MIND", { x: HERO_X, y: 220, class: "text-card-title seq-reveal", fill: "#38bdf8", style: "animation-delay: 0.2s;" });
  svg.addText("Building digital", { x: HERO_X, y: 290, class: "text-title seq-reveal", style: "animation-delay: 0.3s;" });
  svg.addText("experiences", { x: HERO_X, y: 350, class: "text-title seq-reveal", style: "animation-delay: 0.4s;" });
  svg.addText("that matter.", { x: HERO_X, y: 410, class: "text-title seq-reveal", style: "animation-delay: 0.5s;" });
  
  svg.addText("I design and engineer digital products,", { x: HERO_X, y: 480, class: "text-subtitle seq-reveal", style: "animation-delay: 0.6s;" });
  svg.addText("automate workflows and explore", { x: HERO_X, y: 510, class: "text-subtitle seq-reveal", style: "animation-delay: 0.7s;" });
  svg.addText("intelligent systems.", { x: HERO_X, y: 540, class: "text-subtitle seq-reveal", style: "animation-delay: 0.8s;" });

  svg.addGroup(`
    <g class="seq-fade-up" style="animation-delay: 1.0s;">
      <rect x="${HERO_X}" y="600" width="180" height="50" rx="25" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.4)" stroke-width="1" />
      <text x="${HERO_X + 35}" y="630" font-family="${svg.fontUI}" font-size="14px" fill="#ffffff">Explore My Universe  →</text>
    </g>
  `);

  // --- THE KNOWLEDGE CORE (Premium Plus Pro) ---
  const CORE_CX = 620;
  const CORE_CY = 400;
  const CORE_R = 190;
  
  // Create layers for optical illusion
  let coreFront = "";
  let coreBack = "";
  const points = [];
  
  const numPoints = 250;
  const phi = Math.PI * (3 - Math.sqrt(5));
  
  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push({ x: x * CORE_R, y: y * CORE_R, z: z * CORE_R });
  }

  const premiumColors = ["#818cf8", "#c084fc", "#38bdf8", "#ffffff"];

  // Generate lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y, points[i].z - points[j].z);
      if (d < 50) {
        const projI = project3D(points[i].x, points[i].y, points[i].z, 400, 500);
        const projJ = project3D(points[j].x, points[j].y, points[j].z, 400, 500);
        const lineStr = `<line x1="${CORE_CX + projI.x}" y1="${CORE_CY + projI.y}" x2="${CORE_CX + projJ.x}" y2="${CORE_CY + projJ.y}" stroke="rgba(192, 132, 252, 0.25)" stroke-width="0.8" class="seq-lines" style="animation-delay: ${0.8 + Math.random()*0.5}s;" />\n`;
        if (points[i].z > 0 && points[j].z > 0) coreFront += lineStr;
        else coreBack += lineStr;
      }
    }
  }

  // Generate particles
  points.forEach((p, idx) => {
    const proj = project3D(p.x, p.y, p.z, 400, 500);
    const size = Math.max(1.0, proj.scale * 3.0);
    const isFront = p.z > 0;
    const isSpecial = isFront && idx % 10 === 0; // More special glowing nodes
    
    const color = isFront ? premiumColors[idx % premiumColors.length] : "#475569";
    const opacity = isFront ? 0.95 : 0.25;
    const animStyle = isSpecial ? `animation: pulseParticle ${2 + Math.random()*2}s infinite alternate;` : "";
    const particleStr = `<circle cx="${CORE_CX + proj.x}" cy="${CORE_CY + proj.y}" r="${size}" fill="${color}" opacity="${opacity}" style="${animStyle}" />\n`;
    
    if (isFront) coreFront += particleStr;
    else coreBack += particleStr;
  });

  const animatedCore = `
    <g class="seq-core" style="animation-delay: 0.5s;">
      <circle cx="${CORE_CX}" cy="${CORE_CY}" r="${CORE_R * 2.5}" fill="url(#core-glow)" style="mix-blend-mode: screen;" />
      <g>
        ${coreBack}
        <animateTransform attributeName="transform" type="rotate" from="0 ${CORE_CX} ${CORE_CY}" to="-360 ${CORE_CX} ${CORE_CY}" dur="45s" repeatCount="indefinite" />
      </g>
      <g>
        ${coreFront}
        <animateTransform attributeName="transform" type="rotate" from="0 ${CORE_CX} ${CORE_CY}" to="360 ${CORE_CX} ${CORE_CY}" dur="30s" repeatCount="indefinite" />
      </g>
    </g>
  `;

  const rings = `
    <g class="seq-core" style="animation-delay: 0.6s;">
      <ellipse cx="${CORE_CX}" cy="${CORE_CY}" rx="${CORE_R + 80}" ry="${CORE_R + 15}" fill="none" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5" />
      <animateTransform attributeName="transform" type="rotate" from="25 ${CORE_CX} ${CORE_CY}" to="385 ${CORE_CX} ${CORE_CY}" dur="35s" repeatCount="indefinite" />
    </g>
    <g class="seq-core" style="animation-delay: 0.7s;">
      <ellipse cx="${CORE_CX}" cy="${CORE_CY}" rx="${CORE_R + 130}" ry="${CORE_R + 35}" fill="none" stroke="rgba(192, 132, 252, 0.15)" stroke-width="1" />
      <animateTransform attributeName="transform" type="rotate" from="-35 ${CORE_CX} ${CORE_CY}" to="-395 ${CORE_CX} ${CORE_CY}" dur="40s" repeatCount="indefinite" />
    </g>
  `;

  // --- Map Real Languages to Nodes ---
  const fallbackLangs = ["Flutter", "AWS", "Node.js", "Docker", "Python", "Figma", "Postgres"];
  const baseLangs = data?.languages?.length > 0 ? data.languages.map(l => l.name) : fallbackLangs;
  const realLangs = [...baseLangs];
  
  // If user has less than 7 languages, recycle their top languages to fill the orbit!
  let idx = 0;
  while(realLangs.length < 7) { 
    realLangs.push(baseLangs[idx % baseLangs.length]); 
    idx++;
  }

  const drawNode = (x, y, label, delaySpawn, delayFloat) => `
    <g transform="translate(${x}, ${y})">
      <g class="seq-node" style="animation-delay: ${delaySpawn}s">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0" dur="${3 + Math.random()*2}s" repeatCount="indefinite" />
          <circle cx="0" cy="0" r="34" fill="#0A0A0A" stroke="url(#node-border)" stroke-width="2" />
          <text x="0" y="4" font-family="${svg.fontUI}" font-size="12px" fill="#e2e8f0" text-anchor="middle" font-weight="600">${label.substring(0, 10)}</text>
        </g>
      </g>
    </g>
  `;

  const nodes = `
    ${drawNode(CORE_CX - 150, CORE_CY - 140, realLangs[0], 1.0, 0.2)}
    ${drawNode(CORE_CX + 190, CORE_CY - 110, realLangs[1], 1.2, 1.5)}
    ${drawNode(CORE_CX - 220, CORE_CY + 10, realLangs[2],  1.4, 0.7)}
    ${drawNode(CORE_CX + 240, CORE_CY + 60, realLangs[3],  1.6, 2.1)}
    ${drawNode(CORE_CX - 140, CORE_CY + 170, realLangs[4], 1.8, 1.1)}
    ${drawNode(CORE_CX + 170, CORE_CY + 190, realLangs[5], 2.0, 2.8)}
    ${drawNode(CORE_CX, CORE_CY + 240, realLangs[6],       2.2, 0.4)}
  `;

  svg.addGroup(rings + animatedCore + nodes);
  svg.addText("KNOWLEDGE CORE", { x: CORE_CX, y: 100, class: "text-card-title seq-reveal", "text-anchor": "middle", fill: "#818cf8", style: "animation-delay: 0.8s;" });

  // --- RIGHT METRICS (Data Grids) ---
  const stats = data?.stats || { total_commits: 1532, public_repos: 28 };
  
  svg.addGroup(`
    <g class="seq-reveal" style="animation-delay: 0.5s;">
      <circle cx="${RIGHT_X}" cy="90" r="16" fill="rgba(56, 189, 248, 0.15)" />
      <text x="${RIGHT_X}" y="94" font-family="${svg.fontUI}" font-size="12px" fill="#38bdf8" text-anchor="middle">+</text>
      <text x="${RIGHT_X + 25}" y="86" class="text-sm">System Status</text>
      <circle cx="${RIGHT_X + 30}" cy="100" r="4" fill="#34d399" style="filter: drop-shadow(0 0 4px #34d399);">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="${RIGHT_X + 40}" y="103" font-family="${svg.fontUI}" font-size="12px" font-weight="600" fill="#34d399">Online</text>
      
      <text x="${RIGHT_X + 160}" y="86" class="text-sm">Last Updated</text>
      <text x="${RIGHT_X + 160}" y="103" font-family="${svg.fontUI}" font-size="12px" font-weight="600" fill="#fff">${new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</text>
    </g>
  `);

  // Card 1: Commit Activity (Fades up at 1.0s)
  svg.addGroup(`<g class="seq-fade-up" style="animation-delay: 1.0s;">`);
  svg.addPremiumCard(RIGHT_X, 150, RIGHT_W, 180);
  svg.addText("COMMIT ACTIVITY", { x: RIGHT_X + 25, y: 185, class: "text-card-title", fill: "#818cf8" });
  
  let bars = "";
  for(let i=0; i<30; i++) {
    const h = 10 + Math.random() * 35;
    const delay = 1.0 + (i * 0.03); // Staggered growth
    bars += `<rect x="${RIGHT_X + 25 + i*11.5}" y="${235 - h}" width="7" height="${h}" rx="2" fill="url(#node-border)" opacity="${0.4 + (h/45)*0.6}" class="anim-bar" style="animation-delay: ${delay}s;" />`;
  }
  svg.addRaw(bars);
  svg.addText(stats.total_commits.toLocaleString(), { x: RIGHT_X + 25, y: 295, class: "text-metric-val" });
  svg.addText("Total Commits", { x: RIGHT_X + 25, y: 315, class: "text-sm" });
  svg.addText(stats.public_repos.toString(), { x: RIGHT_X + 180, y: 295, class: "text-metric-val" });
  svg.addText("Public Repos", { x: RIGHT_X + 180, y: 315, class: "text-sm" });
  svg.addGroup(`</g>`);

  // Card 2: Contributions (Fades up at 1.2s)
  svg.addGroup(`<g class="seq-fade-up" style="animation-delay: 1.2s;">`);
  svg.addPremiumCard(RIGHT_X, 350, RIGHT_W, 200);
  svg.addText("CONTRIBUTIONS", { x: RIGHT_X + 25, y: 385, class: "text-card-title", fill: "#c084fc" });
  
  let grid = "";
  for(let col=0; col<22; col++) {
    for(let row=0; row<5; row++) {
      const isActivity = Math.random() > 0.35;
      const opacity = isActivity ? (0.3 + Math.random()*0.7) : 0.05;
      const color = isActivity ? "#818cf8" : "#ffffff";
      grid += `<rect x="${RIGHT_X + 25 + col*16}" y="${410 + row*16}" width="11" height="11" rx="2" fill="${color}" opacity="${opacity}" />`;
    }
  }
  svg.addRaw(grid);
  svg.addText("This Year", { x: RIGHT_X + 25, y: 520, class: "text-sm" });
  svg.addText("3,842", { x: RIGHT_X + 25, y: 540, font_family: svg.fontUI, "font-size": "20px", fill: "#fff" });
  svg.addText("Lifetime", { x: RIGHT_X + 150, y: 520, class: "text-sm" });
  svg.addText("12,619", { x: RIGHT_X + 150, y: 540, font_family: svg.fontUI, "font-size": "20px", fill: "#fff" });
  svg.addGroup(`</g>`);

  // Card 3: Technologies (Fades up at 1.4s)
  svg.addGroup(`<g class="seq-fade-up" style="animation-delay: 1.4s;">`);
  svg.addPremiumCard(RIGHT_X, 570, RIGHT_W, 230);
  svg.addText("TOP TECHNOLOGIES", { x: RIGHT_X + 25, y: 605, class: "text-card-title", fill: "#38bdf8" });
  
  const techList = data?.languages?.length > 0 ? data.languages : [
    { name: "TypeScript", pct: "38%", w: 200 },
    { name: "JavaScript", pct: "24%", w: 130 },
    { name: "Python", pct: "15%", w: 90 },
    { name: "Dart", pct: "13%", w: 70 },
    { name: "SQL", pct: "10%", w: 50 }
  ];
  
  let techHtml = "";
  techList.slice(0, 5).forEach((t, i) => {
    const y = 640 + i * 32;
    const delay = 1.4 + (i * 0.15); // Staggered progress bars
    techHtml += `
      <text x="${RIGHT_X + 25}" y="${y+10}" class="text-sm" fill="#e2e8f0" font-weight="500">${t.name}</text>
      <rect x="${RIGHT_X + 120}" y="${y+4}" width="200" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
      <g style="clip-path: inset(0 0 0 0);">
        <rect x="${RIGHT_X + 120}" y="${y+4}" width="${t.w}" height="6" rx="3" fill="url(#node-border)" class="anim-progress" style="animation-delay: ${delay}s;" />
      </g>
      <text x="${RIGHT_X + 375}" y="${y+10}" class="text-sm" fill="#818cf8" text-anchor="end" font-weight="600">${t.pct}</text>
    `;
  });
  svg.addRaw(techHtml);
  svg.addGroup(`</g>`);

  // --- BOTTOM PANELS (Fade up at 1.6s) ---
  svg.addGroup(`<g class="seq-fade-up" style="animation-delay: 1.6s;">`);
  // Featured Projects
  svg.addPremiumCard(HERO_X, 715, 380, 155);
  svg.addText("FEATURED PROJECTS", { x: HERO_X + 25, y: 745, class: "text-card-title" });
  
  const projCard = (x, title, sub) => `
    <rect x="${x}" y="765" width="105" height="85" rx="8" fill="rgba(255,255,255,0.02)" stroke="url(#node-border)" stroke-width="0.5" />
    <text x="${x + 12}" y="810" font-family="${svg.fontUI}" font-size="14px" font-weight="500" fill="#fff">${title.substring(0, 10)}${title.length > 10 ? '.' : ''}</text>
    <text x="${x + 12}" y="830" class="text-sm" font-size="10px">${sub ? sub.substring(0, 13) + (sub.length > 13 ? '...' : '') : ''}</text>
  `;
  const projData = data?.featured_projects?.length > 0 ? data.featured_projects : [
    { name: "OS Core", description: "Vector Engine" },
    { name: "Bulk Up", description: "AI Analytics" },
    { name: "Automation", description: "API Hooks" }
  ];
  
  // Create safe fallbacks in case user has < 3 projects
  const p1 = projData[0] || { name: "System", description: "Core Architecture" };
  const p2 = projData[1] || { name: "Network", description: "Neural pathways" };
  const p3 = projData[2] || { name: "Interface", description: "User experience" };
  
  svg.addRaw(projCard(HERO_X + 25, p1.name, p1.description));
  svg.addRaw(projCard(HERO_X + 145, p2.name, p2.description));
  svg.addRaw(projCard(HERO_X + 265, p3.name, p3.description));

  // Journey Timeline
  svg.addPremiumCard(HERO_X + 400, 715, RIGHT_X - HERO_X - 420, 155);
  svg.addText("JOURNEY TIMELINE", { x: HERO_X + 425, y: 745, class: "text-card-title" });
  
  const tl = (x, year, title) => `
    <text x="${x}" y="780" font-family="${svg.fontUI}" font-size="12px" fill="#818cf8" font-weight="600">${year}</text>
    <circle cx="${x + 15}" cy="800" r="4" fill="#0A0A0A" stroke="#c084fc" stroke-width="2" />
    <line x1="${x + 15}" y1="805" x2="${x + 15}" y2="835" stroke="url(#node-border)" stroke-width="1.5" />
    <text x="${x + 30}" y="804" font-family="${svg.fontUI}" font-size="13px" font-weight="500" fill="#fff">${title}</text>
  `;
  svg.addRaw(`
    ${tl(HERO_X + 425, "2025", "Creative Mind OS")}
    ${tl(HERO_X + 600, "2024", "AI &amp; Automation")}
    ${tl(HERO_X + 775, "2023", "Mobile Architecture")}
  `);
  svg.addGroup(`</g>`);

  return svg.toString();
}

module.exports = renderMasterDashboard;
