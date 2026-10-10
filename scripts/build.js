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
    const outputPath = path.join(ASSETS_DIR, "senior_dashboard.svg");
    fs.writeFileSync(outputPath, svgContent, "utf8");
    console.log(`  [OK] Rendered senior_dashboard.svg (${(svgContent.length / 1024).toFixed(2)} KB)`);
  } catch (err) {
    console.error(`  [FAIL] Error rendering Master Dashboard:`, err);
    return;
  }

  // 4. Construct master README.md
  console.log("[Build] Assembling master README.md...");
  const timestamp = new Date().toUTCString();
  
  const readmeContent = `# ⚡ Nicolas Maial // Software Engineer & Systems Architect

<p align="center">
  <img alt="Creative Mind OS 360 Matrix" src="assets/senior_dashboard.svg?v=${Date.now()}" width="100%">
</p>

<p align="center">
  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:nicolasgmaial@hotmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://github.com/ikkimai?tab=repositories"><img src="https://img.shields.io/badge/Repositories-10B981?style=for-the-badge&logo=github&logoColor=white" alt="Repositories" /></a>
</p>

---

### 🧠 Executive Overview

Software Engineer & Systems Architect based in **Santo André, SP - Brazil**. Focused on reliable backend services, RESTful APIs, clean architecture, and vector graphics automation engines.

- 🔭 **Current Focus:** Enterprise Spring Boot services, Node.js engines, automated pipelines and media processing scripts.
- ⚡ **Engineering Principles:** Clean Code, Separation of Concerns, Domain-Driven Design (DDD), automated CI/CD.
- 🎯 **Availability:** Open for Software Engineering & Backend opportunities (Remote & Hybrid).

---

### 🛠️ Technical Competence Matrix

<table>
  <tr>
    <td width="50%" valign="top">
      <h4>☕ Backend & Systems Architecture</h4>
      <ul>
        <li><b>Languages:</b> Java 17/21, JavaScript (ES6+), Python, SQL</li>
        <li><b>Frameworks:</b> Spring Boot, Spring Data JPA, Spring Security, Express, Node.js</li>
        <li><b>Databases:</b> PostgreSQL, MySQL, H2 Database</li>
        <li><b>Architecture:</b> RESTful APIs, Clean Architecture, MVC, Microservices</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h4>🌐 Web, Automation & DevOps</h4>
      <ul>
        <li><b>Frontend:</b> HTML5, CSS3, JavaScript, Responsive UI</li>
        <li><b>DevOps & CI/CD:</b> GitHub Actions, Git, Docker, Automated Telemetry</li>
        <li><b>Tools & Testing:</b> Maven, Postman, JUnit, Fast-XML-Parser</li>
        <li><b>Specialization:</b> Vector Graphics (SVG Engines), Media Automation</li>
      </ul>
    </td>
  </tr>
</table>

---

### 🚀 Verified Repository Nodes (Quadro 360)

<table>
  <thead>
    <tr>
      <th>Repository</th>
      <th>Stack & Domain</th>
      <th>Architectural Summary</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b><a href="https://github.com/ikkimai/Sales-API">Sales-API</a></b></td>
      <td><code>Java / Spring Boot</code></td>
      <td>API REST robusta para processamento e controle de vendas, relatórios analíticos por vendedor e persistência estruturada.</td>
      <td><code>Production Ready</code></td>
    </tr>
    <tr>
      <td><b><a href="https://github.com/ikkimai/ikkimai">Creative Mind OS Engine</a></b></td>
      <td><code>JavaScript / Node.js</code></td>
      <td>Engine de computação gráfica vetorial zero-dependency orquestrando perfil autônomo com sincronização em tempo real via GitHub Actions.</td>
      <td><code>Live 360 Engine</code></td>
    </tr>
    <tr>
      <td><b><a href="https://github.com/ikkimai/ytb_down">ytb_down</a></b></td>
      <td><code>Python / HTML</code></td>
      <td>Script e pipeline de automação para download e extração de áudio e vídeo com interface direta.</td>
      <td><code>Active Utility</code></td>
    </tr>
  </tbody>
</table>

---

### 📈 Real-Time Engine Telemetry

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=ikkimai&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" width="48%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=ikkimai&theme=tokyonight&hide_border=true" width="48%" />
</p>

---

<p align="center">
  <i>⚡ Dynamic profile telemetry generated automatically by GitHub Actions and a custom Node.js vector graphics engine.</i><br>
  <i>Heartbeat Sync: ${timestamp}</i>
</p>
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
