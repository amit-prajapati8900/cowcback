const { required } = require("joi");
const {Schema} = require("mongoose");
const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
});
module.exports = UserSchema;