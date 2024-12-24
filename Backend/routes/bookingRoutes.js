const express = require("express");
const {
  getBookingId,
  createBookingController,
  getBookings,
  updateBookingStatus,
  getBookingsByUser,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookings", createBookingController);
router.get("/bookings", getBookings);
router.put("/bookings/:booking_id/status", updateBookingStatus);
router.get("/booking-id", getBookingId);
router.get("/bookings-user", getBookingsByUser);

module.exports = router;
