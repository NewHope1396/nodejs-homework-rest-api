const { signupSchema } = require("../../schemas/users");
const bcrypt = require("bcrypt");
const { createError } = require("../../helpers");
const gravatar = require("gravatar");

const User = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = signupSchema.validate(req.body);
    if (error) {
      throw createError(400, `field ${error.message}`);
    }
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
