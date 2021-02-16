const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    name: String,
    snippet: String,
    content: String,
    category: String,
    author: String
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;