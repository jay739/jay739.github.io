// Fills in each tile's version from that repo's latest GitHub release.
//
// A version is marked in index.html as
//   <span data-repo="jay739/openhaze">v0.4.0</span>
// and the value typed there is the fallback. The Pages workflow runs this on
// the copy of the page it is about to deploy, so nothing is committed and a
// new release reaches the hub on the next scheduled deploy.
//
// A repo whose release cannot be read keeps its fallback and logs a warning,
// so one GitHub hiccup never blocks a deploy. A marker the pattern cannot
// rewrite fails the run instead, because that tile would otherwise stop
// updating without anyone noticing.

import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Tolerates the line breaks Prettier puts inside inline tags, such as
// `<span data-repo="a/b"\n  >v1.0.0</span\n>`.
const SPAN =
  /(<span\s+data-repo="([\w.-]+\/[\w.-]+)"\s*>)(v\d+\.\d+\.\d+)(<\/span\s*>)/g;
const MARKER = /data-repo="/g;
const TAG = /^v\d+\.\d+\.\d+$/;

/** Every rewritable version span, plus the count of markers that are not one. */
export function parseSpans(html) {
  const spans = [...html.matchAll(SPAN)].map((m) => ({
    repo: m[2],
    version: m[3],
  }));
  const markers = (html.match(MARKER) ?? []).length;
  return { spans, unmatched: markers - spans.length };
}

/** Writes each repo's tag into its spans; a repo with no valid tag is left as is. */
export function applyVersions(html, versions) {
  return html.replace(SPAN, (whole, open, repo, _current, close) => {
    const tag = versions.get(repo);
    return tag && TAG.test(tag) ? open + tag + close : whole;
  });
}

async function latestTag(repo, token) {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? "HTTP 404, the repo has no published release or was renamed"
        : `HTTP ${res.status}`,
    );
  }
  return (await res.json()).tag_name;
}

async function main(file) {
  const html = await readFile(file, "utf8");
  const { spans, unmatched } = parseSpans(html);

  if (spans.length === 0) {
    console.log(
      `::error::No <span data-repo="owner/name">vX.Y.Z</span> found in ${file}, so no tile version would ever update. Restore the data-repo markers.`,
    );
    process.exit(1);
  }
  if (unmatched > 0) {
    console.log(
      `::error::${unmatched} data-repo marker(s) in ${file} are not a plain <span data-repo="owner/name">vX.Y.Z</span>, so those tiles would stop updating. Put each version back in that form.`,
    );
    process.exit(1);
  }

  const versions = new Map();
  for (const repo of new Set(spans.map((s) => s.repo))) {
    try {
      const tag = await latestTag(repo, process.env.GITHUB_TOKEN);
      if (TAG.test(tag)) {
        versions.set(repo, tag);
      } else {
        console.log(
          `::warning::${repo}: latest release tag "${tag}" is not vX.Y.Z, so its tile keeps the version typed in ${file}.`,
        );
      }
    } catch (err) {
      console.log(
        `::warning::${repo}: could not read its latest release (${err.message}), so its tile keeps the version typed in ${file}.`,
      );
    }
  }

  for (const { repo, version } of spans) {
    const tag = versions.get(repo);
    if (tag && tag !== version) console.log(`${repo}: ${version} -> ${tag}`);
    else console.log(`${repo}: ${version}`);
  }
  await writeFile(file, applyVersions(html, versions));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv[2] ?? "index.html");
}
