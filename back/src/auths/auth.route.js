const express = require("express");
const router = express.Router();
const { authController: controller, kakao } = require("./auth.module");

router.get('/kakao',(req,res,next)=>kakao.login(req,res,next))

router.post("/", (req, res, next) => controller.postLogin(req, res, next));
router.post("/sns", (req, res, next) => controller.postSns(req, res, next));
router.post('/mail', (req, res, next) => controller.postFindpw(req, res, next))

module.exports = router;
