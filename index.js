const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/api", (req, res) => {
  res.send("Welcome to the url generator API!");
});

// Use the main router for all routes
const urlRoutes = require("./routes/route");
app.use("/v1", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
