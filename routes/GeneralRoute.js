const express = require("express");
const mailController = require("../controllers/MailController");

const generalRouter = express.Router();

generalRouter.use(express.urlencoded({ extended: true }));

generalRouter.get("/", (req, res) => {
  res.render("home");
});

generalRouter.get("/about", (req, res) => {
  res.render("about");
});

generalRouter.get("/profile", (req, res) => {
  if (req.isAuthenticated()) res.render("profile", { user: req.user });
  else res.redirect("/auth/login");
});

generalRouter.post("/mail", (req, res) => {
  mailController.sendMail(req.body.mail);
  res.redirect("/");
});

generalRouter.use((req, res) => {
  res.status(404).render("404");
});

module.exports = generalRouter;
