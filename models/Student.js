const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "Enter first name",
    },
    lastName: {
      type: String,
      required: "Enter last name",
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    created_date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);
