const express = require("express");
const router = express.Router();
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  accountsList,
  getAccountByUsername,
} = require("./accounts.controllers");

router.get("/", accountsList);
router.get("/:id", accountsGet);
router.get("/:username", getAccountByUsername);

router.post("/", accountCreate);

router.delete("/:accountId", accountDelete);

router.put("/:accountId", accountUpdate);

module.exports = router;
