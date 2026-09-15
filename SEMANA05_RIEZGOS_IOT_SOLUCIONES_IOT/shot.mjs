import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 860 } });
await page.goto("http://localhost:4174/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const scenes = Number(process.argv[2] || 9);
for (let i = 0; i < scenes; i++) {
  await page.evaluate((idx) => {
    const el = document.querySelector(".scrollstage");
    if (el) el.scrollTo({ top: idx * el.clientHeight, behavior: "instant" });
  }, i);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots/s${i}.jpg`, quality: 70, type: "jpeg" });
}
await browser.close();
console.log("done");
