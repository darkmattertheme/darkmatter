# Darkmatter

A near-black palette with an ember accent, adapted from
[base16 Black Metal Bathory](https://github.com/metalelf0/base16-black-metal-scheme).

This repo holds the core colors. Every Darkmatter port is built from them.
Browse the ports and the palette at [darkmattertheme.com](https://darkmattertheme.com).

## Palette

Darkmatter has sixteen base16 slots. The darks are backgrounds and structure,
the lights are text, and the accents are for syntax and UI.

### Darks

| Name | Slot | Hex | Role |
| --- | --- | --- | --- |
| Void | `base00` | `#121113` | Background |
| Umbra | `base01` | `#121212` | Lighter background |
| Shadow | `base02` | `#222222` | Selection background |
| Dust | `base03` | `#333333` | Comments, invisibles |

### Lights

| Name | Slot | Hex | Role |
| --- | --- | --- | --- |
| Ash | `base04` | `#999999` | Dark foreground |
| Starlight | `base05` | `#c1c1c1` | Default foreground |
| Vapor | `base06` | `#999999` | Light foreground |
| Halo | `base07` | `#c1c1c1` | Light background |

### Accents

| Name | Slot | Hex | Role |
| --- | --- | --- | --- |
| Aurora | `base08` | `#5f8787` | Variables, tags |
| Meteor | `base09` | `#aaaaaa` | Integers, constants |
| Ember | `base0A` | `#e78a53` | Classes, search, accent |
| Solar | `base0B` | `#fbcb97` | Strings, inserted |
| Corona | `base0C` | `#aaaaaa` | Support, escapes |
| Nebula | `base0D` | `#888888` | Functions, headings |
| Pulsar | `base0E` | `#999999` | Keywords, storage |
| Eclipse | `base0F` | `#444444` | Deprecated, embeds |

### Terminal

Terminal ports use a white foreground and map the accents onto the 16 ANSI
colors. The normal and bright colors are the same except for black.

| | Hex |
| --- | --- |
| Background | `#121113` |
| Foreground | `#ffffff` |
| Cursor | `#ffffff` |
| Selection | `#222222` background, `#000000` text |
| Black / bright black | `#121113` / `#333333` |
| Red | `#5f8787` |
| Green | `#fbcb97` |
| Yellow | `#e78a53` |
| Blue | `#888888` |
| Magenta | `#999999` |
| Cyan | `#aaaaaa` |
| White | `#c1c1c1` |

## Formats

| File | Use it for |
| --- | --- |
| [`src/darkmatter.css`](src/darkmatter.css) | CSS custom properties (`--darkmatter-ember`, `--darkmatter-base0A`) |
| [`src/darkmatter.scss`](src/darkmatter.scss) | Sass variables |
| [`src/darkmatter.less`](src/darkmatter.less) | Less variables |
| [`src/darkmatter.styl`](src/darkmatter.styl) | Stylus variables |
| [`src/darkmatter.yaml`](src/darkmatter.yaml) | A base16 scheme for [tinted-theming](https://github.com/tinted-theming) builders |
| [`src/darkmatter.json`](src/darkmatter.json) | Named, base16 and terminal colors for scripts |
| [`src/darkmatter.Xresources`](src/darkmatter.Xresources) | X terminals (xterm, urxvt, st with the xresources patch) |
| [`src/swatches/darkmatter.gpl`](src/swatches/darkmatter.gpl) | GIMP, Inkscape and Krita palettes |

Each color is available by name (`ember`) and by base16 slot (`base0A`):

```css
@import "darkmatter/src/darkmatter.css";

body {
  background: var(--darkmatter-void);
  color: var(--darkmatter-starlight);
}

a {
  color: var(--darkmatter-ember);
}
```

## Ports

| Port | Repo |
| --- | --- |
| Ghostty | [darkmattertheme/ghostty](https://github.com/darkmattertheme/ghostty) |
| WezTerm | [darkmattertheme/wezterm](https://github.com/darkmattertheme/wezterm) |
| Alacritty | [darkmattertheme/alacritty](https://github.com/darkmattertheme/alacritty) |
| st | [darkmattertheme/st](https://github.com/darkmattertheme/st) |
| Neovim / Vim | [darkmattertheme/darkmatter.nvim](https://github.com/darkmattertheme/darkmatter.nvim) |
| Zed | [darkmattertheme/zed](https://github.com/darkmattertheme/zed) |
| Yazi | [darkmattertheme/darkmatter.yazi](https://github.com/darkmattertheme/darkmatter.yazi) |
| OpenCode | [darkmattertheme/opencode](https://github.com/darkmattertheme/opencode) |
| Amfora | [darkmattertheme/amfora](https://github.com/darkmattertheme/amfora) |
| Polybar | [darkmattertheme/polybar](https://github.com/darkmattertheme/polybar) |
| GTK, xfwm4, Dunst, Rofi | [darkmattertheme/linux](https://github.com/darkmattertheme/linux) |

## Changing a color

`palette.json` is the source of truth. Edit it, then regenerate `src/`:

```sh
node build.mjs   # or: bun build.mjs
```

The generator has no dependencies. Ports keep their own copies of the colors,
so update them too after a change.

## License

MIT. See [`LICENSE`](LICENSE).
