// Generates every file in src/ and the palette circles from palette.json, checks
// ports.json and writes the ports table in README.md. Run with `node build.mjs`
// (or `bun build.mjs`) after changing a color or a port.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const palette = JSON.parse(readFileSync("palette.json", "utf8"));
const { categories, ports } = JSON.parse(readFileSync("ports.json", "utf8"));
const { base16, terminal } = palette;
const ansiNames = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

const header = (c) =>
  [`${c} ${palette.name}`, `${c} ${palette.description}`, `${c} ${palette.homepage}`, `${c} Generated from palette.json by build.mjs. Do not edit by hand.`].join("\n");

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// CSS custom properties, plus preprocessor variables sharing one layout
const vars = (prefix, sep, end) =>
  [
    ...base16.map((c) => `${prefix}darkmatter-${c.name}${sep}${c.hex}${end} // ${c.key}: ${c.role}`),
    "",
    ...base16.map((c) => `${prefix}darkmatter-${c.key}${sep}${prefix}darkmatter-${c.name}${end}`),
  ].join("\n");

const files = {
  "src/darkmatter.css": `/*\n${header(" *")}\n */\n\n:root {\n${base16
    .map((c) => `  --darkmatter-${c.name}: ${c.hex}; /* ${c.key}: ${c.role} */`)
    .join("\n")}\n\n${base16.map((c) => `  --darkmatter-${c.key}: var(--darkmatter-${c.name});`).join("\n")}\n}\n`,
  "src/darkmatter.scss": `${header("//")}\n\n${vars("$", ": ", ";")}\n`,
  "src/darkmatter.less": `${header("//")}\n\n${vars("@", ": ", ";")}\n`,
  "src/darkmatter.styl": `${header("//")}\n\n${vars("", " = ", "")}\n`,
  "src/darkmatter.yaml": `${header("#")}\n\nsystem: "base16"\nname: "${palette.name}"\nauthor: "${palette.author}"\nvariant: "dark"\npalette:\n${base16
    .map((c) => `  ${c.key}: "${c.hex}" # ${c.name}`)
    .join("\n")}\n`,
  "src/darkmatter.json": JSON.stringify(
    {
      ...Object.fromEntries(base16.map((c) => [c.name, c.hex])),
      base16: Object.fromEntries(base16.map((c) => [c.key, c.hex])),
      terminal: {
        ...Object.fromEntries(Object.entries(terminal).filter(([k]) => k !== "ansi")),
        ...Object.fromEntries(ansiNames.map((n, i) => [n, terminal.ansi[i]])),
        ...Object.fromEntries(ansiNames.map((n, i) => [`bright${n[0].toUpperCase()}${n.slice(1)}`, terminal.ansi[i + 8]])),
      },
    },
    null,
    2,
  ) + "\n",
  "src/darkmatter.Xresources": `${header("!")}\n\n*.background: ${terminal.background}\n*.foreground: ${terminal.foreground}\n*.cursorColor: ${terminal.cursor}\n${terminal.ansi
    .map((hex, i) => `*.color${i}: ${hex}`)
    .join("\n")}\n`,
  "src/swatches/darkmatter.gpl": `GIMP Palette\nName: ${palette.name}\nColumns: 4\n#\n${base16
    .map((c) => `${rgb(c.hex).join("\t")}\t${c.name} (${c.key})`)
    .join("\n")}\n`,
};

// Palette circles for the README, one per named color and terminal color
const circle = (hex) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="${hex}"/></svg>\n`;
const snake = (s) => s.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);

for (const c of base16) files[`assets/circles/${c.name}.svg`] = circle(c.hex);
for (const [k, hex] of Object.entries(terminal)) {
  if (k !== "ansi") files[`assets/circles/terminal_${snake(k)}.svg`] = circle(hex);
}
ansiNames.forEach((n, i) => {
  files[`assets/circles/ansi_${n}.svg`] = circle(terminal.ansi[i]);
  files[`assets/circles/ansi_bright_${n}.svg`] = circle(terminal.ansi[i + 8]);
});

// Check ports.json before writing anything
const problems = [];
const slugs = new Set();
for (const [i, port] of ports.entries()) {
  const at = `ports[${i}] (${port.name ?? "unnamed"})`;
  for (const key of ["name", "slug", "category", "url", "description"]) {
    if (typeof port[key] !== "string" || !port[key].trim()) problems.push(`${at}: missing "${key}"`);
  }
  const known = ["name", "slug", "category", "url", "description", "icon", "install", "wip"];
  for (const key of Object.keys(port)) if (!known.includes(key)) problems.push(`${at}: unknown key "${key}"`);
  if (port.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(port.slug)) problems.push(`${at}: slug must be lower-kebab-case`);
  if (slugs.has(port.slug)) problems.push(`${at}: duplicate slug "${port.slug}"`);
  slugs.add(port.slug);
  if (port.category && !categories.includes(port.category)) problems.push(`${at}: category must be one of ${categories.join(", ")}`);
  if (port.url && !port.url.startsWith("https://")) problems.push(`${at}: url must start with https://`);
  if ("wip" in port && typeof port.wip !== "boolean") problems.push(`${at}: wip must be true or false`);
}
if (problems.length) {
  console.error(`ports.json has problems:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}

// Ports table in README.md, between the ports:start and ports:end markers
const repoName = (url) => url.replace(/^https:\/\/github\.com\//, "");
const table = [
  "| Port | Category | Repo |",
  "| --- | --- | --- |",
  ...ports
    .filter((port) => port.url !== palette.repository)
    .map((port) => `| ${port.name}${port.wip ? " (in progress)" : ""} | ${port.category} | [${repoName(port.url)}](${port.url}) |`),
].join("\n");
const readme = readFileSync("README.md", "utf8");
const markers = /(<!-- ports:start[^>]*-->)[\s\S]*?(<!-- ports:end -->)/;
if (!markers.test(readme)) {
  console.error("README.md is missing the <!-- ports:start --> and <!-- ports:end --> markers");
  process.exit(1);
}
files["README.md"] = readme.replace(markers, (_, start, end) => `${start}\n${table}\n${end}`);

mkdirSync("src/swatches", { recursive: true });
mkdirSync("assets/circles", { recursive: true });
for (const [path, body] of Object.entries(files)) {
  writeFileSync(path, body);
  console.log(`wrote ${path}`);
}
