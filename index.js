const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/github_scrape", (req, res) => {
  console.log("github_scrape connected...");
  const data = scrapeGithub("https://github.com/domferris");
  console.log(data);
  res.json(data);
});

app.listen(port, () =>
  console.log(`Profile backend listening at http://localhost:${port}`)
);

// PUPPETEER
const puppeteer = require("puppeteer");

const scrapeGithub = async (profile) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(profile);

  const contributions = await page.$eval(
    ".js-yearly-contributions h2",
    (element) => {
      return element.innerText.match(/\d+/)[0];
    }
  );

  const data = {
    contributions: 0,
  };

  const contributionsNum = parseInt(contributions, 10);

  console.log(data);
  data.contributions += contributionsNum;
  console.log(data);

  await browser.close();

  return data;
};
