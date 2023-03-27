const express = require("express");
const router = express.Router();
const userRouter = require("../src/users/user.route");
const authRouter = require("../src/auths/auth.route");
const boardRouter = require("../src/boards/board.route");
const communityRouter = require("../src/community/community.route");
const categoriesRouter = require("../src/categories/category.route");

router.use("/categories", categoriesRouter);
router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/boards", boardRouter);
router.use("/community", communityRouter);

module.exports = router;
