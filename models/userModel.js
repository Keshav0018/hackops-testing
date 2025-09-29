const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your user name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide us your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      validator: function (el) {
        // This only works Create for save
        return el === this.password; // this points to  current doc
      },
      message: "Passwords are not matching",
    },
  },
});

userSchema.pre("save", async function (next) {
  // if passwrod is not modified that could be during update then return
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Instance method
userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
