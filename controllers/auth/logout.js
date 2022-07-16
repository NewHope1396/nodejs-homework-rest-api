const User = require("../../models/user");
const { createError } = require("../../helpers");

const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      createError(401, "Not authorized");
    }

    await User.findByIdAndUpdate(user._id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
