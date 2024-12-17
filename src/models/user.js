const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo Url");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default deception about the user...",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

//you want  to sanitize tha data before send the data base
