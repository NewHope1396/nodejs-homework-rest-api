const express = require("express");
const auth = require("../../middlewares/auth");

const router = express.Router();

const ctrl = require("../../controllers/contacts/index");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, ctrl.create);

router.delete("/:contactId", auth, ctrl.remove);

router.put("/:contactId", auth, ctrl.update);

router.patch("/:contactId/favorite", auth, ctrl.updateFavorite);

module.exports = router;
