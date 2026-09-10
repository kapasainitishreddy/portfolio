import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const novels = fs.readFileSync("src/data/novels.ts", "utf8");
const section = fs.readFileSync("src/components/sections/Novels.tsx", "utf8");
const covers = fs.existsSync("src/data/bookCovers.ts") ? fs.readFileSync("src/data/bookCovers.ts", "utf8") : "";

const generatedCovers = {
  stillFiguringItOut: "still-figuring-it-out.webp",
  bareMinimum: "bare-minimum.webp",
  regret: "regret.webp",
  catWhoStayed: "the-cat-who-stayed.webp",
  wolfOneRedMonsoon: "wolf-one-red-monsoon.webp",
};

test("five featured Asta novels use generated local cover artwork", () => {
  for (const [key, filename] of Object.entries(generatedCovers)) {
    assert.match(novels, new RegExp(`coverKey:\\s*"${key}"`), `Missing generated cover mapping for ${key}`);
    assert.match(covers, new RegExp(`${key}:\\s*withBasePath\\("/book-covers/${filename.replaceAll(".", "\\.")}\\"?\\)`), `Missing local cover path for ${key}`);
  }
});

test("novel carousel resolves generated cover keys through the cover-art map", () => {
  assert.match(section, /bookCovers/);
  assert.match(section, /novel\.coverKey\s*\?\s*bookCovers\[novel\.coverKey\]/);
});
