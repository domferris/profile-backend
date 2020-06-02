// RETRIEVES GITHUB CONTRIBUTIONS NUMBER
import puppeteer from "puppeteer";

const scrapeGithub = async (profile) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
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

  await browser.close();

  return data;
};

export default scrapeGithub;
