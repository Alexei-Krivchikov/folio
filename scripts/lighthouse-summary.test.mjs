import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./lighthouse-summary.mjs", import.meta.url));

for (const [scenario, dir] of [
  ["missing", "missing-reports"],
  ["empty", "."],
]) {
  test(`reports that Lighthouse produced no results when the reports directory is ${scenario}`, (t) => {
    const cwd = mkdtempSync(join(tmpdir(), "folio-lighthouse-"));
    t.after(() => rmdirSync(cwd));

    const result = spawnSync(process.execPath, [script, dir], { cwd, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /No Lighthouse reports were generated\./);
  });
}
