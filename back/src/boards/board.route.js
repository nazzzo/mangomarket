const express = require("express");
const router = express.Router();
const { controller } = require("./board.module");
const upload = require("../../middlewares/boardUpload");

router.get("/", (req, res, next) => controller.getList(req, res, next));
router.get("/view/:id", (req, res, next) => controller.getView(req, res, next));
router.get("/profile/:userid", (req, res, next) => controller.attention(req, res, next));
router.get("/keywords", (req, res, next) => controller.getKeywords(req, res, next));

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

router.post("/:id/:idx/likes", (req, res, next) => controller.postLike(req, res, next));

router.get("/:id/likes", (req, res, next) => controller.getcheck(req, res, next));

// router.put("/:idx", (req, res, next) => controller.putView(req, res, next));
// router.delete("/:idx", (req, res, next) => controller.deleteView(req, res, next));

module.exports = router;