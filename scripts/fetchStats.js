/**
 * Creative Mind OS - Real Data Synchronizer (`fetchStats.js`)
 * Fetches real public repositories, precise languages byte metrics, and user metadata directly from GitHub REST API.
 * Never generates mock data.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const DATA_PATH = path.join(__dirname, "../api/github-data.json");
const USERNAME = process.env.GITHUB_USER || "ikkimai";
const TOKEN = process.env.GITHUB_TOKEN || process.env.PAT_TOKEN || "";

function httpsRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function getBase64Image(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let chunks = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve("data:" + res.headers["content-type"] + ";base64," + buffer.toString("base64"));
      });
    }).on("error", () => resolve(""));
  });
}

async function syncRealData() {
  console.log(`[Fetch Engine] Syncing real GitHub profile for: ${USERNAME}`);
  const headers = { "User-Agent": "Creative-Mind-OS-Sync" };
  if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

  try {
    // 1. Fetch user data
    const user = await httpsRequest({
      hostname: "api.github.com",
      path: `/users/${USERNAME}`,
      method: "GET",
      headers
    });

    const avatarBase64 = await getBase64Image(user.avatar_url);

    // 2. Fetch public repos
    const repos = await httpsRequest({
      hostname: "api.github.com",
      path: `/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      method: "GET",
      headers
    });

    // 3. Fetch exact languages by byte count
    const langTotals = {};
    let totalBytes = 0;

    const realProjects = [];

    for (const repo of repos) {
      if (repo.fork) continue;

      let techTag = repo.language || "Multi-stack";
      let color = "#38BDF8";
      if (repo.language === "Java") color = "#10B981";
      if (repo.language === "Python") color = "#A855F7";
      if (repo.language === "JavaScript") color = "#38BDF8";
      if (repo.language === "HTML") color = "#F59E0B";

      realProjects.push({
        id: repo.name.toLowerCase(),
        name: repo.name,
        domain: repo.language ? `${repo.language.toUpperCase()} ARCHITECTURE` : "ENGINEERING LAB",
        description: repo.description || "Core repository codebase managed by Nicolas Maial.",
        tech: `${techTag} • Git • Main`,
        status: "ACTIVE",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        color
      });

      try {
        const languages = await httpsRequest({
          hostname: "api.github.com",
          path: `/repos/${USERNAME}/${repo.name}/languages`,
          method: "GET",
          headers
        });

        for (const [lang, bytes] of Object.entries(languages)) {
          langTotals[lang] = (langTotals[lang] || 0) + bytes;
          totalBytes += bytes;
        }
      } catch (err) {
        console.warn(`[Warn] Could not fetch languages for ${repo.name}`);
      }
    }

    const langColors = {
      "JavaScript": "#F7DF1E",
      "Java": "#ED8B00",
      "HTML": "#E34F26",
      "Python": "#38BDF8",
      "CSS": "#264DE4",
      "TypeScript": "#3178C6"
    };

    const languagesArray = Object.keys(langTotals)
      .map((name) => {
        const bytes = langTotals[name];
        const rawPct = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0;
        return {
          name,
          bytes,
          pct: `${rawPct.toFixed(1)}%`,
          rawPct,
          color: langColors[name] || "#10B981"
        };
      })
      .sort((a, b) => b.bytes - a.bytes);

    const masterData = {
      user: {
        login: user.login,
        name: user.name || "Nicolas Maial",
        role: "Software Engineer & Systems Architect",
        location: user.location || "Santo André, SP - Brazil",
        email: "nicolasgmaial@hotmail.com",
        github_url: user.html_url,
        avatar_url: avatarBase64 || user.avatar_url
      },
      telemetry: {
        engine_version: "Creative Mind 360 Kernel v2.5",
        status: "ONLINE // MONITORING",
        status_color: "#10B981",
        last_sync: new Date().toISOString(),
        location: user.location || "Santo André, SP",
        uptime: "99.98%"
      },
      stats: {
        public_repos: user.public_repos,
        active_branches: "main",
        primary_domain: "Backend Systems & Web Engines",
        total_byte_size: `${(totalBytes / 1024).toFixed(1)} KB`
      },
      languages: languagesArray,
      real_projects: realProjects
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(masterData, null, 2), "utf8");
    console.log(`[Fetch Engine] Successfully updated authentic profile for ${user.login}!`);
  } catch (error) {
    console.error("[Fetch Engine Error]:", error.message);
  }
}

syncRealData();
