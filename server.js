// GreenMap AI - Smart Energy Search backend
// This small server keeps your SerpAPI key hidden from users
// and proxies search requests so the app can get live results.

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow requests from your app

// Put your SerpAPI key here (kept safely on the server, never sent to users)
const SERPAPI_KEY = "7f426beafbf739baf148bc7e6dffed78be71672ee2ed662e0dd9f81956330292";

app.get("/", (req, res) => {
  res.send("GreenMap AI search backend is running.");
});

app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing search query (?q=...)" });
  }

  const fullQuery = q + " price buy online";
  const url = "https://serpapi.com/search.json?engine=google&q=" +
    encodeURIComponent(fullQuery) + "&api_key=" + SERPAPI_KEY;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: String(err) });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Backend running on port " + listener.address().port);
});
