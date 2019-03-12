const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  CIN: {
    type: String,
    required: true,
    length: 8
  },
  nom: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  prenom: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true
  },
  adresse: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 100,
    unique: false
  },
  telephone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: false
  },
  photo: {
    type: String,
    required: true
    //**********
  },
  permis: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  nomUser: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  agenceAssurance: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 50
  }
  //ENUMERATION AGENCE + INSERT PHOTO + DECOMPOSITION ADRESSE
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    nom: Joi.string()
      .min(3)
      .max(50)
      .required(),
    CIN: Joi.string()
      .length(8)
      .required(),
    prenom: Joi.string()
      .min(3)
      .max(70)
      .required(),
    email: Joi.string()
      .min(10)
      .max(50)
      .required()
      .email(),
    adresse: Joi.string()
      .min(3)
      .max(50),
    telephone: Joi.string()
      .min(10)
      .max(50)
      .required(),
    //photo: Joi.,
    permis: Joi.string()
      .min(11)
      .max(30)
      .required(),
    password: Joi.string()
      .min(5)
      .max(20)
      .required(),
    nomUser: Joi.string()
      .min(5)
      .max(50)
      .required(),
    agenceAssurance: Joi.string()
      .min(2)
      .max(50)
  };

  return Joi.validate(user, schema);
}

/////////////////////////////// EXPORTED MODULES /////////////////////////
exports.User = User;
exports.validateUser = validateUser;
module.exports = mongoose.model("User", userSchema);
