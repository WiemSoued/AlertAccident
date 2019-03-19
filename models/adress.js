const Joi = require("joi");
const mongoose = require("mongoose");

const adressSchema = new mongoose.Schema({
  rue: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 50
  },
  batiment: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  codePostal: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 20
  },

  ville: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 40
  },

  numeroMaison: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 20
  }
});

const Adress = mongoose.model("Adress", adressSchema);

function validateAdress(Adress) {
  const schema = {
    rue: Joi.string()
      .min(3)
      .max(50)
      .required(),

    batiment: Joi.string()
      .min(3)
      .max(30)
      .required(),
    codePostal: Joi.string()
      .min(3)
      .max(20),

    ville: Joi.string()
      .min(3)
      .max(40),
    numeroMaison: Joi.string()
      .min(1)
      .max(20)
  };

  return Joi.validate(Adress, schema);
}

/////////////////////////////// EXPORTED MODULES /////////////////////////
exports.Adress = Adress;
exports.validate = validateAdress;
module.exports = mongoose.model("Adress", adressSchema);
