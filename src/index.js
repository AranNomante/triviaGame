const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const axios = require("axios");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use("/public", express.static(path.join(__dirname, "../public")));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// get categories http://jservice.io/api/categories?count=20&offset=0 offset for pagination

// get questions http://jservice.io/api/clues?category=5412&offset=0 offset for pagination
app.post("/api/categories", (req, res) => {
  const { offset } = req.query;
  try {
    axios
      .get(`http://jservice.io/api/categories?count=5&offset=${offset}`)
      .then(function ({ data }) {
        res.send(data).status(200).end();
      });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});
app.post("/api/clues", (req, res) => {
  const { category, offset } = req.query;
  try {
    axios
      .get(`http://jservice.io/api/clues?category=${category}&offset=${offset}`)
      .then(function ({ data }) {
        res.send(data[0]).status(200).end();
      });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});
