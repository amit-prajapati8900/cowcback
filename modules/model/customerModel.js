const {model} = require("mongoose");
const {customerSchema} = require("../schema/contomer");
const customerModel = model("customer",customerSchema);
module.exports = customerModel;
