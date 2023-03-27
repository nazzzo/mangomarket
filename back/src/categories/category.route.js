const express = require("express")
const router = express.Router()
const { controller } = require("./category.module")


router.get("/", (req, res, next) => controller.getList(req, res, next));
router.get("/board", (req, res, next) => controller.getBoardCategory(req, res, next));

module.exports = router
