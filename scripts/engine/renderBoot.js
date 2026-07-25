/**
 * Creative Mind OS - Minimalist Premium Boot Sequence (`renderBoot.js`)
 * Generates an ultra-sleek, Stripe/Vercel styled initialization screen.
 */
const SVGBuilder = require("./svgBuilder");

function renderBoot(data) {
  const width = 800;
  const height = 150;
  const svg = new SVGBuilder(width, height);

  svg.addStyle(`
    .title { font-family: ${svg.fontUI}; font-size: 18px; font-weight: 600; fill: #ffffff; letter-spacing: -0.2px; }
    .subtitle { font-family: ${svg.fontUI}; font-size: 13px; font-weight: 400; fill: #888888; letter-spacing: 0px; }
    .status-text { font-family: ${svg.fontUI}; font-size: 11px; font-weight: 500; fill: #a3a3a3; letter-spacing: 0.5px; text-transform: uppercase; }
    
    @keyframes loadProgress {
      0% { width: 0px; }
      100% { width: 140px; }
    }
    .progress-fill { animation: loadProgress 2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  `);

  // Clear background
  svg.addRect({ x: 0, y: 0, width, height, fill: "transparent" });

  // Center a premium dark card
  const cardW = 600;
  const cardH = 90;
  const cardX = (width - cardW) / 2;
  const cardY = (height - cardH) / 2;
  
  svg.addPremiumCard(cardX, cardY, cardW, cardH, 12);

  // Content
  const userLogin = data?.user?.login || "Nicolas";
  
  // Left side: Text
  svg.addText("Creative Mind Core", { x: cardX + 30, y: cardY + 40, class: "title" });
  svg.addText(`Initializing workspace for ${userLogin}`, { x: cardX + 30, y: cardY + 62, class: "subtitle" });

  // Right side: Progress Bar
  const barX = cardX + 410;
  const barY = cardY + 48;
  const barW = 140;
  
  svg.addText("SYSTEM ONLINE", { x: barX, y: barY - 14, class: "status-text" });
  
  // Track
  svg.addRect({ x: barX, y: barY, width: barW, height: 2, fill: "#222222", rx: 1 });
  // Fill
  svg.addRect({ x: barX, y: barY, width: barW, height: 2, fill: "#ffffff", rx: 1, class: "progress-fill" });

  return svg.toString();
}

module.exports = renderBoot;
