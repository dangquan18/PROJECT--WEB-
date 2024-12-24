const express = require("express");
const AdminroomController = require("../controllers/AdminRoomsController");

const router = express.Router();

router.get("/adminrooms", AdminroomController.getRooms);
router.post("/adminrooms", AdminroomController.addRoom);
router.put("/adminrooms/:id", AdminroomController.updateRoom);
router.delete("/adminrooms/:id", AdminroomController.deleteRoom);

module.exports = router;
