import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import { Modal, Button, message } from "antd";
import { format } from "date-fns"; // Import hàm format từ date-fns
import { Phone, Users, MapPin, DollarSign } from "lucide-react";
import "./RoomDetails.css";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [equipment, setEquipment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const location = useLocation();
  const { roomId, date, startTime, endTime } = location.state || {};

  // Lấy thông tin người dùng từ sessionStorage
  const user = sessionStorage.getItem("user");
  const userId = user ? JSON.parse(user).user.id : null;
  const userEmail = user ? JSON.parse(user).user.email : null;

  useEffect(() => {
    // Lấy thông tin phòng
    axios
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin phòng:", error);
      });

    // Lấy thông tin thiết bị trong phòng
    axios
      .get(`http://localhost:5000/api/rooms/${id}/equipment`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.equipment)) {
          setEquipment(response.data.equipment);
        } else {
          console.error("Dữ liệu thiết bị không hợp lệ");
          setEquipment([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin thiết bị:", error);
      });
  }, [id]);

  // Định dạng ngày theo dd-MM-yy
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const parsedDate = new Date(inputDate);
    return format(parsedDate, "dd-MM-yy"); // Sử dụng date-fns để định dạng
  };

  // Xử lý đặt phòng
  const handleBooking = async () => {
    try {
      const bookingData = {
        roomId: id,
        userId: userId, // Sử dụng userId mặc định nếu không có
        date,
        startTime,
        endTime,
        status: "pending",
      };

      // Gửi yêu cầu POST để tạo booking
      const bookingResponse = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );

      // Lấy bookingId từ phản hồi của API (dùng bookingId thay vì id)
      const bookingId = bookingResponse.data.bookingId; // Chú ý lấy từ bookingId

      // Đảm bảo rằng bookingId đã được gán trước khi sử dụng trong emailData
      const emailData = {
        to: userEmail,
        price: room.price,
        roomName: room.name,
        date,
        startTime,
        endTime,
        bookingId, // Đảm bảo sử dụng bookingId ở đây
      };

      // Gửi yêu cầu POST để gửi email
      await axios.post("http://localhost:5000/api/send-email", emailData);

      // Hiển thị thông báo thành công
      message.success("Đặt phòng thành công!");

      // Đóng modal sau khi thành công
      setIsModalOpen(false);

      // Chuyển hướng đến trang "Cảm ơn" và gửi thêm thông tin booking
      navigate("/thank-you", {
        state: {
          room,
          date,
          startTime,
          endTime,
          userId,
          bookingId, // Gửi bookingId cùng với các thông tin khác
        },
      });
    } catch (error) {
      console.error("Lỗi đặt phòng:", error);
      message.error("Vui lòng đăng nhập để đặt phòng.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="content-wrapper">
          {/* Room Header */}
          <div className="room-header">
            <div className="image-container">
              <img src={room.imageUrl} alt={room.name} />
              <div className="gradient-overlay"></div>
              <h1>{room.name}</h1>
            </div>
          </div>

          {/* Room Info */}
          <div className="room-info">
            <div className="info-item">
              <MapPin className="icon" />
              <div className="info-content">
                <p className="label">Địa điểm</p>
                <p className="value">{room.location}</p>
              </div>
            </div>
            <div className="info-item">
              <Users className="icon" />
              <div className="info-content">
                <p className="label">Sức chứa</p>
                <p className="value">{room.capacity}</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="icon" />
              <div className="info-content">
                <p className="label">Quận</p>
                <p className="value">{room.district_name}</p>
              </div>
            </div>
            <div className="info-item">
              <DollarSign className="icon" />
              <div className="info-content">
                <p className="label">Giá</p>
                <p className="value">{room.price} VNĐ/1h</p>
              </div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="equipment-section">
            <h2>Trang thiết bị</h2>
            <div className="equipment-grid">
              {equipment.map((item, index) => (
                <div key={index} className="equipment-item">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h2>Liên hệ</h2>
            <p className="contact-text">
              Để biết thêm chi tiết hoặc hỗ trợ, vui lòng gọi số điện thoại dưới
              đây:
            </p>
            <div className="phone-container">
              <Phone className="phone-icon" />
              <span className="phone-number">+84 123 456 789</span>
            </div>
          </div>

          {/* Booking Button */}
          <div className="booking-button-container">
            <Button
              type="primary"
              className="btn-book"
              onClick={() => setIsModalOpen(true)}
            >
              Đặt Phòng
            </Button>
          </div>

          {/* Modal */}
          <Modal
            title="Xác nhận đặt phòng"
            visible={isModalOpen}
            onOk={handleBooking}
            onCancel={() => setIsModalOpen(false)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <p>
              Bạn có chắc chắn muốn đặt phòng <strong>{room.name}</strong>{" "}
              không?
            </p>
            <p>
              <strong>Ngày:</strong> {formatDate(date)}
            </p>
            <p>
              <strong>Thời gian:</strong> {startTime} - {endTime}
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
