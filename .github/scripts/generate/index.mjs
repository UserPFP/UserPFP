import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import UglifyCSS from "uglifycss";

console.time("Done");

const uglify = !process.argv.includes("--debug");

console.log("Getting templates...");
const templateLines = (
  await readFile(join("../../", "Source", "template.css"), "utf8")
)
  .replace(/\r/g, "")
  .split("\n");

const templates = {
  avatar: "",
  badge: "",
};

for (const id of Object.keys(templates)) {
  const start = templateLines.findIndex(
      (x) => x === `/* ${id.toUpperCase()}-TEMPLATE-BEGIN */`
    ),
    end = templateLines.findIndex(
      (x) => x === `/* ${id.toUpperCase()}-TEMPLATE-END */`
    );

  if (start >= 0 && end >= 0)
    templates[id] = templateLines.slice(start + 1, end).join("\n");
  else throw new Error(`Failed to get template lines for: ${id}`);
}

console.log("Generating import.css...");
const data = JSON.parse(
  await readFile(join("../../", "Source", "data.json"), "utf8")
);

const dist = [];

for (const [id, img] of Object.entries(data.avatars)) {
  dist.push(templates.avatar.replace(/{id}/g, id).replace(/{img}/g, img));
}
for (const [bid, img] of Object.entries(data.badges)) {
  dist.push(templates.badge.replace(/{id}/g, bid).replace(/{img}/g, img));
}

await writeFile(
  join("../../", "Source", "import.css"),
  uglify ? UglifyCSS.processString(dist.join("\n")) : dist.join("\n\n")
);

console.timeEnd("Done");
