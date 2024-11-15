const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data.json");

// Helper: Read data from the file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(dataFilePath));
};

// Helper: Write data to the file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Generate a unique short code
const generateShortCode = () => crypto.randomBytes(3).toString("hex");

// Save mapping of short URL to original URL
const saveUrlMapping = (shortCode, longUrl) => {
  const data = readData();
  data[shortCode] = longUrl;
  writeData(data);
};

// Retrieve the original URL from a short code
const getOriginalUrl = (shortCode) => {
  const data = readData();
  return data[shortCode];
};

module.exports = { generateShortCode, saveUrlMapping, getOriginalUrl };
