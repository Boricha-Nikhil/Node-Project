const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    password: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required:true
    }
  });
  
  const User = mongoose.model("users", UserSchema);
  
  module.exports = User;