const { required, string } = require("joi");
const {Schema} = require("mongoose");
// const { default: Status } = require("../../../frontend/src/pages/Customer/Status");
const complainSchema = new Schema({
    customerId:{
      type:Number,
      undefined: true,
      required:true,  
    },
    customerName:{
      type:String,
      required:true,
    },
    contact:{
      type:Number,
      required:true,
    },
    type:{
    type: String, enum: ["Billing", "Service Related", "Meter", "Other"],
    required:true,
    },
    description:{
      type:String,
      required:true,
    },
    status:{
    type: String, enum: ["pending", "resolved"],
    required: true
    },
});
module.exports = complainSchema;