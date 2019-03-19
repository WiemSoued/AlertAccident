const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Nom d'utlisateur invalide...`);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(`Nom d'utlisateur invalide...PASSWORD`);

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
