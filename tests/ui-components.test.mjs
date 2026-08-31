import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the product intake and reduced-motion styles", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /\.intake-form/);
  assert.match(css, /textarea\[aria-invalid=/);
  assert.match(css, /\.voice-button/);
  assert.match(css, /\.analysis-panel/);
  assert.match(css, /\.simulation-label/);
  assert.match(css, /\.workflow-card/);
  assert.match(css, /\.contact-options/);
  assert.match(css, /\.owner-decision/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation-duration:\s*0?\.01ms/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("validates and normalizes urgent-request narratives", async () => {
  const {
    MAX_NARRATIVE_LENGTH,
    validateNarrative,
  } = await vite.ssrLoadModule("/lib/intake-validation.ts");

  assert.deepEqual(validateNarrative(null), {
    valid: false,
    error: "Enter the request as text before continuing.",
  });
  assert.equal(validateNarrative("too short").valid, false);
  assert.deepEqual(
    validateNarrative("  Please   send money today and do not call anyone.  "),
    {
      valid: true,
      value: "Please send money today and do not call anyone.",
    },
  );
  assert.equal(validateNarrative("x".repeat(MAX_NARRATIVE_LENGTH + 1)).valid, false);
});

test("creates a bounded simulated analysis without a verdict", async () => {
  const {
    analysisRequestSchema,
    analysisResponseSchema,
    createSimulatedAnalysis,
  } = await vite.ssrLoadModule("/lib/pressure-analysis.ts");

  const input = analysisRequestSchema.parse({
    narrative: "  Es urgente. No le digas a nadie y deposita hoy a una cuenta nueva.  ",
    newRecipient: true,
    urgencySelected: true,
  });
  const output = createSimulatedAnalysis(input);

  assert.equal(output.mode, "simulated");
  assert.ok(output.cues.length > 0 && output.cues.length <= 4);
  assert.match(output.summary, /not proof/i);
  assert.equal(analysisResponseSchema.safeParse(output).success, true);
  assert.doesNotMatch(JSON.stringify(output), /"score"|"probability"/i);
});

test("keeps contact requests minimal and routes unclear outcomes to Protocol Only", async () => {
  const {
    createContactRequest,
    outcomeCopy,
    requiresProtocolOnly,
  } = await vite.ssrLoadModule("/lib/verification-policy.ts");

  const request = createContactRequest();
  assert.deepEqual(Object.keys(request).sort(), ["claim", "contactAlias"]);
  assert.doesNotMatch(JSON.stringify(request), /amount|balance|account|audio|transcript|payment/i);

  assert.equal(requiresProtocolOnly("confirmed"), false);
  assert.equal(requiresProtocolOnly("cannot_confirm"), true);
  assert.equal(requiresProtocolOnly("not_sure"), true);
  assert.equal(requiresProtocolOnly("no_response"), true);
  assert.match(outcomeCopy.confirmed.detail, /does not prove.*safe/i);
});
