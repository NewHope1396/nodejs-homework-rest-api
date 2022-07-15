const createError = require("../../helpers/createError");
const Contact = require("../../models/contact");
const { updateFavoriteSchema } = require("../../schemas/contacts");

const updateFavorite = async (req, res, next) => {
  try {
    if (!req.body.favorite) {
      throw createError(400, "missing field favorite");
    }
    const { error } = updateFavoriteSchema.validate(req.body);
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

module.exports = updateFavorite;
