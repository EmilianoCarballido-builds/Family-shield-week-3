import assert from "node:assert/strict";
import test from "node:test";

test("renders the Family Shield intake and safety boundaries", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /Family Shield/);
  assert.match(html, /What did the requester say\?/);
  assert.match(html, /Use microphone/);
  assert.match(html, /Do not enter real names, account numbers, or private information/);
  assert.match(html, /Only the account owner makes this decision/);
  assert.doesNotMatch(html, /definitely safe|definitely fraud/i);
});
