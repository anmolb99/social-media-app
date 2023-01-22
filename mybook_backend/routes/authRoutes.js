const express = require("express");
const router = express.Router();

router.post("/verify", (req, res) => {
  res.send("hehhehe");
});

module.exports = router;
