const Blog = require("../ models/Blog");
const Comment = require("../ models/Comment");

let blogGetHome = (req, res) => {
  Blog.find()
    .then((data) => {
      res.render("blogs/home", { blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

let blogGetCreate = (req, res) => {
  if (req.isAuthenticated()) res.render("blogs/create", {author: req.user.username});
  else res.redirect("/auth/login");
};

let blogPostCreate = (req, res) => {
  let blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

let blogGetDetail = (req, res) => {
  const obj = {};
  Blog.findById(req.params.id)
    .then((data) => {
      obj.blog = data;
      return Comment.find({ blogId: req.params.id });
    })
    .then((data) => {
      obj.comments = data;
      res.render("blogs/detail", obj);
    })
    .catch((err) => {
      res.status(404).render("404");
    });
};

let blogGetDelete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      return Comment.deleteMany({
        blogId: req.params.id,
      });
    })
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blogGetHome,
  blogGetCreate,
  blogPostCreate,
  blogGetDetail,
  blogGetDelete,
};
