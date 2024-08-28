import puppeteer from "puppeteer";

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://en.wikipedia.org/wiki/One_Piece_season_1", {
    waitUntil: "domcontentloaded",
  });

  const tables = await page.evaluate(() => {
    const table = document.querySelector(
      ".wikitable.plainrowheaders.wikiepisodetable",
    );

    const tableRow = table?.querySelector(".vevent.module-episode-list-row");

    const rowContent = tableRow?.querySelectorAll("td");

    const content: any = {};

    if (rowContent) {
      for (let i = 0; i < rowContent?.length; i++) {
        const something = rowContent[i]?.innerText;
        content[i] = something;
      }
    }

    return content;
  });

  console.log(tables);

  await browser.close();
};

getQuotes();
