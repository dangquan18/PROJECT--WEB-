// controllers/roomController.js
const roomModel = require("../models/roomModel");

const searchRooms = (req, res) => {
  const { date, startTime, endTime, capacity, districtId } = req.query;

  // Kiểm tra các tham số cần thiết
  if (!date || !startTime || !endTime || !capacity || !districtId) {
    return res.status(400).json({ message: "Thiếu các tham số bắt buộc!" });
  }

  // Chuyển đổi các giá trị tham số về đúng định dạng
  const capacityInt = parseInt(capacity);

  if (isNaN(capacityInt) || capacityInt <= 0) {
    return res.status(400).json({ message: "Sức chứa phải là một số hợp lệ!" });
  }

  roomModel
    .searchRooms(capacityInt, districtId, date, startTime, endTime)
    .then((results) => {
      if (results.length === 0) {
        res.status(404).json({ message: "Không tìm thấy phòng phù hợp!" });
      } else {
        res.status(200).json(results);
      }
    })
    .catch((err) => {
      console.error("Lỗi máy chủ:", err);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    });
};

const getDistricts = (req, res) => {
  roomModel
    .getDistricts()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Không thể lấy danh sách quận", error: err.message });
    });
};
const { rooms } = require("../models/roomModel"); // Importing the rooms model

const getRoomDetails = (req, res) => {
  const roomId = req.params.id; // Assuming the room ID is passed as a URL parameter

  rooms(roomId)
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.status(200).json(results[0]); // Returning the first result (since room IDs should be unique)
    })
    .catch((err) => {
      console.error(err); // Log error for debugging
      res.status(500).json({ message: "Internal server error" });
    });
};
const { equipment } = require("../models/roomModel"); // Importing the equipment model
const getEquipment = async (req, res) => {
  const roomId = req.params.id;

  console.log("Received roomId from request:", roomId); // Log roomId

  try {
    const results = await equipment(roomId);

    console.log("Equipment results from model:", results); // Log query results

    if (results.length > 0) {
      res.status(200).json({
        success: true,
        equipment: results,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No equipment found for this room",
      });
    }
  } catch (err) {
    console.error("Error fetching equipment:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching equipment.",
      error: err.message,
    });
  }
};
const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.status(200).json(rooms); // Trả về danh sách phòng
  } catch (err) {
    res.status(500).json({ error: "Error fetching rooms" });
  }
};

module.exports = {
  searchRooms,
  getDistricts,
  getRoomDetails,
  getEquipment,
  getAllRooms,
};
