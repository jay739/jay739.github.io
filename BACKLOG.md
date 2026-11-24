# Backlog

Work on the apps.jay739.dev hub that is understood well enough to start without digging back through old PRs. Items are ordered by how much it hurts to leave them undone, not by effort. Finished items are removed once they are live on the site. This is a personal page, so there is no contributor process; this file is the whole queue.

## B-1: Make the timeline page match the real record

- **Status:** open
- **Size:** S
- **Touches:** `timeline/index.html` (the `items` DataSet and the `details` map)
- **Why:** this is a public page on my own domain that reads like a resume, and it has not been touched since April 2025. Three things are wrong with it. The TCS entry claims "Reduced bugs by 30%", a figure with no source behind it. The home-server entry says the Docker stack runs on a Mac mini M4, but the Mac mini runs the local AI models and the stack lives on a separate mini PC. And nothing after April 2025 appears, including the MS and the current role. A recruiter who compares it with the resume sees two different stories. Retiring the page is a fair alternative: the hub does not link to it, only the README does.
- **Done when:** every entry matches the record and carries no metric I cannot back with an artifact, the timeline runs through the present (or the page is removed along with its README row and the lychee argument in `ci.yml`), and the em dash in the PodcastAI entry is gone.

## B-2: Pin the timeline's third-party script

- **Status:** open
- **Size:** XS
- **Touches:** `timeline/index.html` (the two `unpkg.com/vis-timeline@latest` tags)
- **Why:** `@latest` means whatever version npm serves today runs on apps.jay739.dev. A breaking major release silently blanks the page, and a compromised publish would run someone else's script on my domain. Skip this item if B-1 removes the page.
- **Done when:** both tags name an exact version with an `integrity` hash and `crossorigin="anonymous"`, or the files are vendored into `timeline/`, and the page still renders and responds to clicks.

## B-13: Stop the tile versions going stale

- **Status:** open
- **Size:** S
- **Touches:** `index.html` (the version `<span>` in the `meta` line of the seven tiles that show one: omnifin, sitrep, cadence, openhaze, Omnifin for Windows, claude-pop-quiz and sitediff); option A also adds a workflow under `.github/workflows/` and a script under `.github/scripts/`
- **Why:** the versions are typed by hand, so every release after a tile was written leaves it advertising an older one. openhaze still showed v0.3.0 after v0.4.0 shipped on 2026-11-21, and it was only caught by checking each tile against its repo by hand. Two ways out, not yet chosen:
  - **A. Rewrite them on a schedule.** A cron workflow reads each repo's `releases/latest` and rewrites that tile's version span, the way `jay739/jay739` does with `.github/workflows/releases.yml` and `.github/scripts/update-releases.mjs` for its README block. All seven repos are public, so the default `GITHUB_TOKEN` can read them. Each span needs a hook to find it, such as `data-repo="jay739/openhaze"`, so the script never matches on the text. Risk: the `jay739/jay739` workflow pushes straight to its default branch, but `main` here is protected for admins too and requires `links`, so a bot push is refused. It has to open a PR that something then merges, or the protection has to change. A script that writes `index.html` badly breaks the whole hub, so it should only replace a span whose new value matches `vX.Y.Z` and leave the file untouched on any API error.
  - **B. Drop the version from the tiles.** Nothing to maintain and nothing to break, since the version already lives on each repo's releases page. The cost is that the tiles say less about how far along each app is.
- **Done when:** publishing a release in any of those repos cannot leave its tile showing an older version: with A, a new release reaches the hub within a day with no hand edit; with B, no tile shows a version at all.

## B-9: Carry the new look to the eight app pages

- **Status:** open
- **Size:** L
- **Touches:** `docs/index.html` in each of `jay739/scribe`, `omnifin`, `openhaze`, `wakeharder`, `triliage`, `claude-pop-quiz`, `claude-memory-checkpoint` and `claude-autoformat`
- **Why:** the app pages came from one shared template with its own stock look: a different accent per app, pill badges, two buttons, a six-card "Features" grid and a "Credit where due" box. The hub has moved to its own look (Ink and Paper, Bricolage Grotesque and Instrument Sans, one soft accent tint per app, platform frames around screenshots; the full brief is in PR #8), so moving from the index to an app now feels like leaving the site. This work lands as one change per repo, not in this one.
- **Done when:** all eight pages use the hub's type, palette and spacing, keep their own accent the way the hub tiles do, and each still returns 200 with its own favicon.

## B-10: Give sitrep a landing page

- **Status:** open
- **Size:** S
- **Touches:** `docs/index.html` in `jay739/sitrep` (new), Pages for that repo (default branch, `/docs`), then the sitrep row's `href` here
- **Why:** it is the one public app with no page, so its row can only point at the repo, and the sitrep repo has no Website set. Build it in the new look once B-9 has settled, rather than copying the old template and redoing it.
- **Done when:** `https://apps.jay739.dev/sitrep/` returns 200 with sitrep's own logo as its favicon, the hub row links to `./sitrep/`, and sitrep's repo Website is set to that URL.

## B-11: Upload the social preview

- **Status:** open
- **Size:** XS
- **Touches:** repo Settings, Social preview (there is no API for it)
- **Why:** links to this repo still unfurl with GitHub's generated card. The house-style preview was made on 2026-10-20 as `jay739.github.io.png` in the second batch of social previews, but it has a pale strip about 10 px tall along its top edge that will show on a dark card.
- **Done when:** the strip is cropped or the image regenerated, it is uploaded, and `gh repo view jay739/jay739.github.io --json usesCustomOpenGraphImage` returns `true`.

## B-12: Replace the last three logo panels with screenshots

- **Status:** blocked (the apps are not built yet)
- **Size:** S
- **Touches:** `index.html` (the email-box-analyzer, wakeharder and rainier tiles), new files in `img/shots/`
- **Why:** 14 of the 17 tiles show the app's real interface, and these three show only a logo panel, because there is nothing runnable to capture yet. Next to the others they read as placeholders.
- **Done when:** each of the three tiles has a real screenshot made with demo data only (no real mail, accounts or names) in the frame that matches where it runs, with real `alt` text, and CI is green. A tile whose app is dropped instead is removed.
