import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const consoleErrors = [];
const networkErrors = [];
const networkRequests = [];

page.on('console', msg => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    consoleErrors.push({ type: msg.type(), text: msg.text() });
  }
});

page.on('requestfailed', req => {
  networkErrors.push({ url: req.url(), failure: req.failure()?.errorText });
});

page.on('response', res => {
  if (res.status() >= 400) {
    networkRequests.push({ url: res.url(), status: res.status() });
  }
});

console.log('Navigating to http://localhost:3000...');
try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
} catch (e) {
  console.error('Navigation error:', e.message);
}

await page.waitForTimeout(3000);

// Check what's in the page body
const bodyHTML = await page.evaluate(() => document.body.innerHTML);
const sliceZone = await page.evaluate(() => {
  const sliceEls = document.querySelectorAll('[data-slice-type], section, [class*="slice"], [class*="Slice"]');
  return Array.from(sliceEls).map(el => ({
    tag: el.tagName,
    class: el.className,
    dataSliceType: el.getAttribute('data-slice-type'),
    textPreview: el.innerText?.slice(0, 100)
  }));
});

const title = await page.title();
console.log('\n=== PAGE TITLE ===');
console.log(title);

console.log('\n=== CONSOLE ERRORS/WARNINGS ===');
if (consoleErrors.length === 0) console.log('None');
consoleErrors.forEach(e => console.log(`[${e.type.toUpperCase()}] ${e.text}`));

console.log('\n=== NETWORK FAILURES ===');
if (networkErrors.length === 0) console.log('None');
networkErrors.forEach(e => console.log(`FAILED: ${e.url} — ${e.failure}`));

console.log('\n=== HTTP 4xx/5xx RESPONSES ===');
if (networkRequests.length === 0) console.log('None');
networkRequests.forEach(r => console.log(`${r.status}: ${r.url}`));

console.log('\n=== SLICE/SECTION ELEMENTS FOUND ===');
if (sliceZone.length === 0) {
  console.log('NO SLICE ELEMENTS FOUND');
} else {
  sliceZone.forEach(el => console.log(JSON.stringify(el)));
}

console.log('\n=== BODY HTML (first 3000 chars) ===');
console.log(bodyHTML.slice(0, 3000));

// Screenshot
await page.screenshot({ path: '/tmp/homepage-debug.png', fullPage: true });
console.log('\n=== Screenshot saved to /tmp/homepage-debug.png ===');

await browser.close();
