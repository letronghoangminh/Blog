const Comment = require("../ models/Comment");
const Blog = require("../ models/Blog");

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
  if (req.isAuthenticated()) {
    Blog.findById(req.params.blogId)
      .then((blog) => {
        if (req.user.username === blog.author) {
          return Comment.findByIdAndDelete(req.params.commentId);
        } else res.redirect("/blogs/detail/" + req.params.blogId);
      })
      .then((result) => {
        res.redirect("/blogs/detail/" + req.params.blogId);
      })
      .catch((err) => {
        console.log(err);
      });
  } else res.redirect("/blogs/detail/" + req.params.blogId);
};

module.exports = {
  postComment,
  deleteComment,
};
