# jay739.github.io

<p align="center">
  <img src="logo.svg" alt="apps.jay739.dev logo" width="96" />
</p>

The landing page for my open-source apps, served at **[apps.jay739.dev](https://apps.jay739.dev)** with GitHub Pages.

## How the site fits together

This repo holds only the hub: the index of apps and the timeline page. Each app's own page lives in that app's repo, under `docs/`, published as a GitHub Pages project site. Because this repo is the user site and its `CNAME` is `apps.jay739.dev`, every project site is served under the same domain at its repo name:

| Page                                                       | Source                              |
| ---------------------------------------------------------- | ----------------------------------- |
| [apps.jay739.dev](https://apps.jay739.dev)                 | `index.html` here                   |
| [apps.jay739.dev/timeline/](https://apps.jay739.dev/timeline/) | `timeline/index.html` here          |
| apps.jay739.dev/&lt;app&gt;/, for example [/openhaze/](https://apps.jay739.dev/openhaze/) | `docs/` in the `jay739/<app>` repo |

To add an app, publish its repo's `docs/` folder with GitHub Pages, then add a card for it to `index.html`.

## Files

- `index.html`: the hub page, self-contained (inline CSS, no build step)
- `timeline/index.html`: the Ask Me Anything timeline
- `logo.svg`: the hub logo and favicon
- `CNAME`: the custom domain
- `.nojekyll`: serve files as they are, without Jekyll processing

## Checks

CI runs [lychee](https://github.com/lycheeverse/lychee) over both pages on every push and PR, so a broken link to an app page or a repo fails the build.
