# hanxa.xyz

Personal site for David Bang — a static, single-page portfolio in the spirit of
HTML5UP's *Dimension* (full-screen dark background, centered card, pill nav, in-place
article panels). No build step, no framework.

```
index.html             page shell + About / Projects / Contact articles
assets/css/main.css    all styles (tokens at the top of the file)
assets/js/main.js      PROJECTS array (tiles) + hash router
assets/images/         favicon.svg, optional bg.jpg
CNAME                  custom domain for GitHub Pages
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. There is also a `.claude/launch.json` entry
named `hanxa` for the Claude Code browser pane.

## Edit

- **Add a project tile** — append one object to `PROJECTS` in `assets/js/main.js`
  (`name`, `blurb`, `tags`, `url`; `url: null` renders a "coming soon" tile).
- **Add a page** — add an `<article id="newpage">` inside `#main` in `index.html`
  and a nav link `<a href="#newpage">`. The router picks it up automatically.
- **Background photo** — drop `assets/images/bg.jpg` and swap the commented
  `background-image` block under `#bg` in `main.css`.
- **Colors / fonts** — edit the `:root` tokens at the top of `main.css`.

## Deploy

The repo deploys as-is from the root directory.

- **GitHub Pages** — push to GitHub, Settings → Pages → deploy from branch `main`, root `/`.
  `CNAME` already contains `hanxa.xyz`; point the domain's DNS at GitHub Pages
  (A records to GitHub's IPs, or a `www` CNAME to `<user>.github.io`).
- **Netlify** — new site from Git, build command empty, publish directory `.`.
  Add `hanxa.xyz` under Domain management.
- **Cloudflare Pages** — connect the repo, framework preset *None*, build command empty,
  output directory `/`. Add the custom domain in the Pages project.
