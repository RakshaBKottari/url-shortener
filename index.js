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
  res.send("Welcome to the Random Jokes API!");
});

// Use the main router for all routes
const jokeRoutes = require("./routes/route");
app.use("/v1", jokeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
