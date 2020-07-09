import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scrapeGithub from "./scrape_github.mjs";
import sendEmail from "./contact_form.mjs";
import bodyParser from "body-parser";
import "./contact_form.mjs";

const app = express();
const port = 3000;

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log("origin", process.env.CORS_ORIGIN);
console.log("env", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("in production");
  app.use(cors(corsOptions));
} else {
  console.log("in development");
  app.use(cors());
}

app.use(bodyParser.json());

// RETRIEVES GITHUB CONTRIBUTIONS NUMBER VIA PUPPETEER
app.get("/scrape_github", cors(corsOptions), async (req, res) => {
  console.log("scrape_github connected...");
  // console.log(req);
  const data = await scrapeGithub("https://github.com/domferris");

  res.send(data);
});

// CONTACT FORM
app.post("/contact", cors(corsOptions), async (req, res) => {
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
