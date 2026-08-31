/**
 * Upload tmp/vsl-hls to the private R2 bucket via wrangler.
 * The Worker on media.brandmultiplier.ai is the only public path.
 *
 * Required once:
 *   npx wrangler login
 *   npx wrangler r2 bucket create bm-video
 *
 * Then:
 *   node scripts/upload-vsl-r2.mjs
 *
 * Env overrides:
 *   R2_BUCKET   default bm-video
 *   R2_PREFIX   default vsl
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BUCKET = process.env.R2_BUCKET || "bm-video";
const PREFIX = process.env.R2_PREFIX || "vsl";
const SRC = path.join(process.cwd(), "tmp", "vsl-hls");

const TYPES = {
  ".m3u8": "application/vnd.apple.mpegurl",
  ".ts": "video/mp2t",
  ".m4s": "video/iso.segment",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

if (!fs.existsSync(SRC)) {
  console.error(`Nothing to upload at ${SRC}. Run node scripts/encode-vsl.mjs first.`);
  process.exit(1);
}

const files = walk(SRC);
if (files.length === 0) {
  console.error(`No files under ${SRC}`);
  process.exit(1);
}

function wrangler(args) {
  return spawnSync("npx", ["wrangler", ...args], {
    stdio: "inherit",
    shell: true,
  });
}

function putWithRetry(key, file, contentType, attempts = 5) {
  for (let i = 1; i <= attempts; i += 1) {
    const result = wrangler([
      "r2",
      "object",
      "put",
      `${BUCKET}/${key}`,
      "--file",
      file,
      "--content-type",
      contentType,
      "--remote",
    ]);
    if (result.status === 0) return;
    console.warn(`Retry ${i}/${attempts} for ${key}`);
    spawnSync("powershell", ["-Command", `Start-Sleep -Seconds ${i * 2}`], {
      stdio: "ignore",
    });
  }
  throw new Error(`Failed uploading ${key}`);
}

console.log(`Ensuring bucket ${BUCKET} exists...`);
wrangler(["r2", "bucket", "create", BUCKET]);

for (const file of files) {
  const rel = path.relative(SRC, file).replaceAll(path.sep, "/");
  const key = `${PREFIX}/${rel}`;
  const ext = path.extname(file).toLowerCase();
  const contentType = TYPES[ext] || "application/octet-stream";
  console.log(`put ${key} (${contentType})`);
  putWithRetry(key, file, contentType);
}

console.log(`Uploaded ${files.length} objects to r2://${BUCKET}/${PREFIX}/`);
console.log(
  "Deploy the origin-check worker: npx wrangler deploy --config workers/media-guard/wrangler.toml",
);
