const express = require("express");
const auth = require("../../middlewares/auth");

const router = express.Router();

const ctrl = require("../../controllers/auth/index");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

module.exports = router;
