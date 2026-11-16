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

## B-3: Fix the unreadable text in both colour schemes

- **Status:** open
- **Size:** S
- **Touches:** `index.html` (the `:root` tokens and the `prefers-color-scheme: light` block, the inline `style="--state-color: ..."` on every row, `.row.planned { opacity: 0.7 }`)
- **Why:** measured on 2026-11-15. In light mode the status labels are 1.74:1 (green) and 1.95:1 (amber) against white, well under the 4.5:1 minimum for body text, because each row hard-codes its dark-mode colour inline and the light-mode tokens `--live` and `--amber` are never used. Even `--live` (#16a34a) would only reach 3.30:1. `--dim` fails in both schemes (3.05:1 dark, 2.58:1 light) and carries the section labels, the footer and the hero prompt. The "planned" label is 2.52:1 in dark mode before its row is faded to 70% opacity. This is a defect today, whatever the redesign decides, and B-4 removes most of these labels anyway.
- **Done when:** the markup has no inline colours, every colour comes from a token that has a light-mode value, and every text colour measures at least 4.5:1 against its background in both schemes.

## B-4: Drop the status dashboard that has no status behind it

- **Status:** open
- **Size:** S
- **Touches:** `index.html` (the "running", "building" and "planned" sections, the `.stats` row in the hero, `.dot`, `.dot.live::after` and `@keyframes ring`, `.row.planned`)
- **Why:** green pulsing dots, "running" and a "3 running · 2 building" counter make the page look like live monitoring, but every label is typed by hand and nothing checks it. A Claude Code hook cannot be "running". It has already drifted: sitrep shipped v0.1.0 on 2026-09-30 and still sits greyed out under "planned", linking to my GitHub profile instead of its repo. The three planned rows all link to the bare profile, so they look clickable and lead nowhere.
- **Done when:** rows are grouped by what they are (self-hosted, desktop and mobile, Claude Code hooks), the right-hand label on each row is a fact anyone can check (the platform or the latest release tag), sitrep appears with `v0.1.0` linking to `https://github.com/jay739/sitrep`, unreleased private work is either gone or one plain sentence rather than fake rows, no row links to the bare profile, and the dots, the pulse animation and the stats row are deleted.

## B-5: Decide the direction before touching the styling

- **Status:** blocked (needs my decision on the jay739.dev question)
- **Size:** S
- **Touches:** nothing in the repo; the outcome goes in the description of the first PR for B-6 to B-8
- **Why:** without a written direction a redesign only swaps one stock look for another. Near-black with one bright accent, which is what the page uses now, is one of the handful of looks template-built pages keep landing on; warm cream with a big serif and a terracotta accent, and newspaper-style hairline columns, are the others to steer clear of. There is also a real dependency: PR #2 matched the hub to jay739.dev, which uses the same orange on black in a much louder form (a glowing skill-bubble constellation, a glass card, a visitor counter). Changing the hub alone splits the brand, and changing both is a bigger job that belongs in the portfolio repo.
- **Proposed brief to accept or change:** the audience is someone arriving from a README, my GitHub profile or my resume. The page's one job is to show in ten seconds what each app does and what it runs on, and get them to it. A candidate signature is to make "software I run myself instead of renting" concrete by naming the paid product an app replaces wherever that is true: scribe and Otter.ai, sitrep and Atlassian Statuspage, wakeharder and Alarmy. Only where it is true, never as decoration.
- **Done when:** the jay739.dev question is answered (match it, break from it, or redesign both), and a short brief is written down with the audience, the page's one job, a palette of 4 to 6 named colours, a display face and a body face, and the one signature element.

## B-6: Replace the terminal costume with the chosen type

- **Status:** blocked on B-5
- **Size:** M
- **Touches:** `index.html` (the `.prompt-line` and `$ whoami`, `.cursor` and its pulse, the lowercase `h1`, the mono `.section-head` labels and their rule lines, `--font-display`, `--font-mono`, the Google Fonts `<link>` tags), new `fonts/` folder
- **Why:** a shell prompt, a blinking block cursor and a lowercase name are the most common developer-portfolio template, and they dress the page up as a terminal for visitors who mostly are not in one. Space Grotesk with JetBrains Mono is the stock pairing for that look. The fonts also come from Google, so every visit sends the visitor's IP address there, while the app pages make no outside requests at all.
- **Done when:** there is no prompt line and no cursor, my name is in normal case, monospace is used only where the text is literally code (versions, commands), the faces chosen in B-5 are served as `woff2` from `fonts/` with `font-display: swap`, and the page makes no requests outside apps.jay739.dev.

## B-7: Show the apps instead of slogans

- **Status:** open (screenshots needed from me)
- **Size:** M
- **Touches:** `index.html` (every row: the `<span class="icon">` glyph, `.rowname`, `.rowdesc`), new `img/` for screenshots
- **Why:** every row has the same shape: a hand-drawn glyph, a name, and a tagline written to one formula ("The alarm you cannot sleep through.", "Your audio, transcribed on your own GPU."). A visitor cannot tell what any app looks like or whether it runs on their machine. Each app page already serves its real logo next to it: `./<app>/logo.svg` for seven of them and `./openhaze/favicon.png` for openhaze. Risk: loading logos across project sites makes the hub depend on file names in eight other repos. lychee checks `img` sources, so a rename fails CI here, but only on the next push.
- **Done when:** each app shows its real logo, each description says in plain words what the app does and what it runs on (no taglines), the shipped apps (scribe, omnifin, openhaze, sitrep) each have one screenshot with real `alt` text, and CI is green.

## B-8: Cut the stacked effects

- **Status:** blocked on B-5
- **Size:** S
- **Touches:** `index.html` (`a.row:hover` and its `transform`, `a.row::before` radial wash, `.icon` scale and rotate, `.rowarrow` slide-in, the `--bg-glow` gradient on `body`, `.fade-in` and the per-section `animation-delay`)
- **Why:** one hover on one row lifts the card, washes it with a radial glow, recolours the name, scales and tilts the icon and slides in an arrow: five effects at once. Add the orange glow behind the whole page and a staggered fade-in on load, and the motion is what people notice instead of the apps.
- **Done when:** a row's hover is one effect (border or background colour), nothing moves or rotates on hover, the page background is flat, nothing animates on load, and keyboard focus is at least as visible as hover.

## B-9: Carry the new look to the eight app pages

- **Status:** blocked on B-5 to B-8
- **Size:** L
- **Touches:** `docs/index.html` in each of `jay739/scribe`, `omnifin`, `openhaze`, `wakeharder`, `triliage`, `claude-pop-quiz`, `claude-memory-checkpoint` and `claude-autoformat`
- **Why:** the app pages came from one shared template with its own stock look: a different accent per app, pill badges, two buttons, a six-card "Features" grid and a "Credit where due" box. They share nothing with the hub, so moving from the index to an app feels like leaving the site. This work lands as one change per repo, not in this one.
- **Done when:** all eight pages use the hub's type, palette and spacing (keeping one accent per app if B-5 says so), and each still returns 200 with its own favicon.

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
