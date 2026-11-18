const assert = require("node:assert/strict");
const http = require("node:http");
const base = process.env.DASHBOARD_URL || "http://127.0.0.1:3001";
async function snapshot() {
  return (await fetch(`${base}/api/content`)).json();
}
async function put(content, revision, origin = base) {
  return fetch(`${base}/api/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify({ content, revision }),
  });
}
async function remoteStatus(route) {
  return new Promise((resolve, reject) => {
    http
      .get(
        base + route,
        { headers: { Host: "remote.example" } },
        (response) => {
          response.resume();
          resolve(response.statusCode);
        },
      )
      .on("error", reject);
  });
}
(async () => {
  const original = await snapshot();
  assert.ok(original.revision);
  assert.equal(original.content.about.title, "About");
  try {
    const content = structuredClone(original.content);
    content.projects.push({
      title: "Dashboard CRUD verification",
      engine: "Test",
      description: "Temporary verification project",
      screenshots: [],
    });
    content.about.title = "Dashboard page verification";
    let response = await put(content, original.revision);
    assert.equal(response.status, 200, await response.text());
    let current = await snapshot();
    assert.ok(
      current.content.projects.some(
        (project) => project.title === "Dashboard CRUD verification",
      ),
    );
    let html = await (await fetch(`${base}/projects`)).text();
    assert.ok(html.includes("Dashboard CRUD verification"));
    html = await (await fetch(`${base}/about`)).text();
    assert.ok(html.includes("Dashboard page verification"));
    content.projects.at(-1).description = "Edited verification content";
    response = await put(content, current.revision);
    assert.equal(response.status, 200);
    current = await snapshot();
    assert.equal(
      current.content.projects.at(-1).description,
      "Edited verification content",
    );
    response = await put(content, original.revision);
    assert.equal(response.status, 400, "Stale revisions must be rejected");
    response = await put(
      content,
      current.revision,
      "https://untrusted.example",
    );
    assert.equal(response.status, 403, "Cross-origin writes must be rejected");
    const invalid = structuredClone(content);
    invalid.contact.links[0].href = "javascript:alert(1)";
    response = await put(invalid, current.revision);
    assert.equal(response.status, 400, "Unsafe links must be rejected");
    invalid.contact.links[0].href = "/contact";
    invalid.projects[0].screenshots = ["https://untrusted.example/image.png"];
    response = await put(invalid, current.revision);
    assert.equal(response.status, 400, "Invalid media paths must be rejected");
    assert.equal(
      await remoteStatus("/api/content"),
      404,
      "Remote hosts must not expose the API",
    );
    assert.equal(
      await remoteStatus("/dashboard"),
      404,
      "Remote hosts must not expose the dashboard",
    );
    for (const route of ["/", "/experience", "/contact", "/dashboard"])
      assert.equal((await fetch(base + route)).status, 200, route);
  } finally {
    const latest = await snapshot();
    const response = await put(original.content, latest.revision);
    assert.equal(response.status, 200, "Restore original content");
  }
  const restored = await snapshot();
  assert.deepEqual(restored.content, original.content);
  assert.ok(
    !(await (await fetch(`${base}/projects`)).text()).includes(
      "Dashboard CRUD verification",
    ),
  );
  console.log(
    "PASS: project create/edit/remove, page updates, persistence, validation, stale-save protection, origin/host restrictions, and all public routes. Original content restored.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
