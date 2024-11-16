const express = require("express");

const crypto = require("crypto");

// In-memory storage for URL mapping
const urlMap = new Map();
const shortenUrl = express.Router();

/**
 * Shortens a given URL.
 */
shortenUrl.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Create a hash (short version of the URL)
  const shortUrl = crypto
    .createHash("md5")
    .update(url)
    .digest("hex")
    .substring(0, 6);

  // Store the mapping in memory
  urlMap.set(shortUrl, url);

  // Dynamically construct the full shortened URL
  const fullShortUrl = `${req.protocol}://${req.get("host")}/v1/${shortUrl}`;

  // Respond with the shortened URL
  res.json({ originalUrl: url, shortUrl: fullShortUrl });
});

/**
 * Redirects to the original URL based on the shortened URL.
 */
const redirectUrl = (req, res) => {
  const { shortUrl } = req.params;

  // Find the original URL
  const originalUrl = urlMap.get(shortUrl);

  console.log("hehe", originalUrl);
  if (!originalUrl) {
    return res.status(404).json({ error: "Shortened URL not found" });
  }

  // Redirect to the original URL
  res.redirect(originalUrl);
};

module.exports = { shortenUrl, redirectUrl };
