import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { applyVersions, parseSpans } from "./tile-versions.mjs";

const meta =
  '<p class="meta"><span data-repo="jay739/openhaze">v0.3.0</span><span>macOS</span></p>';

test("writes the latest tag into the marked span only", () => {
  const out = applyVersions(meta, new Map([["jay739/openhaze", "v0.4.0"]]));
  assert.equal(
    out,
    '<p class="meta"><span data-repo="jay739/openhaze">v0.4.0</span><span>macOS</span></p>',
  );
});

test("keeps the typed version when the repo has no usable tag", () => {
  assert.equal(applyVersions(meta, new Map()), meta);
  assert.equal(
    applyVersions(meta, new Map([["jay739/openhaze", "nightly"]])),
    meta,
  );
});

test("leaves spans for other repos alone", () => {
  const two =
    meta + '<span data-repo="jay739/sitrep">v0.1.0</span>';
  const out = applyVersions(two, new Map([["jay739/sitrep", "v0.2.0"]]));
  assert.match(out, /jay739\/openhaze">v0\.3\.0</);
  assert.match(out, /jay739\/sitrep">v0\.2\.0</);
});

test("handles the line breaks Prettier puts inside inline tags", () => {
  const wrapped =
    '<span data-repo="jay739/openhaze"\n                  >v0.3.0</span\n                ><span>macOS</span>';
  assert.deepEqual(parseSpans(wrapped), {
    spans: [{ repo: "jay739/openhaze", version: "v0.3.0" }],
    unmatched: 0,
  });
  assert.match(
    applyVersions(wrapped, new Map([["jay739/openhaze", "v0.4.0"]])),
    />v0\.4\.0<\/span\n/,
  );
});

test("counts a marker it cannot rewrite", () => {
  const bad = '<span data-repo="jay739/openhaze">latest</span>';
  assert.equal(parseSpans(bad).unmatched, 1);
});

test("every data-repo marker in index.html can be rewritten", async () => {
  const html = await readFile(
    new URL("../../index.html", import.meta.url),
    "utf8",
  );
  const { spans, unmatched } = parseSpans(html);
  assert.ok(spans.length > 0, "index.html has no marked version spans");
  assert.equal(unmatched, 0);
});
