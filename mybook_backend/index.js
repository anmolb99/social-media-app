const bodyParser = require("body-parser");
const express = require("express");
const port = 5000;
const app = express();

require("./db");
require("./models/User");

app.use(express.static(__dirname + "/Images/ProfilePics"));
app.use(express.static(__dirname + "/Images/Posts"));

const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
