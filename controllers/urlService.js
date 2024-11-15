const express = require("express");
const shorternurl = express.Router();

const {
  generateShortCode,
  getOriginalUrl,
  saveUrlMapping,
} = require("../controllers/dataHandler");

/**
 * POST /shorten
 * Description: Shorten a URL.
 * Method: POST
 * Request Body: { longUrl: string }
 * Response: { originalUrl: string, shortUrl: string }
 */
shorternurl.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl || !longUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortCode = generateShortCode();
  saveUrlMapping(shortCode, longUrl);

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    originalUrl: longUrl,
    shortUrl: `${baseUrl}/${shortCode}`,
  });
});

/**
 * GET /:shortUrl
 * Description: Redirect to the original URL using the short URL.
 * Method: GET
 * Path Parameter: shortUrl (string)
 * Response: Redirects to the original URL or returns a 404 error if not found.
 */
shorternurl.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const longUrl = getOriginalUrl(shortUrl);

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

module.exports = shorternurl;
