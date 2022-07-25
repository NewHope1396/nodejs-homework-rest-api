const { signupSchema } = require("../../schemas/users");
const bcrypt = require("bcrypt");
const { createError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const UNSECRET_KEY = "W1b38Gj90B";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = signupSchema.validate(req.body);

    if (error) {
      throw createError(400, `field ${error.message}`);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw createError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw createError(401, "Email is not verified");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, UNSECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
