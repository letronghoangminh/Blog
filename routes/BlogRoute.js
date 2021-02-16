const express = require("express");
const blogController = require("../controllers/BlogController");

let blogRoutes = express.Router();

blogRoutes.use(express.urlencoded({ extended: true }));
blogRoutes.get("/", blogController.blogGetHome);
blogRoutes.get("/create", blogController.blogGetCreate);
blogRoutes.post("/create", blogController.blogPostCreate);
blogRoutes.get("/detail/:id", blogController.blogGetDetail);
blogRoutes.get("/delete/:id", blogController.blogGetDelete); //fake delete request with a get request :((

module.exports = blogRoutes;
