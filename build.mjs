// Generates every file in src/ from palette.json. Run with `node build.mjs`
// (or `bun build.mjs`) after changing a color.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const palette = JSON.parse(readFileSync("palette.json", "utf8"));
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

mkdirSync("src/swatches", { recursive: true });
for (const [path, body] of Object.entries(files)) {
  writeFileSync(path, body);
  console.log(`wrote ${path}`);
}
