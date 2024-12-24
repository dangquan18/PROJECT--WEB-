const db = require("../config/database");

const createBooking = (bookingData, callback) => {
  const { roomId, userId, date, startTime, endTime, status } = bookingData;

  const query =
    "INSERT INTO bookings (room_id, user_id, date, start_time, end_time, status) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [roomId, userId, date, startTime, endTime, status],
    (err, result) => {
      if (err) return callback(err);

      // Trả về result.insertId, đó là ID của booking mới tạo
      callback(null, { id: result.insertId });
    }
  );
};

const getBookings = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        b.id AS booking_id,
        b.date,
        b.start_time,
        b.end_time, 
        b.status,
        b.created_at,
        b.room_id,
        b.user_id,
        r.name AS room_name,
        u.name AS user_name
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN users u ON b.user_id = u.id
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching bookings: ", err);
        reject(err);
      }
      resolve(results);
    });
  });
};
const updateBookingStatus = (booking_id, status, callback) => {
  const query = "UPDATE bookings SET status = ? WHERE id = ?";
  db.query(query, [status, booking_id], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
const getBookingId = (roomId, userId, startTime, date, endTime) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id FROM bookings WHERE room_id = ? AND user_id = ? AND start_time = ? AND date = ? AND end_time = ?`;

    db.query(
      query,
      [roomId, userId, startTime, date, endTime],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          resolve(result[0].booking_id); // Trả về booking_id
        } else {
          reject("Booking not found");
        }
      }
    );
  });
};
const getBookingsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    // Truy vấn cơ sở dữ liệu với JOIN để lấy tên phòng
    db.query(
      `SELECT bookings.*, rooms.name
      FROM bookings
      JOIN rooms ON bookings.room_id = rooms.id
      WHERE bookings.user_id = ?`,
      [userId],
      (err, results) => {
        if (err) {
          // Nếu có lỗi trong truy vấn, reject Promise với thông báo lỗi
          return reject(new Error("Lỗi khi truy vấn cơ sở dữ liệu"));
        }

        // Nếu truy vấn thành công, resolve với dữ liệu trả về
        resolve(results);
      }
    );
  });
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  getBookingId,
  getBookingsByUser,
};
