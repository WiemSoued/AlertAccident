//const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  CIN: {
    //type: $or[objectId,String],
    type: String,
    required: true,
    length: 8,
    unique: true
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
  adress: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  telephone: {
    type: String,
    //required: true,
    minlength: 3,
    maxlength: 50,
    unique: false
  },
  photo: {
    type: String,
    required: false
    //**********
  },
  permis: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  nomUser: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  agenceAssurance: {
    enum: ["GAT", "STAR", "COMAR", "Maghrebia", "AMI"],
    // default: "STAR",
    required: false
  },
  // INSERT PHOTO
  isArchived: Boolean
});

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };
const User = mongoose.model("User", userSchema);

// function validateUser(User) {
//   const schema = {
//     nom: Joi.string()
//       .min(3)
//       .max(50)
//       .required(),
//     CIN: Joi.string()
//       .length(8)
//       .unique()
//       .required(),
//     prenom: Joi.string()
//       .min(3)
//       .max(70)
//       .required(),
//     email: Joi.string()
//       .min(10)
//       .max(50)
//       .required()
//       .unique()
//       .email(),
//     adresse: Joi.string()
//       .min(3)
//       .max(100),
//     telephone: Joi.string()
//       .min(3)
//       .max(50),
//     // .required(),
//     //photo: Joi.
//     permis: Joi.string()
//       .min(3)
//       .max(30)
//       .required(),
//     password: Joi.string()
//       .min(3)
//       .max(255)
//       .required(),
//     nomUser: Joi.string()
//       .min(3)
//       .max(50)
//       .required(),
//     agenceAssurance: Joi.string()
//       .min(2)
//       .max(50)
//   };

//   return Joi.validate(User, schema);
// }

/////////////////////////////// EXPORTED MODULES /////////////////////////
module.exports = mongoose.model("User", userSchema);
exports.User = User;
// exports.validate = validateUser;
