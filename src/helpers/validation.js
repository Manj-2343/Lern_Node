const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid firstName and LastName");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Enter a valid firstName");
  } else if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Enter a valid lastName");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong  password");
  }
};
// New validation function for login
const validateLoginData = (req) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    throw new Error("Email and password are required");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid password format");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "photoUrl",
    "gender",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData,
};
