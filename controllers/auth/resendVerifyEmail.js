const User = require("../../models/user");
const { emailSchema } = require("../../schemas/users");
const { createError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required field email");
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "Not found");
    }
    if (user.verify) {
      createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/vetify/${user.verificationToken}">Click to verify your email</a>`,
    };
    await sendMail(mail);
    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
