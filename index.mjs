import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scrapeGithub from "./scrape_github.mjs";
import sendEmail from "./contact_form.mjs";
import bodyParser from "body-parser";
import "./contact_form.mjs";

const app = express();
const port = 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(bodyParser.json());

dotenv.config();

// RETRIEVES GITHUB CONTRIBUTIONS NUMBER VIA PUPPETEER
app.get("/scrape_github", async (req, res) => {
  console.log("scrape_github connected...");

  const data = await scrapeGithub("https://github.com/domferris");

  res.send(data);
});

// CONTACT FORM
app.post("/contact", async (req, res) => {
  console.log("contact connected...");
  try {
    await sendEmail(req.body);
    res.send({ status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Profile backend listening at ${this.address().port}`);
});
