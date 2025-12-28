const express = require("express");
const router = express.Router();
const userController = require("../../controllers/database/user.controller");

const validate = require("../../middlewares/validate.middleware");
const { userIdParam, createUserBody, updateUserBody, changePasswordBody, forgotPasswordBody, resetPasswordBody } = require("../../validations/database/user.validation")

router.get("/", userController.getAll);
router.post("/", validate(createUserBody), userController.create);
router.get("/:id", validate(userIdParam, "params"),userController.get);
router.put("/:id", validate(userIdParam, "params"), validate(updateUserBody), userController.update);
router.delete("/:id", validate(userIdParam, "params"), userController.remove);
router.patch("/:id/password", validate(userIdParam, "params"), validate(changePasswordBody), userController.changePassword);
router.post("/forgot-password", validate(forgotPasswordBody), userController.forgotPassword);
router.post("/reset-password", validate(resetPasswordBody), userController.resetPassword);

module.exports = router;