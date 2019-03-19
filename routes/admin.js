const express = require("express");
const app = express();
const Admin = require("../models/admin");
const mongoose = require("mongoose");
const router = express.Router();

///////////// GET ALL DATA ////////////////////////////
router.get("/", async (req, res) => {
  console.log("Getting data ...");
  const admin = await Admin.find().sort("nom");
  res.send(admin);
  console.log(admin);
});

//////////////// GET DATA BY ID /////////////////////
router.get("/:id", async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin)
    return res
      .status(404)
      .send("Erreur : Identifiant administrateur introuvable...");
  res.send(admin);
  console.log(admin);
});

///////////////////////////// DELETE DATA BY ID //////////////////////////
router.delete("/:id", async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin)
    return res
      .status(404)
      .send(
        "Erreur lors de la suppression d'administrateur: Identfiant introuvable ..."
      );
  res.send(admin);
  console.log("deleted with succes ...");
});

module.exports = router;
