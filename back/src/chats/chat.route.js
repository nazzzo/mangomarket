const express = require("express")
const router = express.Router()
const { controller } = require("./chat.module")


router.get("/", (req, res, next) => controller.getList(req, res, next))
router.post("/", (req, res, next) => controller.postChat(req, res, next))

router.get("/customers", (req, res, next) => controller.getCustomers(req, res, next))

router.get("/sellers", (req, res, next) => controller.getSellers(req, res, next))

module.exports = router
