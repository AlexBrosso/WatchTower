const express = require("express");
const router = express.Router();
const authController = require("../../controllers/database/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const validate = require("../../middlewares/validate.middleware");
const { loginBody } = require("../../validations/database/auth.validation");

router.post("/login", validate(loginBody), authController.login);
router.post("/logout", authMiddleware, authController.logout)

module.exports = router;