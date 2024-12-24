// models/roomModel.js
const db = require("../config/database");

const searchRooms = (capacity, districtId, searchDate, startTime, endTime) => {
  const query = `
        SELECT 
        rooms.id, 
        rooms.name, 
        rooms.location, 
        rooms.capacity, 
        rooms.price, 
        'available' AS current_status,
        districts.name AS district_name,
        rooms.imageUrl
    FROM rooms
    LEFT JOIN districts ON rooms.district_id = districts.id
    WHERE 
        rooms.capacity >= ?
        AND rooms.district_id = ?
        AND rooms.id NOT IN (
            SELECT room_id
            FROM bookings 
            WHERE
                date = ? AND status NOT LIKE 'cancelled' AND
                (
                    (start_time < ? AND end_time > ?) -- Giao đầu
                    OR
                    (start_time < ? AND end_time > ?) -- Giao cuối
                    OR
                    (? <= start_time AND ? >= end_time) -- Bao trùm
                )
        );`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        capacity,
        districtId,
        searchDate,
        endTime,
        startTime, // Giao đầu
        startTime,
        endTime, // Giao cuối
        startTime,
        endTime, // Bao trùm
      ],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

const getDistricts = () => {
  const query = "SELECT * FROM districts";

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const rooms = (roomId) => {
  const query = `
      SELECT r.id, r.name, r.location, r.capacity, r.status, r.price, d.name AS district_name,r.imageUrl
      FROM rooms r
      LEFT JOIN districts d ON r.district_id = d.id
      WHERE r.id = ?;
    `;
  return new Promise((resolve, reject) => {
    db.query(query, [roomId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const equipment = (roomId) => {
  const query = `
    SELECT e.name,e.quantity
    FROM room_equipment re
    JOIN equipment e ON re.equipment_id = e.id
    WHERE re.room_id = ?;
  `;

  return new Promise((resolve, reject) => {
    console.log("Executing query with roomId:", roomId); // Log roomId
    db.query(query, [roomId], (err, results) => {
      if (err) {
        console.error("Query error:", err); // Log any SQL errors
        reject(err);
      } else {
        console.log("Query results:", results); // Log query results
        resolve(results);
      }
    });
  });
};
const getAllRooms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rooms WHERE id = ?"; // Query to get all rooms
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching rooms: ", err);
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { searchRooms, getDistricts, rooms, equipment, getAllRooms };
