const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  signupSchema,
  emailSchema,
};
