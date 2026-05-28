const { Schema, connection } = require("mongoose");
const { add } = require("./userSchema");
const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    contact:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    connection: {
        type: String, enum: ["Domestic", "Commercial"],
        required: true
    },
    meter:{
        type: String,
        },
    usage:{
        type: Number,       
        },
    
});
module.exports = {customerSchema};