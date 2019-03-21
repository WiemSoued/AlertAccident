const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const validate = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const { check } = require("express-validator/check");
const boom = require("boom");
const validator = require("../validators/user");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());

///////////////// GET ALL DATA ////////////////////////////
router.get("/GetAll", async (req, res) => {
  const users = await User.find().sort("nom");
  if (users)
    res.send({
      status: "200",
      message: "Opération efectuée avec sucée...",
      users: users
    });
  console.log(users);
  if (!users)
    res.send({ status: "400", message: "Aucun utilisateur trouvée..." });
});

//////////////// GET DATA BY ID /////////////////////
router.get("/GetById/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user)
    res.send({
      status: "200",
      message: "Opération efectuée avec sucée...",
      user: user
    });
  if (!user)
    return res.send({
      status: "400",
      message: "Aucun utilisateur trouvée..."
    });
  console.log(user);
});

//////////////// GET DATA BY CIN /////////////////////

router.get("/GetByCIN/:CIN", async (req, res) => {
  const user = await User.findOne(req.params.CIN);
  if (user)
    res.send({
      status: "200",
      message: "Opération efectuée avec sucée...",
      user: user
    });
  if (!user)
    return res.status(400).send({
      status: "400",
      message: "Aucun utilisateur trouvée..."
    });
  res.send(user);
  console.log(user);
  console.log(req.params.CIN);
});

// /////////////////////////// POST DATA WITH HASHED PASSWORD ////////////////
//router.post("/Post/", validator.checkCreateUser, async (req, res) => {
router.post("/Post/", async (req, res) => {
  req
    .checkBody("nom")
    .not()
    .isEmpty()
    .withMessage("Champ obligatoire")
    .isAlpha()
    .withMessage("Nom doit être une chaine des caractéres")
    .isLength({ min: 3 }, { max: 50 })
    .withMessage("Longeur de champ invalide "),
    req
      .checkBody("prenom")
      .not()
      .isEmpty()
      .withMessage("Champ obligatoire")
      .isAlpha()
      .withMessage("Prénom doit être une chaine des caractéres")
      .isLength({ min: 3, max: 70 })
      .withMessage("Longeur de champ invalide"),
    req
      .checkBody("CIN")
      .not()
      .isEmpty()
      .withMessage("Champ obligatoire")
      .isAlphanumeric()
      .withMessage("CIN doit être une suite des nombres")
      .isLength({ min: 8, max: 8 })
      .withMessage("Longeur du CIN doit être égale à 8"),
    req
      .checkBody("email")
      .not()
      .isEmpty()
      .withMessage("Champ obligatoire")
      .isEmail()
      .withMessage("Format de email non respectée"),
    req.checkBody("adresse");
  // .isAlpha()
  // .withMessage("Adresse doit être une chaine des caractéres")
  // .isLength({ min: 3, max: 100 })
  // .withMessage(`Longeur d'adresse invalide`),
  req
    .checkBody("telephone")
    .isAlphanumeric()
    .withMessage("Telephone doit être une suite des nombres")
    .isLength({ min: 5, max: 20 })
    .withMessage(`Longeur du telephone invalide`),
    req
      .checkBody("permis")
      .isAlphanumeric()
      .withMessage("Chaine invalide")
      .isLength({ min: 3, max: 30 })
      .withMessage(`Longeur du permis invalide`),
    req
      .checkBody("password")
      .not()
      .isEmpty()
      .withMessage("Champ obligatoire")
      .isAlphanumeric()
      .withMessage("Chaine invalide")
      .isLength({ min: 3, max: 255 })
      .withMessage(`Longeur du mot de passe invalide`),
    req
      .checkBody("nomUser")
      .not()
      .isEmpty()
      .withMessage("Champ obligatoire")
      .isAlphanumeric()
      .withMessage("Chaine invalide")
      .isLength({ min: 3, max: 50 })
      .withMessage(`Longeur du nom d'ultisateur invalide`),
    req
      .checkBody("agenceAssurance")
      .isAlphanumeric()
      .withMessage("Chaine invalide")
      .equals("GAT", "STAR", "COMAR", "Maghrebia", "AMI")
      .withMessage(`Agence d'assurance invalide`);

  var errors = req.validationErrors();
  
  if (errors) {
    errors = errors.map(error => {
      return {
        param: error.param,
        msg: error.msg,
        value: error.value
      };
    });
    return res.status(400).send({
      status: "400",
      message: "Erreur de validation...",
      errors
    });
  }

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

  if (!errors)
    return res.status(200).send({
      status: "200",
      user
    });
  console.log(user);
});

// const token = user.generateAuthToken();
// res
//   .header("x-auth-token", token)
//   .send(_.pick(user, ["_id", "name", "email"]));
// });

///////////////////////////// DELETE DATA BY ID //////////////////////////
router.delete("/Delete/:id", async (req, res) => {
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

////////////////////////////// VALIDATOR IMAGE MESSAGE ERREUR RETOUR DE DONNEE//////
