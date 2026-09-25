<h3 align="center">
	<img src="assets/logos/logo-circle.svg" width="100" alt="Logo"/><br/>
	<img src="assets/misc/transparent.svg" height="30" width="0px"/>
	Darkmatter
	<img src="assets/misc/transparent.svg" height="30" width="0px"/>
</h3>

<h6 align="center">
  <a href="#palette">Palette</a>
  ·
  <a href="#formats">Formats</a>
  ·
  <a href="#ports">Ports</a>
  ·
  <a href="https://darkmattertheme.com">Website</a>
</h6>

A near-black palette with an ember accent, adapted from
[base16 Black Metal Bathory](https://github.com/metalelf0/base16-black-metal-scheme).

This repo holds the core colors. Every Darkmatter port is built from them.
Browse the ports and the palette at [darkmattertheme.com](https://darkmattertheme.com).

## Palette

Darkmatter has sixteen base16 slots. The darks are backgrounds and structure,
the lights are text, and the accents are for syntax and UI.

### Darks

| | Name | Slot | Hex | Role |
| --- | --- | --- | --- | --- |
| <img src="assets/circles/void.svg" width="23"/> | Void | `base00` | `#121113` | Background |
| <img src="assets/circles/umbra.svg" width="23"/> | Umbra | `base01` | `#121212` | Lighter background |
| <img src="assets/circles/shadow.svg" width="23"/> | Shadow | `base02` | `#222222` | Selection background |
| <img src="assets/circles/dust.svg" width="23"/> | Dust | `base03` | `#333333` | Comments, invisibles |

### Lights

| | Name | Slot | Hex | Role |
| --- | --- | --- | --- | --- |
| <img src="assets/circles/ash.svg" width="23"/> | Ash | `base04` | `#999999` | Dark foreground |
| <img src="assets/circles/starlight.svg" width="23"/> | Starlight | `base05` | `#c1c1c1` | Default foreground |
| <img src="assets/circles/vapor.svg" width="23"/> | Vapor | `base06` | `#999999` | Light foreground |
| <img src="assets/circles/halo.svg" width="23"/> | Halo | `base07` | `#c1c1c1` | Light background |

### Accents

| | Name | Slot | Hex | Role |
| --- | --- | --- | --- | --- |
| <img src="assets/circles/aurora.svg" width="23"/> | Aurora | `base08` | `#5f8787` | Variables, tags |
| <img src="assets/circles/meteor.svg" width="23"/> | Meteor | `base09` | `#aaaaaa` | Integers, constants |
| <img src="assets/circles/ember.svg" width="23"/> | Ember | `base0A` | `#e78a53` | Classes, search, accent |
| <img src="assets/circles/solar.svg" width="23"/> | Solar | `base0B` | `#fbcb97` | Strings, inserted |
| <img src="assets/circles/corona.svg" width="23"/> | Corona | `base0C` | `#aaaaaa` | Support, escapes |
| <img src="assets/circles/nebula.svg" width="23"/> | Nebula | `base0D` | `#888888` | Functions, headings |
| <img src="assets/circles/pulsar.svg" width="23"/> | Pulsar | `base0E` | `#999999` | Keywords, storage |
| <img src="assets/circles/eclipse.svg" width="23"/> | Eclipse | `base0F` | `#444444` | Deprecated, embeds |

### Terminal

Terminal ports use a white foreground and map the accents onto the 16 ANSI
colors. The normal and bright colors are the same except for black.

| | | Hex |
| --- | --- | --- |
| <img src="assets/circles/terminal_background.svg" width="23"/> | Background | `#121113` |
| <img src="assets/circles/terminal_foreground.svg" width="23"/> | Foreground | `#ffffff` |
| <img src="assets/circles/terminal_cursor.svg" width="23"/> | Cursor | `#ffffff` |
| <img src="assets/circles/terminal_selection_background.svg" width="23"/> | Selection | `#222222` background, `#000000` text |
| <img src="assets/circles/ansi_black.svg" width="23"/> <img src="assets/circles/ansi_bright_black.svg" width="23"/> | Black / bright black | `#121113` / `#333333` |
| <img src="assets/circles/ansi_red.svg" width="23"/> | Red | `#5f8787` |
| <img src="assets/circles/ansi_green.svg" width="23"/> | Green | `#fbcb97` |
| <img src="assets/circles/ansi_yellow.svg" width="23"/> | Yellow | `#e78a53` |
| <img src="assets/circles/ansi_blue.svg" width="23"/> | Blue | `#888888` |
| <img src="assets/circles/ansi_magenta.svg" width="23"/> | Magenta | `#999999` |
| <img src="assets/circles/ansi_cyan.svg" width="23"/> | Cyan | `#aaaaaa` |
| <img src="assets/circles/ansi_white.svg" width="23"/> | White | `#c1c1c1` |

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

Every port is listed in [`ports.json`](ports.json), and the website and this table
are built from it. Want to add one? See [`CONTRIBUTING.md`](CONTRIBUTING.md).

<!-- ports:start: generated from ports.json by build.mjs -->
| Port | Category | Repo |
| --- | --- | --- |
| Ghostty | Terminal | [darkmattertheme/ghostty](https://github.com/darkmattertheme/ghostty) |
| WezTerm | Terminal | [darkmattertheme/wezterm](https://github.com/darkmattertheme/wezterm) |
| Alacritty | Terminal | [darkmattertheme/alacritty](https://github.com/darkmattertheme/alacritty) |
| st | Terminal | [darkmattertheme/st](https://github.com/darkmattertheme/st) |
| Neovim | Editor | [darkmattertheme/nvim](https://github.com/darkmattertheme/nvim) |
| Zed | Editor | [darkmattertheme/zed](https://github.com/darkmattertheme/zed) |
| TextMate | Editor | [darkmattertheme/textmate](https://github.com/darkmattertheme/textmate) |
| Yazi | Tools | [darkmattertheme/yazi](https://github.com/darkmattertheme/yazi) |
| OpenCode | Tools | [darkmattertheme/opencode](https://github.com/darkmattertheme/opencode) |
| Amfora | Tools | [darkmattertheme/amfora](https://github.com/darkmattertheme/amfora) |
| Nushell | Shell | [darkmattertheme/nushell](https://github.com/darkmattertheme/nushell) |
| GTK | Desktop | [darkmattertheme/gtk3](https://github.com/darkmattertheme/gtk3) |
| Rofi | Desktop | [darkmattertheme/rofi](https://github.com/darkmattertheme/rofi) |
| Dunst | Desktop | [darkmattertheme/dunst](https://github.com/darkmattertheme/dunst) |
| Polybar | Desktop | [darkmattertheme/polybar](https://github.com/darkmattertheme/polybar) |
<!-- ports:end -->

## Changing a color

`palette.json` is the source of truth. Edit it, then regenerate `src/`, the
palette circles in `assets/circles/` and the ports table above:

```sh
node build.mjs   # or: bun build.mjs
```

The generator has no dependencies. Ports keep their own copies of the colors,
so update them too after a change.

## License

MIT. See [`LICENSE`](LICENSE).
