const roomModel = require("../models/AdminRooms");

// Lấy danh sách phòng
exports.getRooms = (req, res) => {
  roomModel.getAllRooms((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

// Thêm phòng mới
exports.addRoom = (req, res) => {
  const newRoom = req.body;
  roomModel.addRoom(newRoom, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ message: "Room added successfully", roomId: results.insertId });
    }
  });
};

// Cập nhật phòng
exports.updateRoom = (req, res) => {
  const roomId = req.params.id;
  const updatedRoom = req.body;
  roomModel.updateRoom(roomId, updatedRoom, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Room updated successfully" });
    }
  });
};

// Xóa phòng
exports.deleteRoom = (req, res) => {
  const roomId = req.params.id;
  roomModel.deleteRoom(roomId, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Room deleted successfully" });
    }
  });
};
