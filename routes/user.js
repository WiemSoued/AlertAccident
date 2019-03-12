const express = require("express");
const app = express();
const User = require("../models/user");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Getting data ...");
  const users = await User.find().sort("nom");
  res.send(users);
  console.log(users);
});

module.exports = router;
