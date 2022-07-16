const { createError } = require("../helpers");
const jwt = require("jsonwebtoken");
const UNSECRET_KEY = "W1b38Gj90B";
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createError(401, "Not authorized");
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }

    try {
      const { id } = jwt.verify(token, UNSECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      error.message = "Not authorized";
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
