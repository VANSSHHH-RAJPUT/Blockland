const express = require("express");
const router = express.Router();
const {
  registerLand, getLand,
  transferOwnership, setDispute, getHistory
} = require("../controllers/landController");

router.post("/register",   registerLand);
router.get("/history/:id", getHistory);
router.get("/:id",         getLand);
router.post("/transfer",   transferOwnership);
router.post("/dispute",    setDispute);

module.exports = router;