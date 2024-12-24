import React, { useState, useEffect } from "react";
import { Table, Tag, Spin, Drawer, Descriptions, Row, Col } from "antd";
import { Calendar, Clock } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import RoomDetails from "../AdminPage/AdminBookings/RoomDetails";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);

  // Lấy userId từ sessionStorage
  const user = sessionStorage.getItem("user");
  const userId = user ? JSON.parse(user).user.id : null;

  // Fetch bookings data của user
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings-user?userId=${userId}`
        );
        console.log(response.data); // In ra dữ liệu để kiểm tra
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserBookings();
  }, [userId]);

  // Fetch thông tin chi tiết phòng khi chọn một booking
  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/rooms/${roomId}`
      );
      setRoomDetails(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return dayjs(date).format("DD/MM/YYYY");
  };

  const formatTime = (time) => {
    if (!time) return "-";
    const timeStr = time.toString();
    return timeStr.length >= 5 ? timeStr.slice(0, 5) : timeStr;
  };

  const showBookingDetails = (booking) => {
    setSelectedBooking(booking);
    fetchRoomDetails(booking.room_id); // Lấy thông tin phòng khi chọn booking
    setDrawerVisible(true);
  };

  const getStatusText = (status) => {
    if (status === "confirmed") {
      return "Đã thanh toán";
    }
    if (status === "pending") {
      return "chưa thanh toán";
    }
    if (status === "cancelled") {
      return "Đã hủy";
    }
  };

  const columns = [
    {
      title: "Mã Đặt Phòng",
      dataIndex: "id", // Dùng id thay vì booking_id
      key: "id",
      render: (text) => text || "N/A", // Nếu không có id, hiển thị "N/A"
      width: 80,
    },
    {
      title: "Phòng",
      key: "room",
      render: (record) => (
        <a
          onClick={() => showBookingDetails(record)}
        >{`Room ${record.name}`}</a>
      ),
    },
    {
      title: "Thời gian đặt",
      key: "datetime",
      render: (record) => (
        <>
          <div>
            <Calendar size={16} />
            {formatDate(record.date)}
          </div>
          <div>
            <Clock size={16} />
            {`${formatTime(record.start_time)} - ${formatTime(
              record.end_time
            )}`}
          </div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "confirmed"
              ? "green"
              : status === "pending"
              ? "gold"
              : "red"
          }
        >
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Ngày đặt phòng",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => formatDate(date),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} bookings`,
        }}
      />

      <Drawer
        title="Booking Details"
        placement="right"
        width={720}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedBooking && (
          <Row gutter={16}>
            <Col span={24}>
              {roomDetails && <RoomDetails room={roomDetails} />}
            </Col>
            <Col span={24}>
              <Descriptions
                title="Booking Information"
                bordered
                column={1}
                className="mt-4"
              >
                <Descriptions.Item label="Booking ID">
                  {selectedBooking.id}
                </Descriptions.Item>
                <Descriptions.Item label="Room">
                  {`Room ${selectedBooking.room_id}`}{" "}
                  {/* Có thể thay đổi để lấy tên phòng */}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {formatDate(selectedBooking.date)}
                </Descriptions.Item>
                <Descriptions.Item label="Time">
                  {`${formatTime(selectedBooking.start_time)} - ${formatTime(
                    selectedBooking.end_time
                  )}`}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      selectedBooking.status === "confirmed" ? "green" : "gold"
                    }
                  >
                    {getStatusText(selectedBooking.status)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Create Date">
                  {formatDate(selectedBooking.created_at)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </Drawer>
      <Footer />
    </>
  );
};

export default BookingHistory;
