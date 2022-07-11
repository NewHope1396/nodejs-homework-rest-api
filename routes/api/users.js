const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth/index");

router.post("/signup", ctrl.signup);

module.exports = router;
