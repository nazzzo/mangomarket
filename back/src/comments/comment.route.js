const express = require('express');
const router = express.Router()
const { controller } = require('./comment.module')



router.get("/", (req, res, next) => controller.getList(req, res, next));
router.post("/", (req, res, next) => controller.postComment(req, res, next));
router.put("/:id", (req, res, next) => controller.putComment(req, res, next));
router.delete("/:id", (req, res, next) => controller.deleteComment(req, res, next));


module.exports = router


