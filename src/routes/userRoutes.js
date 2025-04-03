const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

router.get("/",userControllers.getAllUser);
router.get("/:id",userControllers.getUserById);
router.post("/create", userControllers.createUser);
router.put("/update/:id", userControllers.updateUserById);
router.delete("/delete/:id", userControllers.deleteUserById);


module.exports = router;