const crypto = require("crypto");

let urlMappings = {}; // In-memory storage

// Helper: Read data from memory
const readData = () => {
  return urlMappings;
};

// Helper: Write data to memory
const writeData = (data) => {
  urlMappings = { ...data };
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
