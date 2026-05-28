const Joi = require("joi");
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const customerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  address: Joi.string().max(100).required(),
  contact: Joi.string().pattern(/^[0-9]{10}$/),
  email: Joi.string().email().required(),
  connection: Joi.string().valid("Commercial", "Domestic").required(),
  meter: Joi.string().max(50),
  usage: Joi.number().min(0),
});
const complaintModel = Joi.object({
      customerId:Joi.number().required(),
      customerName:Joi.string().required(),
      contact: Joi.number().required(),
      type:Joi.string().valid("Commercial", "Domestic").required(),
      description: Joi.string().required(),
      Status:Joi.string().valid("ok", "pending").required(),
});
module.exports = {
  complaintModel,
  signupSchema,
  customerSchema
};
