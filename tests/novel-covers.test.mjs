import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const novels = fs.readFileSync("src/data/novels.ts", "utf8");
const section = fs.readFileSync("src/components/sections/Novels.tsx", "utf8");
const covers = fs.existsSync("src/data/bookCovers.ts") ? fs.readFileSync("src/data/bookCovers.ts", "utf8") : "";

test("five featured Asta novels use generated cover artwork", () => {
  for (const key of ["stillFiguringItOut", "bareMinimum", "regret", "catWhoStayed", "wolfOneRedMonsoon"]) {
    assert.match(novels, new RegExp(`coverKey:\\s*"${key}"`), `Missing generated cover mapping for ${key}`);
    assert.match(covers, new RegExp(`${key}:\\s*"data:image\\/webp;base64,`), `Missing embedded WebP art for ${key}`);
  }
});

test("novel carousel resolves generated cover keys through the cover-art map", () => {
  assert.match(section, /bookCovers/);
  assert.match(section, /novel\.coverKey\s*\?\s*bookCovers\[novel\.coverKey\]/);
});
