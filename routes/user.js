const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const validate = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

///////////////// GET ALL DATA ////////////////////////////
router.get("/", async (req, res) => {
  console.log("Getting data ...");
  const users = await User.find().sort("nom");
  res.send(users);
  console.log(users);
});

//////////////// GET DATA BY ID /////////////////////
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("Erreur : Identifiant introuvable...");
  res.send(user);
  console.log(user);
});

//////////////// GET DATA BY CIN /////////////////////

console.log("procedding ...");
router.get("/CIN/:CIN", async (req, res) => {
  const user = await User.findById(req.params.CIN);
  if (!user) return res.status(404).send("Erreur : Identifiant introuvable...");
  res.send(user);
  console.log(user);
  console.log(req.params.CIN);
});

// /////////////////////////// POST DATA WITH HASHED PASSWORD ////////////////
router.post("/", async (req, res) => {
  console.log("posting ...");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Vous ete déjà enregistrer...");

  user = new User(
    _.pick(req.body, [
      "nom",
      "CIN",
      "prenom",
      "email",
      "adress",
      "telephone",
      "permis",
      "password",
      "nomUser",
      "agenceAssurance"
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
  console.log(user);
});

// const token = user.generateAuthToken();
// res
//   .header("x-auth-token", token)
//   .send(_.pick(user, ["_id", "name", "email"]));
// });

///////////////////////////// DELETE DATA BY ID //////////////////////////
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("Erreur lors de la suppression : Identiant introuvable ...");
  res.send(user);
  console.log("deleted with succes ...");
 
});

/////////////////////// LOG OUT METHODE ////////////////////////////

// router.get("/logout", function(req, res, next) {
//   var logout = function(req, res, next) {
//     // Get rid of the session token. Then call `logout`; it does no harm.
//     req.logout();
//     req.session.destroy(function(err) {
//       if (err) {
//         return next(err);
//       }
//       // The response should indicate that the user is no longer authenticated.
//       return res.send({ authenticated: req.isAuthenticated() });
//       console.log("termenating the log out process ...");
//     });
//   };
// });

// router.get("/", function(req, res) {
//   function logout(req, res) {
//     delete req.session;
//     console.log("loggin into the methde...");
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/");
//     }
//     return logout();
//   }
// });
module.exports = router;
