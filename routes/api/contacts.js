const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts/index");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.update);

router.patch("/:contactId/favorite", ctrl.updateFavorite);

module.exports = router;
