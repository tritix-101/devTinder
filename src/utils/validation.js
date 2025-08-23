const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter Full Name");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("first name should be 4-50 characters only");
  } else if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Last name should be 4-50 characters only");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong password");
  }
};

const validateProfileData=(req)=>{
  const allowedEditFields=["firstName","lastName","email","gender","photoUrl","age","skills","about"];
  const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field))

  return isEditAllowed;
}

const valiadteEditPassword=(req)=>{
  const allowedEditFields=["existingPassword","newPassword"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
}

module.exports = {
  validateSignupData,
  validateProfileData,
  valiadteEditPassword,
};
