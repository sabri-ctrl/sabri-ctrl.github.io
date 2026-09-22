import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  addCustomProjectsToAppScript,
  addCustomProjectsToHtml,
} from "./project-customizations.mjs";

const sourceOrigin = "https://abdullah-abbas-portfolio.lovable.app";

const downloads = {
  "work/lovable/index-original.html": `${sourceOrigin}/`,
  "assets/styles-Dtw_Dlqv.css": `${sourceOrigin}/assets/styles-Dtw_Dlqv.css`,
  "assets/index-CbOx-5u3.js": `${sourceOrigin}/assets/index-CbOx-5u3.js`,
  "assets/index-DaL05lpB.js": `${sourceOrigin}/assets/index-DaL05lpB.js`,
  "images/machined-assembly.jpg": `${sourceOrigin}/__l5e/assets-v1/a39f2aaa-4285-4d78-a188-51cdeab37094/machined-assembly.jpg`,
  "images/motor-reverse.jpg": `${sourceOrigin}/__l5e/assets-v1/313fc36d-c456-4b3e-bb06-3791310b07c2/motor-reverse.jpg`,
  "images/heading-boat.png": `${sourceOrigin}/__l5e/assets-v1/d7591b27-e8c7-4274-adc7-0ab6fc972725/heading-boat.png`,
  "images/balloon-car.png": `${sourceOrigin}/__l5e/assets-v1/a3cece32-e8bc-4b5e-963d-f454c1bafffe/balloon-car.png`,
  "images/garden-guardian.png": `${sourceOrigin}/__l5e/assets-v1/a0193c6e-61ff-4f68-9777-8dbfa75be0b6/garden-guardian.png`,
};

const imageRewrites = new Map([
  ["/__l5e/assets-v1/a39f2aaa-4285-4d78-a188-51cdeab37094/machined-assembly.jpg", "./images/machined-assembly.jpg"],
  ["/__l5e/assets-v1/313fc36d-c456-4b3e-bb06-3791310b07c2/motor-reverse.jpg", "./images/motor-reverse.jpg"],
  ["/__l5e/assets-v1/d7591b27-e8c7-4274-adc7-0ab6fc972725/heading-boat.png", "./images/heading-boat.png"],
  ["/__l5e/assets-v1/a3cece32-e8bc-4b5e-963d-f454c1bafffe/balloon-car.png", "./images/balloon-car.png"],
  ["/__l5e/assets-v1/a0193c6e-61ff-4f68-9777-8dbfa75be0b6/garden-guardian.png", "./images/garden-guardian.png"],
]);

async function download(relativePath, url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const body = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(relativePath), { recursive: true });
  await writeFile(relativePath, body);
  console.log(`Downloaded ${relativePath} (${body.length} bytes)`);
}

function rewriteSharedPaths(text) {
  let rewritten = text.replaceAll("/assets/", "./assets/");
  for (const [remotePath, localPath] of imageRewrites) {
    rewritten = rewritten.replaceAll(remotePath, localPath);
  }
  return rewritten;
}

await mkdir("work/lovable", { recursive: true });
await mkdir("assets", { recursive: true });
await mkdir("images", { recursive: true });

for (const [relativePath, url] of Object.entries(downloads)) {
  await download(relativePath, url);
}

let html = await readFile("work/lovable/index-original.html", "utf8");

html = html
  .replace(/<style>[\s\S]*?#lovable-badge[\s\S]*?<\/style>/, "")
  .replace(/<script defer src="\/~flock\.js"[^>]*><\/script>/, "")
  .replace(/\s*<aside\s+id="lovable-badge"[\s\S]*?<\/aside>\s*/, "")
  .replace(/<script>\s*\/\/ Don't show the lovable-badge[\s\S]*?<\/script>/, "")
  .replace(/<meta property="og:image"[^>]*\/>/, "")
  .replace(/<meta name="twitter:image"[^>]*\/>/, "")
  .replace('<meta name="author" content="Lovable"/>', '<meta name="author" content="Abdullah Abbas"/>')
  .replace('<meta name="twitter:site" content="@Lovable"/>', "")
  .replace('<meta name="twitter:title" content="Lovable App"/>', '<meta name="twitter:title" content="Abdullah Abbas — Mechanical Engineering Portfolio"/>')
  .replace("Hello Alex, ...", "Hello Abdullah, ...")
  .replace("<title>", '<link rel="icon" href="./favicon.svg" type="image/svg+xml"/><title>');

html = addCustomProjectsToHtml(rewriteSharedPaths(html));
await writeFile("index.html", html);

for (const scriptPath of ["assets/index-CbOx-5u3.js", "assets/index-DaL05lpB.js"]) {
  let source = await readFile(scriptPath, "utf8");
  source = rewriteSharedPaths(source)
    .replaceAll('"Lovable App"', '"Abdullah Abbas — Mechanical Engineering Portfolio"')
    .replaceAll('content:"Lovable"', 'content:"Abdullah Abbas"')
    .replaceAll(',{name:"twitter:site",content:"@Lovable"}', "")
    .replace(/,\{property:"og:image",content:"[^"]+"\},\{name:"twitter:image",content:"[^"]+"\}/, "")
    .replaceAll("Hello Alex, ...", "Hello Abdullah, ...");
  if (scriptPath.endsWith("index-DaL05lpB.js")) {
    source = addCustomProjectsToAppScript(source);
  }
  await writeFile(scriptPath, source);
}

console.log("Created a clean, portable index.html without Lovable branding.");
