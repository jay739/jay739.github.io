# jay739.github.io

<p align="center">
  <img src="logo.svg" alt="apps.jay739.dev logo" width="96" />
</p>

The landing page for my open-source apps, served at **[apps.jay739.dev](https://apps.jay739.dev)** with GitHub Pages.

## How the site fits together

This repo holds only the hub: the index of apps and the timeline page. Each app's own page lives in that app's repo, under `docs/`, published as a GitHub Pages project site. Because this repo is the user site and its `CNAME` is `apps.jay739.dev`, every project site is served under the same domain at its repo name:

| Page                                                                                      | Source                             |
| ----------------------------------------------------------------------------------------- | ---------------------------------- |
| [apps.jay739.dev](https://apps.jay739.dev)                                                | `index.html` here                  |
| [apps.jay739.dev/timeline/](https://apps.jay739.dev/timeline/)                            | `timeline/index.html` here         |
| apps.jay739.dev/&lt;app&gt;/, for example [/openhaze/](https://apps.jay739.dev/openhaze/) | `docs/` in the `jay739/<app>` repo |

To add an app, add a tile for it to `index.html`: its logo goes in `img/logos/`, a real screenshot or real command output in `img/shots/`, and the tile links to the app's own page (publish its repo's `docs/` folder with GitHub Pages) or to its repo. Until a screenshot exists, the tile shows the logo in place of the frame.

## Files

- `index.html`: the hub page, with inline CSS and no build step
- `img/shots/`: one real screenshot or terminal capture per app, as WebP (PNG where WebP came out larger)
- `img/logos/`: each app's logo
- `fonts/`: Bricolage Grotesque, Instrument Sans and IBM Plex Mono as `woff2`, with their licenses in `OFL.txt`, so the page makes no requests to other sites
- `timeline/index.html`: the Ask Me Anything timeline
- `logo.svg`: the hub logo and favicon
- `CNAME`: the custom domain
- `.nojekyll`: serve files as they are, without Jekyll processing

## Checks

CI runs [lychee](https://github.com/lycheeverse/lychee) over both pages on every push and PR, so a broken link to an app page or a repo fails the build.
