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

for (const name of ['app.js', 'smart-home-i18n.js', 'smart-home.js']) {
  new vm.Script(fs.readFileSync(path.join(dist, name), 'utf8'), { filename: name });
}

const smartHtml = fs.readFileSync(path.join(dist, 'smart-home.html'), 'utf8');
const smartJs = fs.readFileSync(path.join(dist, 'smart-home.js'), 'utf8');
const smartI18nJs = fs.readFileSync(path.join(dist, 'smart-home-i18n.js'), 'utf8');

// Verify all image paths in smart-home-i18n.js exist
const i18nAssets = [...new Set([...smartI18nJs.matchAll(/['"](assets\/[^'"]+)['"]/g)].map(m => m[1]))];
for (const asset of i18nAssets) {
  assert.ok(fs.existsSync(path.join(dist, asset)), `Missing i18n asset: ${asset}`);
}

// Verify 100% bilingual key coverage
const ctx = { window: {} };
vm.runInNewContext(smartI18nJs, ctx);
const I18N = ctx.window.ROBUSTX_I18N;
assert.ok(I18N && I18N.enText && I18N.enHtml && I18N.enPlaceholder, 'smart-home-i18n.js missing dictionaries');

for (const m of smartHtml.matchAll(/data-i18n="([^"]+)"/g)) {
  assert.ok(m[1] in I18N.enText, `Missing EN text key: ${m[1]}`);
}
for (const m of smartHtml.matchAll(/data-i18n-html="([^"]+)"/g)) {
  assert.ok(m[1] in I18N.enHtml, `Missing EN html key: ${m[1]}`);
}
for (const m of smartHtml.matchAll(/data-i18n-placeholder="([^"]+)"/g)) {
  assert.ok(m[1] in I18N.enPlaceholder, `Missing EN placeholder key: ${m[1]}`);
}

// Verify interaction targets exist
for (const m of smartJs.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)) {
  assert.ok(smartHtml.includes(`id="${m[1]}"`), `Missing interaction target #${m[1]}`);
}

const app = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
assert.ok(app.includes('href="smart-home.html"'));
assert.ok(fs.readFileSync(path.join(dist, 'content.css'), 'utf8').includes('nth-child(4)::before{content:"04"}'));
assert.ok(smartHtml.includes('src="assets/brands/robust.png"'));
assert.ok(smartHtml.includes('href="https://robustx.tw/index.html"'));

console.log(`PASS: ${pages.length} pages, ${links} local links/assets, ${i18nAssets.length} smart-home i18n assets, 100% ZH/EN keys, JS syntax, interaction targets and navigation.`);
