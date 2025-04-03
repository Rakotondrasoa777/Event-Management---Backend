const express = require("express");
const pictureControllers = require("../controllers/pictureController");
const router = express.Router();

router.post("/create", pictureControllers.createPicture);

router.get("/", pictureControllers.getAllPictures);

router.get("/:id", pictureControllers.getPictureById);

router.delete("/delete/:id", pictureControllers.deletePictureById);

module.exports = router;
