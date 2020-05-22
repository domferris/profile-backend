const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/github_scrape", (req, res) => {
  console.log("github_scrape");
  const data = scrapeGithub();
  // res.json({ text: "Hello World!" });
  res.json(data);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// PUPPETEER
const puppeteer = require("puppeteer");

const scrapeGithub = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/domferris");

  const content = await page.content();
  console.log(content);

  await browser.close();
  return { content: content };
};
