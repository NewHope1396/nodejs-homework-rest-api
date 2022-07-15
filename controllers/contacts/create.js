const { createError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");
const Contact = require("../../models/contact");

const create = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, `field ${error.message}`);
    }
    const result = await Contact.create({
      ...req.body,
      owner: req.user._id,
    }).populate("owner", "email name");
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
