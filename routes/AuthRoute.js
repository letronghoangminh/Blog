const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.get("/login", AuthController.getLogin);
router.post("/login", AuthController.postLogin);
router.get("/signup", AuthController.getSignup);
router.post("/signup", AuthController.postSignup);
router.get("/logout", AuthController.getLogout);

module.exports = router;
