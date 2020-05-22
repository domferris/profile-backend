const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/github_scrape", (req, res) => {
  console.log("github_scrape");
  res.json({ text: "Hello World!" });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
