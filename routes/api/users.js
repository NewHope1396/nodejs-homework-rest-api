const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

const ctrl = require("../../controllers/auth/index");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

module.exports = router;
