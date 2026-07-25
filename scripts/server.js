/**
 * Creative Mind OS - Local Live Preview & Simulation Server (`server.js`)
 * Serves index.html dashboard and dynamic API endpoints for real-time SVG engine testing.
 * Automatically clears require cache and sets no-cache headers so code edits reflect instantly.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname, "..");
const DATA_PATH = path.join(__dirname, "../api/github-data.json");
const PROJECTS_PATH = path.join(__dirname, "../api/projects.json");

const MIME_TYPES = {
  ".html": "text/html",
  ".svg": "image/svg+xml",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".md": "text/markdown"
};

/**
 * Dynamically loads build.js and clears require cache so code updates inside scripts/engine/
 * reflect immediately without restarting the server process.
 */
function runBuildClean() {
  const engineDir = path.join(__dirname, "engine");
  // Clear require cache for build.js and all modules inside engine/
  Object.keys(require.cache).forEach((key) => {
    if (key.includes("build.js") || key.includes("engine")) {
      delete require.cache[key];
    }
  });
  const freshBuild = require("./build");
  return freshBuild();
}

// Initial build on server startup
console.log("[Server] Initializing base vector graphics build...");
runBuildClean();

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  // API Endpoint: /api/rebuild
  if (url === "/api/rebuild" && req.method === "POST") {
    const start = Date.now();
    try {
      runBuildClean();
      const elapsed = Date.now() - start;
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" });
      res.end(JSON.stringify({ success: true, time: elapsed }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // API Endpoint: /api/simulate-commit
  if (url === "/api/simulate-commit" && req.method === "POST") {
    try {
      const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
      const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf8"));

      // Increment stats
      data.stats.total_commits += 12;
      data.stats.power_output_mw = parseFloat((data.stats.power_output_mw + 0.6).toFixed(1));

      // Increment top project commits & height
      if (projects.length > 0) {
        projects[0].commits += 12;
        if (projects[0].commits % 50 === 0) {
          projects[0].floors += 1;
          projects[0].height += 10;
        }
      }

      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
      fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2));

      // Rebuild graphics cleanly
      runBuildClean();

      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" });
      res.end(
        JSON.stringify({
          success: true,
          commits: data.stats.total_commits,
          mw: data.stats.power_output_mw
        })
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // Static File Serving with No-Cache header for live SVG updates
  let filePath = path.join(ROOT_DIR, url === "/" ? "index.html" : url);
  const ext = path.extname(filePath).toLowerCase();

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Server Error");
      } else {
        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
        });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log("==================================================");
  console.log(`   CREATIVE MIND OS SIMULATOR LIVE ON PORT ${PORT}`);
  console.log(`   👉 Open browser: http://localhost:${PORT}`);
  console.log("==================================================");
});
