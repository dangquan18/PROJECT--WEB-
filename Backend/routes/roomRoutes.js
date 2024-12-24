const express = require("express");
const {
  searchRooms,
  getDistricts,
  getRoomDetails,
  getEquipment,
  getAllRooms,
} = require("../controllers/roomController");
const router = express.Router();
router.get("/search", searchRooms);
router.get("/districts", getDistricts);
router.get("/rooms/:id", getRoomDetails);
router.get("/rooms/:id/equipment", getEquipment);
router.get("/rooms", getAllRooms);
module.exports = router;
