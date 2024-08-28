import puppeteer from "puppeteer";
import fs from "fs";

//Link
const link = ""; //Link of the site which contains table you want to scrape

//Function to scrape the table from wanted website
const getTable = async () => {
  //To launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  //Creates a new tab
  const page = await browser.newPage();

  //Go to the mentioned link
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  //To grab table and its contents
  const table = await page.evaluate(() => {
    const tableSelector = document.querySelector(
      ".wikitable.plainrowheaders.wikiepisodetable",
    );

    const tableRowSelector = tableSelector?.querySelectorAll(
      ".vevent.module-episode-list-row",
    );

    const rows: any = {};

    if (tableRowSelector) {
      for (let i = 0; i < tableRowSelector.length; i++) {
        const rowContent = tableRowSelector[i]?.querySelectorAll("td");

        const content: any = {};

        if (rowContent) {
          for (let i = 0; i < rowContent?.length; i++) {
            const something = rowContent[i]?.innerText;
            content[i] = something;
          }
        }

        rows[i] = content;
      }
    }

    return rows;
  });

  console.log(table);

  fs.writeFileSync("", JSON.stringify(table)); //In quotes enter the file name or folder with file name you want to save the scrapped table

  await browser.close();
};

getTable();
