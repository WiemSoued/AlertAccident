const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/Login", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      status: "400",
      message: "Erreur de validation...",
      errors
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      status: "400",
      message: "Email invalide..."
    });

  if (!error)
    return res.status(200).send({
      status: "200",
      message: "Opération effectuée avec succées..",
      data: user
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password);
  console.log(user.password);
  if (!validPassword)
    return res.status(400).send({
      status: "400",
      message: "Mot de passe invalide..."
    });

  res.send("Connecter avec sucées ...");
  const token = user.generateAuthToken();
  res.send(token);

  console.log("auth methode");
  console.log(token);
  console.log(validPassword);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
