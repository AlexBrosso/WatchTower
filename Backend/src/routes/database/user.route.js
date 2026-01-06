const express = require("express");
const router = express.Router();
const userController = require("../../controllers/database/user.controller");

const validate = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const requireRole = require("../../middlewares/requireRole.middleware");
const { userIdParam, createUserBody, updateUserBody, changePasswordBody, forgotPasswordBody, resetPasswordBody } = require("../../validations/database/user.validation")

router.get("/", userController.getAll);
router.post("/", validate(createUserBody), userController.create);

router.get("/me", authMiddleware, userController.me);
router.put("/me", authMiddleware, validate(updateUserBody), userController.updateMe);
router.delete("/me", authMiddleware, userController.removeMe);
router.patch("/me/password", authMiddleware, validate(changePasswordBody), userController.changeMyPassword);

router.get("/:id", authMiddleware, requireRole("ADMIN"), validate(userIdParam, "params"), userController.get);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), validate(userIdParam, "params"), userController.remove);

router.post("/forgot-password", validate(forgotPasswordBody), userController.forgotPassword);
router.post("/reset-password", validate(resetPasswordBody), userController.resetPassword);

module.exports = router;