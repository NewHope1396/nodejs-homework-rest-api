const { createError } = require("../../helpers/index");
const { updateSchema } = require("../../schemas/contacts");
const Contact = require("../../models/contact");

const update = async (req, res, next) => {
  try {
    if (
      !req.body.name &&
      !req.body.phone &&
      !req.body.email &&
      !req.body.favorite
    ) {
      throw createError(400, "missing fields");
    }
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw createError(400, `field ${error.message}`);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }).populate("owner", "email name");
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    if (error.kind === "ObjectId") {
      error.status = 404;
      error.message = "Not found";
    }
    next(error);
  }
};

module.exports = update;
