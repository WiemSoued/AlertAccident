const express = require("express");
const Adress = require("../models/adress");
const router = express.Router();

///////////// GET ALL DATA ////////////////////////////
router.get("/", async (req, res) => {
  console.log("Getting data ...");
  const adress = await Adress.find();
  res.send(adress);
  console.log(adress);
});

router.post("/", async (req, res) => {
  console.log("Inserting data ...");
  const adr = new Adress({ rue: req.body.rue });
  adr = await adr.save();

  res.send(adr);
  console.log(adr);
});

module.exports = router;
