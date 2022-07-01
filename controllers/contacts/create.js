const { createError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");
const { addContact } = require("../../models/contacts");

const create = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw createError(400, `field ${error.message}`);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
