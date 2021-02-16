const Comment = require("../ models/Comment");

let postComment = (req, res) => {
  const comment = new Comment({
    blogId: req.params.id,
    content: req.body.content,
  });
  comment
    .save()
    .then((data) => {
      res.redirect("/blogs/detail/" + req.params.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

let deleteComment = (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId)
    .then((data) => {
      res.redirect("/blogs/detail/" + req.params.blogId);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  postComment,
  deleteComment,
};
