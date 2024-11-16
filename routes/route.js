const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/urlService");

// POST /shorten - Shorten a URL
router.use(shortenUrl);

// GET /:shortUrl - Redirect to the original URL
router.get("/:shortUrl", redirectUrl);

module.exports = router;
