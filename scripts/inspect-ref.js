const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log("Navigating to https://v0-modern-agentic.vercel.app/...");
    await page.goto("https://v0-modern-agentic.vercel.app/", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    const info = await page.evaluate(() => {
      const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => ({
        width: c.width,
        height: c.height,
        className: c.className,
        id: c.id,
        style: c.getAttribute("style"),
      }));

      // Check fixed or absolute positioned background divs
      const fixedDivs = Array.from(document.querySelectorAll("div")).filter((d) => {
        const style = window.getComputedStyle(d);
        return (
          (style.position === "fixed" || style.position === "absolute") &&
          (style.zIndex === "-1" || style.zIndex === "0" || parseInt(style.zIndex) < 1)
        );
      }).map((d) => ({
        tag: d.tagName,
        className: d.className,
        style: d.getAttribute("style"),
        id: d.id,
      }));

      return {
        title: document.title,
        bodyClass: document.body.className,
        canvases,
        fixedDivs: fixedDivs.slice(0, 10),
      };
    });

    console.log("Inspected info:", JSON.stringify(info, null, 2));

    await page.screenshot({ path: "scripts/ref-screenshot.png" });
    console.log("Saved screenshot to scripts/ref-screenshot.png");
  } catch (err) {
    console.error("Inspection error:", err.message);
  } finally {
    await browser.close();
  }
}

run();
