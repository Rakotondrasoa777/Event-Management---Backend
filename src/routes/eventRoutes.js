const express = require("express");
const router = express.Router();
const eventController = require("../controllers/showEvent");

// Routes des événements
router.get("/", eventController.getAllEvent);
router.get("/:id", eventController.getEventById);
router.get("/date/:date", eventController.filterEventsByDate);
router.post("/create", eventController.createEvent);
router.put("/update/:id", eventController.updateEventById);
router.delete("/delete/:id", eventController.deleteEventById);

module.exports = router;
