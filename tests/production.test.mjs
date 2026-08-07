import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";

const port = 3217;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
let server;
let serverOutput = "";

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`El servidor de prueba no inició.\n${serverOutput}`);
}

before(async () => {
  server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });
  await waitForServer();
});

after(() => {
  server?.kill();
});

test("la página principal incluye SEO y datos estructurados", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="es-PY">/);
  assert.match(html, /<title>tustareas\.py \| Asesoría académica online<\/title>/);
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /ProfessionalService/);
  assert.match(html, /Tu meta académica/);
});

test("la respuesta aplica cabeceras de seguridad", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
});

test("robots y sitemap son accesibles", async () => {
  const [robots, sitemap] = await Promise.all([fetch(`${baseUrl}/robots.txt`), fetch(`${baseUrl}/sitemap.xml`)]);
  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  assert.match(await robots.text(), /Sitemap:/);
  assert.match(await sitemap.text(), /<urlset/);
});

test("el video se sirve con caché inmutable", async () => {
  const response = await fetch(`${baseUrl}/hero-tutoring-library-hd.mp4`, { method: "HEAD" });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control") ?? "", /max-age=31536000/);
});

