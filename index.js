const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// RETRIEVES GITHUB CONTRIBUTIONS NUMBER
app.get("/scrape_github", async (req, res) => {
  console.log("scrape_github connected...");

  const data = await scrapeGithub("https://github.com/domferris");

  // console.log("inside call => ");
  // console.log(data);

  res.send(data);
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Profile backend listening at ${this.address().port}`);
});

////////////////// PUPPETEER //////////////////
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
    contributionsNum: 0,
  };

  const contributionsNum = parseInt(contributions, 10);

  data.contributionsNum += contributionsNum;

  // console.log("inside function => ");
  // console.log(data);

  await browser.close();

  return data;
};

////////////////// CONTACT FORM //////////////////
