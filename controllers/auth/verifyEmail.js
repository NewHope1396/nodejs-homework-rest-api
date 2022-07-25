const User = require("../../models/user");

const { createError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    console.log(user);
    if (!user) {
      throw createError(404, "Not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
