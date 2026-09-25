# Contributing

Thanks for helping out. Most contributions are one of these:

- **A bug in a port.** Open an issue in that port's repo. Every port is listed in
  [`ports.json`](ports.json).
- **A port for a new app.** Read [Making a port](#making-a-port) below.
- **A fix to the website.** Open a pull request to
  [darkmattertheme/web](https://github.com/darkmattertheme/web).
- **A change to the palette itself.** Open an issue here first. Every port
  copies the colors, so a palette change means updating all of them.

## Making a port

A port is a theme for one app, in its own repo under the
[darkmattertheme](https://github.com/darkmattertheme) org.

1. **Check it doesn't exist.** Look through [`ports.json`](ports.json) and the
   [open port requests](https://github.com/darkmattertheme/darkmatter/issues?q=is%3Aopen+label%3Aport-request).
2. **Request it (optional).** If you want to talk it through first, or would like
   someone else to build it, open a
   [Port Request](https://github.com/darkmattertheme/darkmatter/issues/new?template=port-request.yml).
3. **Start from the template.** Create a repo on your own account from
   [darkmattertheme/template](https://github.com/darkmattertheme/template)
   (**Use this template** on GitHub) and fill it in.
4. **Build the theme.** Follow the [port guidelines](#port-guidelines) below.
5. **Submit it for review.** Open a
   [Port Review](https://github.com/darkmattertheme/darkmatter/issues/new?template=port-review.yml)
   with a link to your repo and a screenshot.
6. **Move it into the org.** Once it's approved, transfer the repo to
   `darkmattertheme`. You stay on as a maintainer.
7. **List it.** Open a pull request here that adds the port to `ports.json`. See
   [Listing a port](#listing-a-port).

## Port guidelines

### The repo

- Name it after the app in `lower-kebab-case`: `helix`, `windows-terminal`.
- Use `main` as the default branch.
- Set the description to `Darkmatter theme for <App>`, with the app's own
  capitalization.
- Add the topics `darkmatter`, `theme` and the app's name.
- Include the MIT `LICENSE` from the template. If the app's theme format needs a
  different license, say so in the review.
- Put screenshots in `assets/`. Prefer `.webp` over `.png`.

### The README

Keep the layout from the template, in this order:

1. **Title** `# Darkmatter for <App>` and one line on what the port themes.
2. **Preview**, a screenshot from `assets/`, linked with a relative path.
3. **Installation**, with commands that can be copied as-is.
4. **Usage**, meaning the line of config that turns the theme on.
5. **Credits**, listing yourself and anyone who helped.

### The colors

Use only colors from the palette. Take them from
[`src/darkmatter.json`](src/darkmatter.json) or one of the other files in
[`src/`](src/) instead of picking them by eye. Don't lighten, darken or blend
them, except for transparency where the app supports it.

| Use | Color |
| --- | --- |
| Background | Void `#121113` |
| Panels, sidebars, status bars | Umbra `#121212` or Shadow `#222222` |
| Selection, current line | Shadow `#222222` |
| Borders, comments, line numbers | Dust `#333333` |
| Body text | Starlight `#c1c1c1` |
| Muted text | Ash `#999999` |
| Accent: cursor, focus, active tab, search matches | Ember `#e78a53` |
| Strings, added lines | Solar `#fbcb97` |
| Variables, tags, errors | Aurora `#5f8787` |

Ember is the one warm accent, so keep it for what the eye should land on. If
the port ends up orange all over, pull some of it back.

**Terminal apps** use the terminal colors instead: a white `#ffffff`
foreground and the ANSI mapping in the [README](README.md#terminal). If the app
reads the terminal's 16 colors, use those and don't hardcode hex values.

If the app uses base16, [`src/darkmatter.yaml`](src/darkmatter.yaml) is a
ready-made scheme.

### Commits

Write commit messages in the
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style,
for example `feat: add diff colors` or `fix: cursor color in insert mode`.

## Listing a port

[`ports.json`](ports.json) lists every port. The website at
[darkmattertheme.com](https://darkmattertheme.com) and the table in the README
are built from it. Add an entry to the `ports` array:

```json
{
  "name": "Helix",
  "slug": "helix",
  "category": "Editor",
  "url": "https://github.com/darkmattertheme/helix",
  "description": "A theme.toml for the Helix editor, covering the editor and its pickers.",
  "install": "theme = \"darkmatter\""
}
```

| Key | Required | Notes |
| --- | --- | --- |
| `name` | yes | The app's name, capitalized the way the app does it |
| `slug` | yes | `lower-kebab-case`, unique |
| `category` | yes | One of the `categories` at the top of the file |
| `url` | yes | The port's repo, or the page it's hosted on if it lives on another site (the shadcn/ui port links to tweakcn) |
| `description` | yes | One sentence on what the port covers, shown on its card on the site |
| `install` | no | A single line of config or a command. The site shows it with a copy button |
| `icon` | no | The app's icon on the site. It has to exist in [darkmattertheme/web](https://github.com/darkmattertheme/web) under `src/icons/`, so leave it out and a maintainer will add one |
| `wip` | no | `true` while the port is still being built |

Ports show up on the site in the order they're listed, and the first six are on
the home page, so add yours at the end of its category.

Then run the build and commit the updated README with it:

```sh
node build.mjs   # or: bun build.mjs
```

The build checks every entry and stops with a message if one is wrong. A check
on your pull request runs the same build.

## Maintenance

Once a port moves into the org, the maintainers help look after it. You don't
have to keep maintaining it, but you're welcome to, and you'll be asked to
review changes to it.

## License

Everything here is MIT. By contributing you agree your work is published under
the same license.
