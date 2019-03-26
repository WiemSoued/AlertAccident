const mongoose = require("mongoose");
const joi = require("joi");

const accidentSchema = new mongoose.Schema({
  nature: {
    enum: ["Accident routier", "Incendie", "Inondation"],
    required: false
  },
  gravite: {
    enum: ["Normal", "Grave", "Tres grave"],
    required: false
  },

  date: {
    type: Date,
    required: false
  },
  localisation: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 100
  },
  descriptionTextuelle: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 200
  }
});
