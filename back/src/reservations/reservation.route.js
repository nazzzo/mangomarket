const express = require("express")
const router = express.Router()
const { controller } = require("./reservation.module")


router.get("/", (req, res, next) => controller.getReservation(req, res, next))
router.post("/", (req, res, next) => controller.postReservation(req, res, next))
router.get("/:id/state", (req, res, next) => controller.getState(req, res, next));
router.put("/:id/state", (req, res, next) => controller.putState(req, res, next));

module.exports = router
