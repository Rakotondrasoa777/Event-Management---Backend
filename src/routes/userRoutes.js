const express = require("express");
const userControllers = require("../controllers/showUser");
const router = express.Router();

router.get("/",userControllers.getAllUser);
router.get("/:id",userControllers.getUserById);


module.exports = router;