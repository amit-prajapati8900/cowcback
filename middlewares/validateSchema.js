// middlewares/validateSchema.js
const expressErrorHander = require("../util/expressErrorHander");

function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(
        new expressErrorHander(
          400,
          error.details.map(d => d.message).join(", ")
        )
      );
    }
    req.validatedBody = value; // sanitized data attach
    next();
  };
}
module.exports = validateSchema;

