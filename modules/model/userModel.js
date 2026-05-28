const {model} = require("mongoose");
const userSchema = require("../schema/userSchema");
const User = model("User", userSchema);
module.exports = User; 