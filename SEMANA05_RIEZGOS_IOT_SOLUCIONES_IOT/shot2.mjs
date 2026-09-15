import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 860 } });
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
await page.goto("http://localhost:4175/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const go = async (i) => {
  await page.evaluate((idx) => {
    const el = document.querySelector(".scrollstage");
    el.scrollTo({ top: idx * el.clientHeight, behavior: "instant" });
  }, i);
  await page.waitForTimeout(900);
};

// smart home hotspot
await go(2);
await page.getByLabel("Cerradura inteligente").click();
await page.waitForTimeout(600);
await page.screenshot({ path: "shots/i2.jpg", quality: 70, type: "jpeg" });

// camera lab: weak password attack
await go(4);
await page.getByRole("button", { name: /Lanzar ataque/i }).click();
await page.waitForTimeout(2600);
await page.screenshot({ path: "shots/i4.jpg", quality: 70, type: "jpeg" });

// lock lab: intercept + replay (no encryption)
await go(5);
await page.getByRole("button", { name: /Interceptar/i }).click();
await page.getByRole("button", { name: /Reenviar/i }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/i5.jpg", quality: 70, type: "jpeg" });

// botnet
await go(6);
await page.getByRole("button", { name: /Lanzar Mirai/i }).click();
await page.waitForTimeout(3200);
await page.screenshot({ path: "shots/i6.jpg", quality: 70, type: "jpeg" });

// practices
await go(7);
await page.getByRole("button", { name: /Activar todo/i }).click();
await page.waitForTimeout(1200);
await page.screenshot({ path: "shots/i7.jpg", quality: 70, type: "jpeg" });

// risks flip
await go(3);
await page.locator("section:nth-child(4) button").first().click();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/i3.jpg", quality: 70, type: "jpeg" });

await browser.close();
console.log("interactions ok");
