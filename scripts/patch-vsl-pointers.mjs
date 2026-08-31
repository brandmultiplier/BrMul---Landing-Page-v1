/**
 * Insert the compact hub-video pointer at the foot of every article body.
 * Usage: node scripts/patch-vsl-pointers.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src", "app", "(embeds)", "resources");
const MARKER = "vsl-pointer";
const POINTER = `<div class="vsl-pointer">
  <p class="vsl-pointer__k">Watch the walkthrough</p>
  <p>Eight minutes on what this company does and what you'd hold at the end of an engagement. <a href="/resources#vsl">Play it on the resource hub →</a></p>
</div>
`;

const skip = new Set(["page.tsx", "layout.tsx", "loading.tsx", "WelcomeBanner.tsx", "VslToolStrip.tsx"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

const files = walk(ROOT).filter((file) => !skip.has(path.basename(path.dirname(file))) || path.basename(file) === "page.tsx");

let changed = 0;
for (const file of files) {
  if (path.relative(ROOT, file) === "page.tsx") continue;
  let source = fs.readFileSync(file, "utf8");
  if (source.includes(MARKER)) {
    console.log(`skip (already present) ${path.relative(ROOT, file)}`);
    continue;
  }
  if (!source.includes("</article>")) {
    console.warn(`no </article> in ${path.relative(ROOT, file)}`);
    continue;
  }
  source = source.replace(/\n  <\/article>/, `\n${POINTER}  </article>`);
  fs.writeFileSync(file, source);
  changed += 1;
  console.log(`patched ${path.relative(ROOT, file)}`);
}
console.log(`Updated ${changed} article pages`);
