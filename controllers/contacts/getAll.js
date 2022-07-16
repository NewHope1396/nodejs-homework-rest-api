const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({ owner: req.user._id }).populate(
      "owner",
      "email name"
    );
    res.json(result);
  } catch (error) {
    error.message = "Server error";
    next(error);
  }
};

module.exports = getAll;
