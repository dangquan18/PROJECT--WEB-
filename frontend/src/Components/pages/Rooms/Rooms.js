import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Layout/Navbar/Navbar";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import "./Room.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer/Footer";
function Rooms() {
  const [filters, setFilters] = useState({
    date: "",
    startTime: "",
    endTime: "",
    capacity: 0,
    districtId: "",
  });
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(""); // Thêm state lưu lỗi
  const [loading, setLoading] = useState(false); // Thêm state cho loading
  const handleTimeChange = (time, timeString, fieldName) => {
    const formattedTime = time ? dayjs(time).format("HH:mm:ss") : "";
    setFilters((prev) => ({
      ...prev,
      [fieldName]: formattedTime,
    }));
  };

  // Lấy danh sách các quận từ backend
  const fetchDistricts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/districts");
      setDistricts(res.data);
    } catch (err) {
      console.error("Không thể lấy danh sách quận", err.message);
      setError("Không thể lấy danh sách quận.");
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validateFilters = () => {
    const { date, startTime, endTime, capacity, districtId } = filters;

    if (!date || !startTime || !endTime || !capacity || !districtId) {
      setError("Vui lòng nhập đầy đủ thông tin tìm kiếm!");
      return false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(date);
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    // Kiểm tra ngày phải >= ngày hiện tại
    if (selectedDate < new Date(currentDate.toISOString().split("T")[0])) {
      setError("Ngày tìm kiếm không được nhỏ hơn ngày hiện tại!");
      return false;
    }

    // Kiểm tra thời gian bắt đầu phải >= thời gian hiện tại + 30 phút nếu ngày là hôm nay
    const currentPlus30Minutes = new Date(
      currentDate.getTime() + 30 * 60 * 1000
    );
    if (
      selectedDate.toISOString().split("T")[0] ===
        currentDate.toISOString().split("T")[0] &&
      startDateTime < currentPlus30Minutes
    ) {
      setError("Thời gian bắt đầu phải lớn hơn hiện tại ít nhất 30 phút!");
      return false;
    }

    // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
    if (endDateTime <= startDateTime) {
      setError("Thời gian kết thúc phải sau thời gian bắt đầu!");
      return false;
    }

    setError("");
    return true;
  };

  const searchRooms = async () => {
    if (!validateFilters()) return;

    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: filters,
      });
      setRooms(response.data);
      if (response.data.length === 0) {
        setError("Không tìm thấy phòng phù hợp.");
      }
    } catch (error) {
      console.error("Không thể tìm kiếm phòng", error);
      setError("Lỗi khi tìm kiếm phòng.");
    } finally {
      setLoading(false);
    }
  };

  const SeeDetails = (roomId) => {
    const { date, startTime, endTime } = filters; // Lấy thông tin từ bộ lọc
    navigate(`/rooms/${roomId}`, {
      state: {
        roomId,
        date,
        startTime,
        endTime,
      },
    });
  };
  return (
    <>
      <Navbar />
      <h1 className="content">Hãy tìm kiếm phòng phù hợp với bạn</h1>
      <div className="search-container">
        {/* Inputs tìm kiếm phòng */}
        <div className="search-inputs">
          <input
            type="date"
            name="date"
            className="input"
            placeholder="Ngày"
            onChange={handleChange}
          />
          <TimePicker
            format="HH:mm" // Định dạng 24 giờ
            onChange={(time, timeString) =>
              handleTimeChange(time, timeString, "startTime")
            }
            placeholder="Chọn giờ bắt đầu"
          />
          <TimePicker
            format="HH:mm"
            onChange={(time, timeString) =>
              handleTimeChange(time, timeString, "endTime")
            }
            placeholder="Chọn giờ kết thúc"
          />
          <input
            type="number"
            name="capacity"
            className="input"
            placeholder="Sức chứa"
            onChange={handleChange}
          />
        </div>

        {/* Dropdown chọn quận */}
        <select name="districtId" className="dropdown" onChange={handleChange}>
          <option value="">Chọn quận</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>

        {/* Nút tìm kiếm */}
        <button className="btn-search" onClick={searchRooms}>
          Tìm kiếm
        </button>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="error-message">{error}</p>}

        {/* Hiển thị loading */}
        {loading && <p>Đang tìm kiếm phòng...</p>}

        {/* Hiển thị danh sách phòng */}
        {rooms.length > 0 && !loading && (
          <div className="room-cards-container">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <h3>{room.name}</h3>
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <p>
                  <strong>Địa điểm:</strong> {room.location}
                </p>
                <p>
                  <strong>Quận:</strong> {room.district_name}
                </p>
                <p>
                  <strong>Sức chứa:</strong> {room.capacity}
                </p>
                <p>
                  <strong>Giá:</strong> {room.price} VNĐ/giờ
                </p>
                <button
                  className="btn-details"
                  onClick={() => SeeDetails(room.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default Rooms;
