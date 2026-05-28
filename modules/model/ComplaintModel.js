const {model} = require("mongoose");
const complainSchema = require("../schema/CompalinSchema");
const Compmaint = new  model("Complaint",complainSchema);
module.exports = Compmaint;