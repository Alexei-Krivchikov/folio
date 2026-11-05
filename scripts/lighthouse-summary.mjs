import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? ".lighthouseci";
const reports = readdirSync(dir)
  .filter((f) => /^lhr-.*\.json$/.test(f))
  .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")));

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const byUrl = Map.groupBy(reports, (r) => new URL(r.finalDisplayedUrl).pathname);
const score = (r, id) => Math.round(r.categories[id].score * 100);
const audit = (r, id) => r.audits[id].numericValue;

const lines = [
  "## Lighthouse (mobile, simulated slow 4G, median of runs)",
  "",
  "| Page | Runs | Perf | A11y | BP | SEO | LCP | CLS | TBT |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
];

for (const [path, runs] of byUrl) {
  const m = (fn) => median(runs.map(fn));
  const perf = m((r) => score(r, "performance"));
  const flag = perf < 90 ? " ⚠️" : "";
  lines.push(
    `| \`${path}\` | ${runs.length} | ${perf}${flag} | ${m((r) => score(r, "accessibility"))} | ${m((r) => score(r, "best-practices"))} | ${m((r) => score(r, "seo"))} | ${(m((r) => audit(r, "largest-contentful-paint")) / 1000).toFixed(2)} s | ${m((r) => audit(r, "cumulative-layout-shift")).toFixed(3)} | ${Math.round(m((r) => audit(r, "total-blocking-time")))} ms |`,
  );
}

console.log(lines.join("\n"));
