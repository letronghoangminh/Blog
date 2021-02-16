const express = require("express");
const blogRoutes = require("./routes/BlogRoute");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/CategoryRoute");
const commentRouter = require("./routes/CommentRoute");
const generalRoutes = require("./routes/GeneralRoute");

const app = express();

let mongodbURI = "******************************************************************";
if (process.env.MONGODB_URL) {
  mongodbURI = process.env.MONGODB_URL;
}

mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port);
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
