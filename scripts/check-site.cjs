// Dependency-free checks for the static GitHub Pages artifact.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const dist = path.resolve(__dirname, '../dist');
const pages = fs.readdirSync(dist).filter(name => name.endsWith('.html'));
let links = 0;
for (const name of pages) {
  const file = path.join(dist, name);
  const html = fs.readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate IDs`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${name}: expected one H1`);
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    const [pathname, hash] = url.split('#');
    const target = pathname ? path.resolve(dist, decodeURIComponent(pathname.split('?')[0])) : file;
    assert.ok(target.startsWith(dist + path.sep), `${name}: path outside dist: ${url}`);
    assert.ok(fs.existsSync(target), `${name}: missing ${url}`);
    if (hash && target.endsWith('.html')) {
      const targetHtml = fs.readFileSync(target, 'utf8');
      assert.ok(targetHtml.includes(`id="${hash}"`), `${name}: missing anchor ${url}`);
    }
    links++;
  }
}
for (const name of ['app.js', 'smart-home.js']) new vm.Script(fs.readFileSync(path.join(dist, name), 'utf8'), {filename:name});
const smartJs = fs.readFileSync(path.join(dist, 'smart-home.js'), 'utf8');
const assets = JSON.parse(smartJs.match(/const ASSETS = (\{.*?\});/s)[1]);
for (const asset of Object.values(assets)) assert.ok(fs.existsSync(path.join(dist, asset)), `Missing ${asset}`);
const smartHtml = fs.readFileSync(path.join(dist, 'smart-home.html'), 'utf8');
for (const m of smartHtml.matchAll(/data-asset="([^"]+)"/g)) assert.ok(assets[m[1]], `Missing image key ${m[1]}`);
for (const m of smartJs.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)) assert.ok(smartHtml.includes(`id="${m[1]}"`), `Missing interaction target ${m[1]}`);
const app = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
assert.ok(app.includes('href="smart-home.html"'));
assert.ok(fs.readFileSync(path.join(dist, 'content.css'), 'utf8').includes('nth-child(4)::before{content:"04"}'));
assert.ok(smartHtml.includes('src="assets/brands/robust.png"'));
assert.ok(smartHtml.includes('href="https://robustx.tw/index.html"'));
console.log(`PASS: ${pages.length} pages, ${links} local links/assets, ${Object.keys(assets).length} smart-home images, JS syntax, interaction targets and navigation.`);
