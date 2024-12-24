const { sendEmail } = require("../models/emailModel");
const sendEmailController = async (req, res) => {
  const { to, roomName, date, startTime, endTime, price, bookingId } = req.body;

  try {
    // Chuyển đổi thời gian thành số giờ (ví dụ: "7:15" -> 7.25)
    const convertTimeToDecimal = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours + minutes / 60;
    };

    const start = convertTimeToDecimal(startTime); // 7:15 -> 7.25
    const end = convertTimeToDecimal(endTime); // 8:30 -> 8.5

    // Tính tổng chi phí
    const duration = end - start; // Thời gian sử dụng
    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.",
      });
    }

    const totalPrice = duration * price * 1000;

    // Nội dung email
    const subject = `Xác nhận đặt phòng: ${roomName}`;
    const message = `
      Chào bạn,

      Bạn đã đặt phòng ${roomName} vào ngày ${date}, từ ${startTime} đến ${endTime}.
      Mã đặt phòng: ${bookingId}.
      Tổng thời gian sử dụng: ${duration} giờ.
      Giá phòng: ${price} VND/giờ.
      Tổng chi phí: ${totalPrice.toLocaleString()} VND.
      Vui lòng thanh toán qua chuyển khoản qua STK 123456789, chi nhánh ACB.
      Nội dung chuyển khoản: Mã đặt phòng ${bookingId}.

      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!`;
    // Gửi email
    const result = await sendEmail(to, subject, message);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Email đã được gửi thành công!",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Không thể gửi email. Vui lòng thử lại sau.",
      });
    }
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi gửi email.",
    });
  }
};
module.exports = { sendEmailController };
