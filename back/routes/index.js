const express = require("express");
const router = express.Router();
const userRouter = require("../src/users/user.route");
const authRouter = require("../src/auths/auth.route")
const commentRouter = require("../src/comments/comment.route")
const categoriesRouter = require("../src/categories/category.route")

router.use("/categories", categoriesRouter)
router.use("/users", userRouter);
router.use("/auths", authRouter)
router.use("/comments", commentRouter)

module.exports = router;
