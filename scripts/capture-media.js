const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, "..", "public", "media");
const FRAMES_DIR = path.join(__dirname, "frames");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Chrome via puppeteer-core...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--window-size=1440,920"],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2, // Retina 2x for ultra crisp screenshots
    },
  });

  const page = await browser.newPage();

  // 1. Screenshot: Hero Section
  console.log("Capturing 1/6: Hero Section...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  // 2. Screenshot: Component Playground
  console.log("Capturing 2/6: Component Playground...");
  await page.goto("http://localhost:3000/components", { waitUntil: "networkidle0" });
  await page.waitForSelector("#button");
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-components.png"),
    clip: { x: 0, y: 0, width: 1440, height: 960 },
  });

  // 3. Screenshot: Resource Discovery Directory
  console.log("Capturing 3/6: Resource Directory...");
  await page.goto("http://localhost:3000/resources", { waitUntil: "networkidle0" });
  await page.waitForSelector("article");
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-resources.png"),
    clip: { x: 0, y: 0, width: 1440, height: 960 },
  });

  // 4. Screenshot: Design Foundations (Color Tokens Matrix)
  console.log("Capturing 4/6: Design Foundations...");
  await page.goto("http://localhost:3000/#foundations", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    const el = document.getElementById("foundations");
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-foundations.png"),
    clip: { x: 0, y: 0, width: 1440, height: 960 },
  });

  // 5. Screenshot: Quick Guide & Shortcuts Modal
  console.log("Capturing 5/6: Shortcuts Modal...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  // Click the How to use button in header
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Quick Guide"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-modal.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 6. Screenshot: User Manual & Platform Guide
  console.log("Capturing 6/6: User Guide Page...");
  await page.goto("http://localhost:3000/guide", { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "screenshot-guide.png"),
    clip: { x: 0, y: 0, width: 1440, height: 960 },
  });

  // NOW: Capture animation frames for high quality GIF walkthrough
  console.log("Capturing animation frames for walkthrough GIF...");
  await page.setViewport({ width: 1200, height: 750, deviceScaleFactor: 1 });

  // Frame 1: Hero view
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_01.png") });

  // Frame 2: Hover over orb in hero
  await page.hover('svg[aria-label="DSM Geometric Hero Artwork"] circle[fill="url(#goldenOrbGradient)"]');
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_02.png") });

  // Frame 3: Scroll down to Resource Discovery Panel
  await page.evaluate(() => {
    const discovery = document.getElementById("discovery");
    if (discovery) discovery.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_03.png") });

  // Frame 4: Type into search input
  await page.type('input[placeholder*="Search specifications"]', "Tokens", { delay: 100 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_04.png") });

  // Frame 5: Filter by topic
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const tokenBtn = btns.find((b) => b.textContent.trim() === "Tokens");
    if (tokenBtn) tokenBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_05.png") });

  // Frame 6: Scroll down to Component Showcase
  await page.evaluate(() => {
    const comp = document.getElementById("components");
    if (comp) comp.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_06.png") });

  // Frame 7: Switch component to Form Input
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const inputBtn = btns.find((b) => b.textContent.trim() === "Form Input");
    if (inputBtn) inputBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_07.png") });

  // Frame 8: Switch component to Dialog Modal & trigger
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const modalBtn = btns.find((b) => b.textContent.trim() === "Dialog (Modal)");
    if (modalBtn) modalBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_08.png") });

  // Frame 9: Scroll to Foundations & Color tokens
  await page.evaluate(() => {
    const found = document.getElementById("foundations");
    if (found) found.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_09.png") });

  // Frame 10: Open Quick Guide & Shortcuts Modal
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Quick Guide"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(FRAMES_DIR, "frame_10.png") });

  await browser.close();
  console.log("All screenshots and frames captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
