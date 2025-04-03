const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.post("/reserve", reservationController.reserveEvent);
router.get("/list", reservationController.showReserveOfUser);
router.get("/users/list", reservationController.showUsersReservation);

module.exports = router;