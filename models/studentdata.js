const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentFirstName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },

  studentMiddleName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },

  studentLastName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },

  studentEmail: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  studentContactNumber: {
    type: String,
    required: true,
    min: 10,
    max: 14,
  },

  studentBirthdate: {
    type: String,
    required: true,
  },

  studentGender: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Students", studentSchema);
