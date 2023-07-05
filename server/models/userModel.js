const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
}); 

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
