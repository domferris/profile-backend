import express from "express";
import cors from "cors";
import scrapeGithub from "./scrape_github.mjs";
import sendEmail from "./contact-form.mjs";
import bodyParser from "body-parser";
import "./contact-form.mjs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// RETRIEVES GITHUB CONTRIBUTIONS NUMBER VIA PUPPETEER
app.get("/scrape_github", async (req, res) => {
  console.log("scrape_github connected...");

  const data = await scrapeGithub("https://github.com/domferris");

  res.send(data);
});

// CONTACT FORM
app.post("/contact", async (req, res) => {
  console.log("contact connected...");
  // console.log(req.body);
  sendEmail(req.body);
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Profile backend listening at ${this.address().port}`);
});
