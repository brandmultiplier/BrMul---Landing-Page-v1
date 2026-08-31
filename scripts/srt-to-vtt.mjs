/**
 * Convert the hand-corrected SRT to WebVTT.
 * Splits cues longer than 7s on word boundaries. Does not change any wording.
 *
 * Usage: node scripts/srt-to-vtt.mjs
 */
import fs from "node:fs";
import path from "node:path";

const MAX_SECONDS = 7;
const SRC = "C:\\Users\\user\\Downloads\\VSL\\edit-02-brandmultiplier-vsl-final-cut.srt";
const DEST = path.join(process.cwd(), "public", "vsl", "captions.en.vtt");

function parseTimestamp(value) {
  const match = value.trim().match(/(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/);
  if (!match) throw new Error(`Bad timestamp: ${value}`);
  const [, hh, mm, ss, ms] = match;
  return Number(hh) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms) / 1000;
}

function formatTimestamp(seconds) {
  const clamped = Math.max(0, seconds);
  const hh = Math.floor(clamped / 3600);
  const mm = Math.floor((clamped % 3600) / 60);
  const ss = Math.floor(clamped % 60);
  const ms = Math.round((clamped - Math.floor(clamped)) * 1000);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

function parseSrt(raw) {
  const blocks = raw.replace(/^\uFEFF/, "").trim().split(/\r?\n\r?\n/);
  const cues = [];
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter((line) => line.length > 0);
    if (lines.length < 2) continue;
    const timeLine = lines[0].includes("-->") ? lines[0] : lines[1];
    const textLines = lines[0].includes("-->") ? lines.slice(1) : lines.slice(2);
    const [startRaw, endRaw] = timeLine.split("-->").map((s) => s.trim());
    cues.push({
      start: parseTimestamp(startRaw),
      end: parseTimestamp(endRaw),
      text: textLines.join(" ").replace(/\s+/g, " ").trim(),
    });
  }
  return cues;
}

function packWords(text, maxChars) {
  const words = text.split(/\s+/).filter(Boolean);
  const groups = [];
  let current = [];
  let chars = 0;
  for (const word of words) {
    const next = chars + (current.length ? 1 : 0) + word.length;
    if (current.length && next > maxChars) {
      groups.push(current.join(" "));
      current = [word];
      chars = word.length;
    } else {
      current.push(word);
      chars = next;
    }
  }
  if (current.length) groups.push(current.join(" "));
  return groups.length ? groups : [text];
}

function coalesceShortTails(groups) {
  const out = [...groups];
  while (out.length > 1 && out[out.length - 1].split(/\s+/).length < 5) {
    const last = out.pop();
    out[out.length - 1] += ` ${last}`;
  }
  return out;
}

function splitLongCue(cue) {
  const duration = cue.end - cue.start;
  const words = cue.text.split(/\s+/).filter(Boolean);
  if (duration <= MAX_SECONDS || words.length <= 5) return [cue];
  const totalChars = cue.text.length || 1;
  const maxChars = Math.max(12, Math.floor(totalChars * (MAX_SECONDS / duration)));
  let parts = coalesceShortTails(packWords(cue.text, maxChars));
  if (parts.length === 1 && words.length > 5) {
    const mid = Math.ceil(words.length / 2);
    parts = [
      words.slice(0, mid).join(" "),
      words.slice(mid).join(" "),
    ];
  }
  return distribute(cue.start, cue.end, parts);
}

function distribute(start, end, parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0) || 1;
  const duration = end - start;
  let cursor = start;
  return parts.map((part, index) => {
    const share = (part.length / total) * duration;
    const next = index === parts.length - 1 ? end : cursor + share;
    const piece = { start: cursor, end: next, text: part };
    cursor = next;
    return piece;
  });
}

const srcPath = fs.existsSync(SRC)
  ? SRC
  : path.join(process.cwd(), "edit-02-brandmultiplier-vsl-final-cut.srt");

if (!fs.existsSync(srcPath)) {
  console.error(`Missing SRT at ${SRC}`);
  process.exit(1);
}

const cues = parseSrt(fs.readFileSync(srcPath, "utf8")).flatMap(splitLongCue);
fs.mkdirSync(path.dirname(DEST), { recursive: true });

const body = cues
  .map(
    (cue, i) =>
      `${i + 1}\n${formatTimestamp(cue.start)} --> ${formatTimestamp(cue.end)}\n${cue.text}`,
  )
  .join("\n\n");

fs.writeFileSync(DEST, `WEBVTT\n\n${body}\n`, "utf8");

const tooLong = cues.filter((cue) => cue.end - cue.start > MAX_SECONDS + 0.05).length;
const tooShort = cues.filter((cue) => cue.end - cue.start < 0.8).length;
console.log(`Wrote ${cues.length} cues to ${DEST} (over-7s: ${tooLong}, under-0.8s: ${tooShort})`);
