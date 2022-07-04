const { createError } = require("../../helpers");
const Contact = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getById;
