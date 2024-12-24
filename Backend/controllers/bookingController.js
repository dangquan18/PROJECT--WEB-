const bookingModel = require("../models/bookingModel");

// Controller để lấy tất cả bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getBookings(); // Dùng await vì getBookings trả về Promise
    res.json(bookings); // Trả kết quả dưới dạng JSON
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
const createBookingController = (req, res) => {
  const bookingData = req.body;

  bookingModel.createBooking(bookingData, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Đặt phòng thất bại", error: err.message });
    }

    // Giả sử 'result' chứa đối tượng với trường 'id' (hoặc 'booking_id' tùy theo cơ sở dữ liệu)
    const bookingId = result.id; // Thay đổi 'id' nếu cần phải trích xuất trường khác
    res.status(201).json({
      message: "Đặt phòng thành công",
      bookingId: bookingId, // Trả về 'bookingId' trong phản hồi
    });
  });
};
const updateBookingStatus = (req, res) => {
  const { booking_id } = req.params; // Lấy booking_id từ params
  const { status } = req.body; // Lấy trạng thái mới từ body request

  // Kiểm tra nếu trạng thái hợp lệ
  const validStatuses = ["pending", "confirmed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  // Gọi hàm model để cập nhật trạng thái
  bookingModel.updateBookingStatus(booking_id, status, (err, result) => {
    if (err) {
      console.error("Error updating booking:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking_id,
      status,
    });
  });
};
const getBookingId = (req, res) => {
  const { roomId, userId, startTime, date, endTime } = req.body;
  console.log(req.body);
  if (roomId && userId && startTime && date && endTime) {
    bookingModel
      .getBookingId(roomId, userId, startTime, date, endTime)
      .then((bookingId) => {
        res.json({ booking_id: bookingId }); // Trả về booking_id
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Thiếu tham số trong yêu cầu" });
  }
};
const getBookingsByUser = (req, res) => {
  const { userId } = req.query; // Lấy userId từ query params

  if (!userId) {
    // Nếu không có userId thì trả về lỗi
    return res.status(400).json({ message: "userId là bắt buộc" });
  }

  // Gọi hàm model để lấy danh sách bookings theo userId
  bookingModel
    .getBookingsByUser(userId)
    .then((bookings) => {
      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy booking nào cho người dùng này" });
      }

      // Trả kết quả về người dùng (trả về JSON)
      res.json(bookings);
    })
    .catch((error) => {
      // Nếu có lỗi trong quá trình xử lý
      console.error(error);
      res
        .status(500)
        .json({ message: "Lỗi khi lấy booking", error: error.message });
    });
};

module.exports = {
  createBookingController,
  getBookings,
  updateBookingStatus,
  getBookingId,
  getBookingsByUser,
};
