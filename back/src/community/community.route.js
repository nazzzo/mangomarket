const express = require('express');
const router = express.Router()
const { controller } = require('./community.module')



router.get("/", (req, res, next) => controller.getList(req, res, next));
router.post("/", (req, res, next) => controller.postCommunity(req, res, next));
router.put("/:id", (req, res, next) => controller.putCommunity(req, res, next));
router.delete("/:id", (req, res, next) => controller.deleteCommunity(req, res, next));


module.exports = router


