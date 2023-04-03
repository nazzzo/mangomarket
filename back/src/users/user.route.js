const express = require("express");
const router = express.Router();
const { userController: controller } = require("./user.module");
const upload = require("../../middlewares/upload");


router.post("/", (req, res, next) => controller.postSignup(req, res, next));
router.post("/usercheck", (req, res, next) => controller.postUserCheck(req, res, next));
router.get("/me", (req, res, next) => controller.getMe(req, res, next));
router.put("/", (req, res, next) => controller.putProfile(req, res, next));
router.delete("/:id", (req, res, next) => controller.deleteUser(req, res, next));
router.get("/point/:email", (req, res, next) => controller.getPoint(req, res, next));
router.post("/keyword", (req, res, next) => controller.postKeyword(req, res, next));
router.delete("/keyword/:email", (req, res, next) => controller.deleteKeyword(req, res, next));

router.post("/single", upload.single("image"), (req, res) => {
    console.log(upload)
    res.send(req.file);
});

module.exports = router;
