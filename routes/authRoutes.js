const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register/submit", authController.register_submit);
router.post("/login", authController.login);
router.delete("/register/delete", authController.register_delete);

router.post("/password/submit", authController.password_submit);
router.post("/password/add", authController.password_add);
router.delete("/password/delete", authController.password_delete);

router.post("/user/add", authController.user_add);

router.post("/token", authController.token);

//updated
router.get("/data/all", authController.get_all);
router.post("/user/:id", authController.user_update);
router.delete("/user/:id", authController.user_delete);

router.put("/register/add", authController.register_add);

module.exports = router;
