const db = require("../config/database");

// Lấy danh sách phòng
const getAllRooms = (callback) => {
  const query = `
        SELECT id, name, location, capacity, status, price, district_id, imageUrl
        FROM rooms;
    `;
  db.query(query, callback);
};

// Thêm phòng mới
const addRoom = (room, callback) => {
  const query = `
        INSERT INTO rooms (name, location, capacity, status, price, district_id, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
  const params = [
    room.name,
    room.location,
    room.capacity,
    room.status,
    room.price,
    room.district_id, // district_id chỉ là ID của quận, không cần lấy tên
    room.imageUrl,
  ];
  db.query(query, params, callback);
};

// Cập nhật phòng
const updateRoom = (id, room, callback) => {
  const query = `
        UPDATE rooms
        SET name = ?, location = ?, capacity = ?, status = ?, price = ?, district_id = ?, imageUrl = ?
        WHERE id = ?;
    `;
  const params = [
    room.name,
    room.location,
    room.capacity,
    room.status,
    room.price,
    room.district_id, // district_id chỉ cần ID của quận
    room.imageUrl,
    id,
  ];
  db.query(query, params, callback);
};

// Xóa phòng
const deleteRoom = (id, callback) => {
  const query = `DELETE FROM rooms WHERE id = ?;`;
  db.query(query, [id], callback);
};

module.exports = {
  getAllRooms,
  addRoom,
  updateRoom,
  deleteRoom,
};
