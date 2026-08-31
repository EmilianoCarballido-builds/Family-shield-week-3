import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function collectSource(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const sources = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSource(entryPath);
    if (!/\.(ts|tsx)$/.test(entry.name)) return "";
    return readFile(entryPath, "utf8");
  }));
  return sources.join("\n");
}

test("keeps credentials server-side and environment files untracked", async () => {
  const [gitignore, envExample, clientSource, routeSource] = await Promise.all([
    readFile(path.join(root, ".gitignore"), "utf8"),
    readFile(path.join(root, ".env.example"), "utf8"),
    readFile(path.join(root, "components/transfer-intake.tsx"), "utf8"),
    readFile(path.join(root, "app/api/analyze/route.ts"), "utf8"),
  ]);

  assert.match(gitignore, /^\.env\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
  assert.match(envExample, /^AI_GATEWAY_API_KEY=\s*$/m);
  assert.doesNotMatch(clientSource, /AI_GATEWAY_API_KEY|process\.env/);
  assert.match(routeSource, /process\.env\.AI_GATEWAY_API_KEY/);
});

test("does not persist or log user content", async () => {
  const source = [
    await collectSource(path.join(root, "app")),
    await collectSource(path.join(root, "components")),
    await collectSource(path.join(root, "lib")),
  ].join("\n");

  assert.doesNotMatch(source, /console\.(log|info|debug)\s*\(/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB|MediaRecorder/);
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]{20,}/);
});
