const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.post("/reserve", reservationController.reserveEvent);
router.get("/list", reservationController.showReserveOfUser);
router.get("/income", reservationController.getMonthlyIncomeStats);
router.get("/users/list", reservationController.showUsersReservation);
router.get("/stats/ticket-types", reservationController.statsTicketTypes);

module.exports = router;