const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

const ctrl = require("../../controllers/auth/index");
const { single } = require("../../middlewares/upload");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
