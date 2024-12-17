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

module.exports = {
  validateSignUpData,
};
