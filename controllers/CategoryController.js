const Blog = require("../ models/Blog");

let categoryGet = (req, res) => {
  Blog.find({ category: req.params.id })
    .then((data) => {
      res.render("categories/category", {
        blogs: data,
        title: `Category: ${req.params.id}`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
    categoryGet
}