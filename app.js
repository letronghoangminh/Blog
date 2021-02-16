const express = require("express");
const blogRoutes = require("./routes/BlogRoute");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/CategoryRoute");
const commentRouter = require("./routes/CommentRoute");
const generalRoutes = require("./routes/GeneralRoute");

const app = express();

let mongodbURI =
  "mongodb+srv://root:root@cluster0.8g2jv.mongodb.net/BlogDatabase?retryWrites=true&w=majority";

mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/assets"));

//Blog routes
app.use("/blogs", blogRoutes);

//Category routes
app.use("/categories", categoryRoutes);

//Comment routes
app.use("/comment", commentRouter);

//General routes
app.use(generalRoutes);
