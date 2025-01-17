import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const pagesDir = path.join(__dirname, "src", "pages");
const publicDir = path.join(__dirname, "public");
const baseUrl = "https://gaiact.org";

let urls = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath);
    } else if (path.extname(file) === ".astro") {
      let route = filepath.replace(pagesDir, "").replace(".astro", "");
      if (route === "/index") route = "/";
      urls.push(`${baseUrl}${route}`);
    }
  });
}

walkDir(pagesDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log("sitemap.xml generated successfully.");
