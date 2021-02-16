const express = require("express");
const categoryController = require("../controllers/CategoryController");

const categoriesRouter = express.Router();

categoriesRouter.get("/:id", categoryController.categoryGet);

module.exports = categoriesRouter;
