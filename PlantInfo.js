const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlantInfoSchema = new Schema({
  id: {
    type: String,
  },
  latin: {
    type: String,
  },
  family: {
    type: String,
  },
  common: {
    type: Array,
  },
  category: {
    type: String,
  },
  origin: {
    type: String,
  },
  climate: {
    type: Number,
  },
  tempmax: {
    type: { celsius: Number, fahrenheit: Number },
  },
  tempmin: {
    type: { celsius: Number, fahrenheit: Number },
  },
  ideallight: {
    type: Number,
  },
  toleratedlight: {
    type: Number,
  },
  watering: {
    type: String,
  },
  insects: {
    type: Array,
  },
  diseases: {
    type: String,
  },
  use: {
    type: Array,
  },
});

module.exports = mongoose.model("PlantInfo", PlantInfoSchema);
