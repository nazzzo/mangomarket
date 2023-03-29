const express = require("express");
const router = express.Router();
const { controller } = require("./board.module");
const upload = require("../../middlewares/boardUpload");

router.get("/", (req, res, next) => controller.getList(req, res, next));
router.get("/profile/:userid", (req, res, next) => controller.attention(req, res, next));
// router.get("/:id", (req, res, next) => controller.getMain(req, res, next));
// router.get("/:id/:idx/:userid", (req, res, next) => controller.getView(req, res, next));
router.get("/:id/:idx", (req, res, next) => controller.getView(req, res, next));
router.get("/:id/favorites", (req, res, next) => controller.getFavor(req, res, next));
router.get("/:id/histories", (req, res, next) => controller.getHistory(req, res, next));

router.delete("/:id/temp", (req, res, next) => controller.delTemp(req, res, next));
router.post("/:id/blind", (req, res, next) => controller.postBlind(req, res, next));
router.post("/", (req, res, next) => controller.postWrite(req, res, next));
router.post("/array", upload.fields([{ name: "images" }, { name: "thumbnail" }]), (req, res) => {
    const { files } = req;
    const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
    const thumbnailFile = files.thumbnail ? files.thumbnail[0] : null;
    const thumbnail = thumbnailFile ? [thumbnailFile.filename] : [];
    const images = imageFiles.map((v) => v.filename);
    console.log(`images:::`, images)
    res.json({ images, thumbnail });
  });
  
router.post("/decode", (req, res, next) => controller.decode(req, res, next));
router.put("/:idx", (req, res, next) => controller.putView(req, res, next));
router.delete("/:idx", (req, res, next) => controller.deleteView(req, res, next));

router.post("/:idx/comments", (req, res, next) => controller.postComment(req, res, next));
router.put("/:id/comments/:idx", (req, res, next) => controller.putComment(req, res, next));
router.delete("/:id/comments/:idx", (req, res, next) => controller.deleteComment(req, res, next));

router.post("/:id/:idx/likes", (req, res, next) => controller.postLike(req, res, next));
router.get("/:id/likes", (req, res, next) => controller.getcheck(req, res, next));
// router.delete("/:id/likes", (req, res, next) => controller.deleteLike(req, res, next));

// router.post("/single", upload.single("filename"), (req, res) => {
//     res.send(req.file);
// });

module.exports = router;

