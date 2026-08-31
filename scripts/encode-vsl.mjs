/**
 * Encode the VSL master to an HLS ladder.
 *
 * Probe first (prints file size + bitrate at 2:55 and 3:43 stills):
 *   node scripts/encode-vsl.mjs --probe
 *
 * Full encode:
 *   node scripts/encode-vsl.mjs
 *
 * Looks for the master at, in order:
 *   %VSL_MASTER%
 *   C:\Users\user\Downloads\VSL\BrandMultiplier_VSL_final-cut_final.mp4
 *   C:\Users\user\Videos\vsl\BrandMultiplier_VSL_final-cut_final.mp4
 *
 * Output: tmp/vsl-hls/{master.m3u8, v1080/, v720/, v480/}
 * Poster: public/vsl/poster.webp (from VSL thumbnail v2.png if present)
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CANDIDATES = [
  process.env.VSL_MASTER,
  "C:\\Users\\user\\Downloads\\VSL\\BrandMultiplier_VSL_final-cut_final.mp4",
  "C:\\Users\\user\\Videos\\vsl\\BrandMultiplier_VSL_final-cut_final.mp4",
  path.join(process.cwd(), "BrandMultiplier_VSL_final-cut_final.mp4"),
].filter(Boolean);

const THUMB_CANDIDATES = [
  "C:\\Users\\user\\Downloads\\VSL\\VSL thumbnail v2.png",
  "C:\\Users\\user\\Downloads\\VSL thumbnail v2.png",
];

const OUT_DIR = path.join(process.cwd(), "tmp", "vsl-hls");
const POSTER_DEST = path.join(process.cwd(), "public", "vsl", "poster.webp");
const CRF = process.env.VSL_CRF || "23";
const isProbe = process.argv.includes("--probe");

function findFile(list) {
  return list.find((file) => fs.existsSync(file)) ?? null;
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: false,
    ...opts,
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with ${result.status}`);
  }
}

function ffmpegBin() {
  const which = spawnSync(process.platform === "win32" ? "where" : "which", ["ffmpeg"], {
    encoding: "utf8",
    shell: true,
  });
  if (which.status === 0) {
    const first = which.stdout.trim().split(/\r?\n/)[0];
    if (first) return first;
  }
  return "ffmpeg";
}

function ffmpegAvailable() {
  const result = spawnSync(ffmpegBin(), ["-version"], { stdio: "pipe" });
  return result.status === 0;
}

const master = findFile(CANDIDATES);
if (!master) {
  console.error(
    "Master MP4 not found. Place BrandMultiplier_VSL_final-cut_final.mp4 in Downloads\\VSL or set VSL_MASTER.",
  );
  process.exit(isProbe ? 0 : 1);
}

if (!ffmpegAvailable()) {
  console.error("ffmpeg not found. Install with: winget install Gyan.FFmpeg");
  process.exit(isProbe ? 0 : 1);
}

if (isProbe) {
  const probes = [
    { label: "1080-crf20", args: ["-vf", "scale=-2:1080", "-crf", "20"] },
    { label: "1080-crf23", args: ["-vf", "scale=-2:1080", "-crf", "23"] },
    { label: "720-crf23", args: ["-vf", "scale=-2:720", "-crf", "23"] },
  ];
  const probeDir = path.join(process.cwd(), "tmp", "vsl-probe");
  fs.mkdirSync(probeDir, { recursive: true });
  for (const probe of probes) {
    const dest = path.join(probeDir, `${probe.label}.mp4`);
    console.log(`\n--- ${probe.label} ---`);
    run(ffmpegBin(), [
      "-y",
      "-i",
      master,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      ...probe.args,
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      dest,
    ]);
    const still255 = path.join(probeDir, `${probe.label}-2m55.jpg`);
    const still343 = path.join(probeDir, `${probe.label}-3m43.jpg`);
    run(ffmpegBin(), ["-y", "-ss", "00:02:55", "-i", dest, "-frames:v", "1", still255]);
    run(ffmpegBin(), ["-y", "-ss", "00:03:43", "-i", dest, "-frames:v", "1", still343]);
    const sizeMb = (fs.statSync(dest).size / (1024 * 1024)).toFixed(1);
    console.log(`${probe.label}: ${sizeMb} MB`);
    console.log(`stills: ${still255}  ${still343}`);
  }
  process.exit(0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(POSTER_DEST), { recursive: true });

const thumb = findFile(THUMB_CANDIDATES);
if (thumb) {
  run(ffmpegBin(), [
    "-y",
    "-i",
    thumb,
    "-vf",
    "scale=1280:-2",
    POSTER_DEST,
  ]);
  console.log(`Poster written to ${POSTER_DEST}`);
} else {
  console.warn("Thumbnail PNG not found; extracting a poster frame from the master.");
  run(ffmpegBin(), [
    "-y",
    "-ss",
    "00:00:02",
    "-i",
    master,
    "-frames:v",
    "1",
    "-vf",
    "scale=1280:-2",
    POSTER_DEST,
  ]);
  console.log(`Poster frame written to ${POSTER_DEST}`);
}

const rungs = [
  { name: "v1080", height: 1080, bandwidth: 3500000 },
  { name: "v720", height: 720, bandwidth: 1800000 },
  { name: "v480", height: 480, bandwidth: 900000 },
];

for (const rung of rungs) {
  const rungDir = path.join(OUT_DIR, rung.name);
  fs.mkdirSync(rungDir, { recursive: true });
  console.log(`\nEncoding ${rung.name} at CRF ${CRF}...`);
  run(ffmpegBin(), [
    "-y",
    "-i",
    master,
    "-vf",
    `scale=-2:${rung.height}`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    CRF,
    "-g",
    "60",
    "-keyint_min",
    "60",
    "-sc_threshold",
    "0",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-ac",
    "2",
    "-hls_time",
    "4",
    "-hls_playlist_type",
    "vod",
    "-hls_segment_filename",
    path.join(rungDir, "seg_%03d.ts"),
    path.join(rungDir, "index.m3u8"),
  ]);
}

const masterPlaylist = `#EXTM3U
#EXT-X-VERSION:3
${rungs
  .map(
    (rung) =>
      `#EXT-X-STREAM-INF:BANDWIDTH=${rung.bandwidth},RESOLUTION=${
        rung.height === 1080 ? "1920x1080" : rung.height === 720 ? "1280x720" : "854x480"
      },NAME="${rung.name}"\n${rung.name}/index.m3u8`,
  )
  .join("\n")}
`;
fs.writeFileSync(path.join(OUT_DIR, "master.m3u8"), masterPlaylist);
console.log(`\nHLS ladder written to ${OUT_DIR}`);
console.log("Next: node scripts/upload-vsl-r2.mjs");
