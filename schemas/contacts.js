const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(30),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};
