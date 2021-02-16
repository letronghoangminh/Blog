const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogId: mongoose.Types.ObjectId,
    content: String
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);