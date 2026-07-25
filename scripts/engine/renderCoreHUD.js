/**
 * Creative Mind OS - Elegant Premium Profile HUD (`renderCoreHUD.js`)
 * Generates an ultra-clean, minimal Stripe/Vercel styled profile dashboard.
 */
const SVGBuilder = require("./svgBuilder");

function renderCoreHUD(data) {
  const width = 800;
  const height = 180;
  const svg = new SVGBuilder(width, height);

  svg.addStyle(`
    .hud-title { font-family: ${svg.fontUI}; font-size: 24px; font-weight: 600; fill: #ffffff; letter-spacing: -0.5px; }
    .hud-subtitle { font-family: ${svg.fontUI}; font-size: 14px; font-weight: 400; fill: #888888; }
    
    .metric-val { font-family: ${svg.fontUI}; font-size: 22px; font-weight: 600; fill: #ffffff; letter-spacing: -0.5px; }
    .metric-label { font-family: ${svg.fontUI}; font-size: 11px; font-weight: 500; fill: #666666; text-transform: uppercase; letter-spacing: 0.5px; }
    
    .avatar-text { font-family: ${svg.fontUI}; font-size: 28px; font-weight: 500; fill: #ffffff; }
  `);

  // Clear background
  svg.addRect({ x: 0, y: 0, width, height, fill: "transparent" });

  // Main Premium Card
  const cardW = 760;
  const cardH = 140;
  const cardX = 20;
  const cardY = 20;
  
  svg.addPremiumCard(cardX, cardY, cardW, cardH, 16);

  // Left Section: Profile Info
  const user = data?.user || { login: "Nicolas", name: "Nicolas", bio: "Software Engineer & Designer" };
  
  // Clean minimal avatar
  svg.addCircle({ cx: cardX + 60, cy: cardY + 70, r: 36, fill: "#111111", stroke: "#222222", "stroke-width": 1 });
  svg.addText((user.name || user.login).charAt(0).toUpperCase(), { x: cardX + 60, y: cardY + 79, class: "avatar-text", "text-anchor": "middle" });

  svg.addText(user.name || user.login, { x: cardX + 120, y: cardY + 62, class: "hud-title" });
  svg.addText(user.bio || "Crafting digital experiences.", { x: cardX + 120, y: cardY + 86, class: "hud-subtitle" });

  // Right Section: Elegant Metric Cards
  const stats = data?.stats || { total_commits: 1520, public_repos: 28, stars_received: 342 };
  
  const createMetric = (x, y, label, value) => {
    svg.addGroup(`
      <text x="${x}" y="${y}" class="metric-label">${label}</text>
      <text x="${x}" y="${y + 26}" class="metric-val">${value}</text>
    `);
  };

  createMetric(cardX + 460, cardY + 54, "Total Commits", stats.total_commits || 1520);
  createMetric(cardX + 570, cardY + 54, "Public Repos", stats.public_repos || 28);
  createMetric(cardX + 680, cardY + 54, "Total Stars", stats.stars_received || 342);

  // Subtle vertical dividers between metrics
  svg.addRect({ x: cardX + 540, y: cardY + 50, width: 1, height: 32, fill: "#222222" });
  svg.addRect({ x: cardX + 650, y: cardY + 50, width: 1, height: 32, fill: "#222222" });

  return svg.toString();
}

module.exports = renderCoreHUD;
