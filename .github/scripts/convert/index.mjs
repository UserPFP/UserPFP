import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { format } from "prettier";

console.time("Done");

console.log("Reading avatarsdatabase.css...");
const avis = (await readFile(join("../../", "avatarsdatabase.css"), "utf8"))
  .replace(/\r/g, "")
  .split("\n");

const imageMatcher = /url\((?:'|")([^'"]+)(?:'|")\)/;
const avatarMatcher = /^\/\* Custom avatar for ([0-9]+) \*\/$/;
const badgeMatcher = /^\/\* Custom badge for (.*?) \*\/$/;

const avatars = {};
for (let i = 0; i < avis.length; i++) {
  const l = avis[i];
  const id = l.match(avatarMatcher)?.[1];
  if (id) avatars[id] = avis[i + 2].match(imageMatcher)[1];
}

const badges = {};
for (let i = 0; i < avis.length; i++) {
  const l = avis[i];
  const username = l.match(badgeMatcher)?.[1];
  if (username) badges[username] = avis[i + 10].match(imageMatcher)[1];
}

await writeFile(
  join("../../", "db", "data.json"),
  format(
    JSON.stringify({
      avatars,
      badges,
    }),
    {
      parser: "json",
    }
  )
);
