import { readFile } from "node:fs/promises";
import { join } from "node:path";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 700 | 800;
  style: "normal";
};

const FONT_DIR = join(process.cwd(), "assets", "fonts");

let cache: Promise<OgFont[]> | undefined;

async function load(weight: 700 | 800): Promise<OgFont> {
  const file = await readFile(join(FONT_DIR, `bricolage-grotesque-latin-${weight}-normal.woff`));
  const data = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
  return { name: "Bricolage Grotesque", data, weight, style: "normal" };
}

export function getOgFonts(): Promise<OgFont[]> {
  cache ??= Promise.all([load(700), load(800)]);
  return cache;
}
