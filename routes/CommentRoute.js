const express = require("express");
const commentController = require("../controllers/CommentController");

const commentRouter = express.Router();

commentRouter.use(express.urlencoded({ extended: true }));

commentRouter.post("/:id", commentController.postComment);
commentRouter.get(
  "/delete/:commentId/:blogId",
  commentController.deleteComment
);

module.exports = commentRouter;
