/**
 * Creative Mind OS - Master Build Orchestrator (`build.js`)
 * Compiles data models from api/, renders the unified Master Dashboard SVG into assets/,
 * and automatically constructs the master README.md file.
 */
const fs = require("fs");
const path = require("path");

// Import the unified master renderer
const renderMasterDashboard = require("./engine/renderMasterDashboard");

const API_DIR = path.join(__dirname, "../api");
const ASSETS_DIR = path.join(__dirname, "../assets");
const README_PATH = path.join(__dirname, "../README.md");

function loadJSON(filename) {
  const filepath = path.join(API_DIR, filename);
  if (!fs.existsSync(filepath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf8"));
  } catch (err) {
    console.error(`[Build Error] Failed to parse ${filename}:`, err.message);
    return null;
  }
}

function build() {
  console.log("==================================================");
  console.log("   CREATIVE MIND OS // MASTER VECTOR ENGINE BUILD ");
  console.log("==================================================");

  // 1. Ensure assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
    console.log("[Build] Created assets directory.");
  }

  // 2. Load API data
  console.log("[Build] Loading system data layers from api/...");
  const githubData = loadJSON("github-data.json") || {};
  const projectsData = loadJSON("projects.json") || [];
  const timelineData = loadJSON("timeline.json") || [];
  const quotesData = loadJSON("quotes.json") || [];

  // Unified data payload
  const dashboardData = {
    user: githubData.user,
    stats: githubData.stats,
    languages: githubData.languages,
    featured_projects: githubData.featured_projects,
    projects: projectsData,
    timeline: timelineData,
    quotes: quotesData
  };

  // 3. Render Master SVG
  console.log("[Build] Compiling master vector graphics module...");
  let svgContent = "";
  try {
    svgContent = renderMasterDashboard(dashboardData);
    const outputPath = path.join(ASSETS_DIR, "creative_mind_dashboard.svg");
    fs.writeFileSync(outputPath, svgContent, "utf8");
    console.log(`  [OK] Rendered creative_mind_dashboard.svg (${(svgContent.length / 1024).toFixed(2)} KB)`);
  } catch (err) {
    console.error(`  [FAIL] Error rendering Master Dashboard:`, err);
    return;
  }

  // 4. Construct master README.md
  console.log("[Build] Assembling master README.md...");
  const timestamp = new Date().toUTCString();
  
  const readmeContent = `# Creative Mind

<p align="center">
  <img alt="Creative Mind OS Master Dashboard" src="assets/creative_mind_dashboard.svg?v=${Date.now()}" width="100%">
</p>

<!-- Last Rendered: ${timestamp} -->
`;

  fs.writeFileSync(README_PATH, readmeContent, "utf8");
  console.log(`[Build] Master README.md successfully compiled (${(readmeContent.length / 1024).toFixed(2)} KB).`);
  console.log("==================================================");
  console.log("             BUILD COMPLETED SUCCESSFULLY         ");
  console.log("==================================================");
}

module.exports = build;

// If script is run directly, execute build
if (require.main === module) {
  build();
}
