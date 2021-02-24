const express = require("express");
const blogRoutes = require("./routes/BlogRoute");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/CategoryRoute");
const commentRouter = require("./routes/CommentRoute");
const generalRoutes = require("./routes/GeneralRoute");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passport-setup");
const authRouter = require("./routes/AuthRoute");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

let mongodbURI =
  "mongodb+srv://root:root@cluster0.8g2jv.mongodb.net/BlogDatabase?retryWrites=true&w=majority";
if (process.env.MONGODB_URL) {
  mongodbURI = process.env.MONGODB_URL;
}

mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/assets"));
app.use(
  session({
    secret: "dakwabuhbuhlmao",
    resave: true,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri:
        "mongodb+srv://root:root@cluster0.8g2jv.mongodb.net/BlogDatabase?retryWrites=true&w=majority",
      collection: "sessions",
      connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//auth routes
app.use("/auth", authRouter);

//Blog routes
app.use("/blogs", blogRoutes);

//Category routes
app.use("/categories", categoryRoutes);

//Comment routes
app.use("/comment", commentRouter);

//General routes
app.use(generalRoutes);
