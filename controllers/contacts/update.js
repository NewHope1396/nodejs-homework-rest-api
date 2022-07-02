const { createError } = require("../../helpers/index");
const { updateSchema } = require("../../schemas/contacts");
const { updateContact } = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    if (!req.body.name && !req.body.phone && !req.body.email) {
      throw createError(400, "missing fields");
    }
    console.log(req.body);
    const { error } = updateSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw createError(400, `field ${error.message}`);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
