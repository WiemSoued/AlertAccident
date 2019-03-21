const Joi = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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

  photo: {
    type: String,
    required: true
    //**********
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
  }
});

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = {
    nom: Joi.string()
      .min(3)
      .max(50)
      .required(),

    prenom: Joi.string()
      .min(3)
      .max(70)
      .required(),
    email: Joi.string()
      .min(10)
      .max(50)
      .required()
      .unique()
      .email(),
    password: Joi.string()
      .min(5)
      .max(20)
      .required(),
    nomUser: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(admin, schema);
}

/////////////////////////////// EXPORTED MODULES /////////////////////////
exports.Admin = Admin;
exports.validate = validateAdmin;
module.exports = mongoose.model("Admin", adminSchema);
