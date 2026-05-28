const {model} = require("mongoose");
const  sensorDataSchema = require("../schema/sencer");
const sensorModel = model("sensorModel",sensorDataSchema);
module.exports = sensorModel;