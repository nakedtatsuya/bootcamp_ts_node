const { describe, it, after, before } = require("node:test");
const assert = require("node:assert");
const { spawn } = require("node:child_process");

const port = process.env.PORT ?? 54321;

const SERVER_ORIGIN = `http://localhost:${port}`;
let server;
describe("a server", () => {
  before(async () => {
    server = spawn(`PORT=${port} node ./out/server.js`, { shell: true, detached: true });
    await new Promise((resolve, reject) => {
      server.stdout.on("data", (data) => {
        resolve();
      });
      server.stderr.on("data", (data) => {
        reject(data.toString())
      })
    }).catch((error) => {
      console.error(error);
      process.exit(1);
    })
    // remove event listeners
    server.stdout.removeAllListeners();
    server.stderr.removeAllListeners();
  });
  it("returns a valid JSON for /sample.json", async () => {
    const response = await fetch(`${SERVER_ORIGIN}/sample.json`);
    assert.equal(response.status, 200);
    assert.ok(response.ok);
    const result = await response.json();
    assert.deepStrictEqual(result, { message: "ok" });
  });

  it("returns a html for /hello.html", async () => {
    const response = await fetch(`${SERVER_ORIGIN}/hello.html`);
    assert.equal(response.status, 200);
    assert.ok(response.ok);
    const mimeType = response.headers.get("content-type");
    assert.equal(mimeType.toLowerCase(), "text/html");
  });

  it("returns a jpeg for /wanko.jpg", async () => {
    const response = await fetch(`${SERVER_ORIGIN}/wanko.jpg`);
    assert.equal(response.status, 200);
    assert.ok(response.ok);
    const mimeType = response.headers.get("content-type");
    assert.equal(mimeType.toLowerCase(), "image/jpeg");
  });

  it("returns 404 status code for non-existing url", async () => {
    const response = await fetch(`${SERVER_ORIGIN}/does-not-exist`);
    assert.equal(response.status, 404);
    assert.equal(response.ok, false);
  });
  after(() => {
    // server.kill();
    process.kill(-server.pid);
  });
});
