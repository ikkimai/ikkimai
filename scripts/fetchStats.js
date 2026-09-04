/**
 * Creative Mind OS - Data Aggregation Engine (`fetchStats.js`)
 * Fetches real-time GitHub user stats securely using the GraphQL API.
 * Calculates accurate language bytes and exact commit counts.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const DATA_PATH = path.join(__dirname, "../api/github-data.json");

const USERNAME = process.env.GITHUB_USER || "ikkimai";
const TOKEN = process.env.GITHUB_TOKEN || process.env.PAT_TOKEN || "";

// Utility for HTTP requests
function httpsRequest(options, body) {
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
          reject(new Error(`GitHub API HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function fetchGraphQLData() {
  const query = `
    query userInfo($login: String!) {
      user(login: $login) {
        name
        login
        bio
        avatarUrl
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            isPrivate
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const options = {
    hostname: "api.github.com",
    path: "/graphql",
    method: "POST",
    headers: {
      "User-Agent": "Creative-Mind-OS-Engine",
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  const response = await httpsRequest(options, JSON.stringify({ query, variables: { login: USERNAME } }));
  if (response.errors) {
    throw new Error(JSON.stringify(response.errors));
  }
  return response.data.user;
}

async function fetchAllData() {
  console.log(`[Fetch Engine] Initiating secure data extraction for user: ${USERNAME}`);

  if (!TOKEN) {
    console.error("[Error] A GITHUB_TOKEN or PAT_TOKEN is required to fetch accurate GraphQL data. Please set it as an environment variable.");
    console.log("[Fetch Engine] Using existing mock data as fallback...");
    return;
  }

  try {
    const userData = await fetchGraphQLData();
    
    let totalStars = 0;
    let publicReposCount = 0;
    let privateReposCount = 0;
    const languageBytes = {};
    let totalBytes = 0;
    const featuredProjects = [];

    userData.repositories.nodes.forEach(repo => {
      if (repo.isPrivate) {
        privateReposCount++;
      } else {
        publicReposCount++;
        totalStars += repo.stargazerCount;
        
        // Add to featured projects if it has a description
        if (featuredProjects.length < 3 && repo.description) {
          featuredProjects.push({
            name: repo.name,
            description: repo.description.substring(0, 50) + (repo.description.length > 50 ? "..." : "")
          });
        }
      }

      // Aggregate languages
      if (repo.languages && repo.languages.edges) {
        repo.languages.edges.forEach(edge => {
          const langName = edge.node.name;
          const size = edge.size;
          languageBytes[langName] = (languageBytes[langName] || 0) + size;
          totalBytes += size;
        });
      }
    });

    // Calculate accurate language percentages
    const languagesArray = Object.keys(languageBytes)
      .map(lang => {
        const size = languageBytes[lang];
        const rawPct = totalBytes > 0 ? (size / totalBytes) * 100 : 0;
        return {
          name: lang,
          count: size, // now represents bytes
          rawPct: rawPct,
          pct: `${Math.round(rawPct)}%`,
          w: Math.round((rawPct / 100) * 200)
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 languages

    // True total commits this year (public + private restricted)
    const totalCommits = userData.contributionsCollection.totalCommitContributions + userData.contributionsCollection.restrictedContributionsCount;

    const masterData = {
      user: {
        login: userData.login,
        name: userData.name || userData.login,
        bio: userData.bio || "Software Engineer & Designer",
        avatar_url: userData.avatarUrl
      },
      stats: {
        total_commits: totalCommits,
        public_repos: publicReposCount,
        private_repos_secured: privateReposCount,
        stars_received: totalStars
      },
      languages: languagesArray,
      featured_projects: featuredProjects
    };

    // Save Unified File
    const apiDir = path.join(__dirname, "../api");
    if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);
    
    fs.writeFileSync(DATA_PATH, JSON.stringify(masterData, null, 2));
    
    console.log(`[Fetch Engine] Successfully pulled REAL GitHub data for ${userData.login}.`);
    console.log(`[Fetch Engine] Total Commits: ${totalCommits} | Stars: ${totalStars}`);
    
  } catch (error) {
    console.error("[Fetch Engine] Data retrieval failed:", error.message);
  }
}

fetchAllData();
