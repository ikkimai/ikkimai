/**
 * Creative Mind OS - Planetary Tech Matrix Globe (`renderTechGlobe.js`)
 * Generates a sleek, isometric/perspective tech matrix ring orbiting Earth with authentic system typography.
 */
const SVGBuilder = require("./svgBuilder");

function renderTechGlobe(data) {
  const width = 800;
  const height = 400;
  const svg = new SVGBuilder(width, height);

  svg.addFilterGlow("globe-glow", "#38bdf8", 4);
  svg.addDropShadow("globe-shadow", 8, 20, 0.45);
  svg.addGridPattern("globe-grid", 32, "#1e293b", 0.35);
  svg.addLinearGradient("globe-bg", "#0b1120", "#040711");

  svg.addStyle(`
    .globe-title { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 700; fill: #f8fafc; letter-spacing: 2px; }
    .globe-sub { font-family: ${svg.fontCode}; font-size: 11px; fill: #64748b; letter-spacing: 1px; }
    .node-text { font-family: ${svg.fontUI}; font-size: 11px; font-weight: 700; fill: #f8fafc; text-anchor: middle; }
    .node-category { font-family: ${svg.fontCode}; font-size: 8px; font-weight: 600; fill: #38bdf8; text-anchor: middle; }
    
    @keyframes orbitRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulseBeam {
      0%, 100% { stroke-opacity: 0.8; stroke-width: 1.5px; }
      50% { stroke-opacity: 0.2; stroke-width: 1px; }
    }
    .orbit-path { transform-origin: 400px 210px; animation: orbitRotate 40s linear infinite; }
    .laser-beam { animation: pulseBeam 3s infinite ease-in-out; }
  `);

  svg.addGlassCard(10, 10, 780, 380, 16, "url(#globe-bg)", "#1e293b", "#38bdf8", "globe-shadow");
  svg.addRect({ x: 10, y: 10, width: 780, height: 380, fill: "url(#globe-grid)", rx: 16 });

  // Header
  svg.addText("PLANETARY TECH MATRIX // GLOBAL NEURAL NODES", { x: 38, y: 44, class: "globe-title" });
  svg.addText("CORE ARCHITECTURAL STACK & INFRASTRUCTURE RINGS", { x: 38, y: 62, class: "globe-sub" });

  // Central Earth Core
  const cx = 400;
  const cy = 210;
  svg.addGroup(`
    <circle cx="${cx}" cy="${cy}" r="64" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <circle cx="${cx}" cy="${cy}" r="54" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="10 8" />
    <circle cx="${cx}" cy="${cy}" r="38" fill="#111f38" stroke="#38bdf8" stroke-width="1" />
    <circle cx="${cx}" cy="${cy}" r="18" fill="#38bdf8" filter="url(#globe-glow)" />
    <text x="${cx}" y="${cy + 4}" font-family="${svg.fontUI}" font-size="10px" font-weight="800" fill="#0f172a" text-anchor="middle">CORE</text>
  `);

  // Orbiting Tech Nodes
  const nodes = [
    { name: "TypeScript", cat: "FRONTEND CORE", color: "#38bdf8", angle: 0, dist: 135 },
    { name: "Node.js", cat: "BACKEND ENGINE", color: "#10b981", angle: 45, dist: 145 },
    { name: "Python", cat: "AI & DATA LAB", color: "#fbbf24", angle: 90, dist: 130 },
    { name: "Flutter", cat: "MOBILE ARCH", color: "#38bdf8", angle: 135, dist: 150 },
    { name: "Docker", cat: "CONTAINER GRID", color: "#60a5fa", angle: 180, dist: 135 },
    { name: "AWS Cloud", cat: "INFRA MATRIX", color: "#f97316", angle: 225, dist: 145 },
    { name: "React / Next", cat: "WEB PROTOCOL", color: "#38bdf8", angle: 270, dist: 130 },
    { name: "PostgreSQL", cat: "DATABASE CORE", color: "#a855f7", angle: 315, dist: 150 }
  ];

  let nodesGroup = "";
  nodes.forEach((n, idx) => {
    const rad = (n.angle * Math.PI) / 180;
    const nx = cx + Math.cos(rad) * n.dist;
    const ny = cy + Math.sin(rad) * (n.dist * 0.72); // Elliptical 3D perspective

    // Connecting laser ray
    nodesGroup += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${n.color}" stroke-width="1.2" class="laser-beam" style="animation-delay: ${idx * 0.3}s" />`;
    // Tech node card
    nodesGroup += `
      <rect x="${nx - 46}" y="${ny - 18}" width="92" height="36" rx="6" fill="#0f172a" stroke="${n.color}" stroke-width="1.5" />
      <text x="${nx}" y="${ny - 2}" class="node-text">${n.name}</text>
      <text x="${nx}" y="${ny + 11}" class="node-category" fill="${n.color}">${n.cat}</text>
    `;
  });

  svg.addGroup(nodesGroup);
  return svg.toString();
}

module.exports = renderTechGlobe;
