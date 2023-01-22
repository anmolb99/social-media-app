const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchemema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    default: "",
  },
  posts: {
    type: Array,
    default: [],
  },
});

mongoose.model("User", userSchemema);
