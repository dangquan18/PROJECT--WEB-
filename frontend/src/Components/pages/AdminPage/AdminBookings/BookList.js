import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Drawer,
  Descriptions,
  Spin,
  Row,
  Col,
} from "antd";
import { Calendar, Clock, User } from "lucide-react";
import axios from "axios"; // Import axios
import dayjs from "dayjs";
import RoomDetails from "./RoomDetails";
import Sidebar from "../../../Layout/Admin/Sidebar/Sidebar";
import Header from "../../../Layout/Admin/Header/Header";
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onStatusChange = async (bookingId, newStatus) => {
    try {
      // Gửi yêu cầu PUT tới API để cập nhật trạng thái của booking
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          status: newStatus,
        }
      );

      // Nếu yêu cầu thành công, cập nhật lại trạng thái trong bảng
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Fetch room details when a booking is selected
  useEffect(() => {
    if (selectedBooking?.room_id && !selectedBooking.roomDetails) {
      const fetchRoomDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/rooms/${selectedBooking.room_id}`
          );
          setSelectedBooking((prevBooking) => ({
            ...prevBooking,
            roomDetails: response.data, // Cập nhật room details vào selectedBooking
          }));
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      };
      fetchRoomDetails();
    }
  }, [selectedBooking]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "gold",
      confirmed: "green",
      cancelled: "red",
    };
    return statusColors[status] || "default";
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
    setDrawerVisible(true);
    console.log(booking);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "booking_id",
      key: "booking_id",
      width: 80,
    },
    {
      title: "Room",
      key: "room",
      render: (record) => {
        console.log("Record:", record); // Kiểm tra dữ liệu ở đây
        return (
          <Button type="link" onClick={() => showBookingDetails(record)}>
            {record.room_name || "Loading..."}
          </Button>
        );
      },
    },
    {
      title: "User",
      key: "user",
      render: (record) => (
        <Space>
          <User size={16} />
          {record.user_name || "Loading..."}
        </Space>
      ),
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (record) => (
        <Space direction="vertical" size="small">
          <Space>
            <Calendar size={16} />
            {formatDate(record.date)}
          </Space>
          <Space>
            <Clock size={16} />
            {`${formatTime(record.start_time)} - ${formatTime(
              record.end_time
            )}`}
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => onStatusChange(record.booking_id, "confirmed")}
              >
                Confirm
              </Button>
              <Button
                danger
                size="small"
                onClick={() => onStatusChange(record.booking_id, "cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
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
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Table
            columns={columns}
            dataSource={bookings}
            rowKey="booking_id"
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
                  {selectedBooking.roomDetails && (
                    <RoomDetails room={selectedBooking.roomDetails} />
                  )}
                </Col>
                <Col span={24}>
                  <Descriptions
                    title="Booking Information"
                    bordered
                    column={1}
                    className="mt-4"
                  >
                    <Descriptions.Item label="Booking ID">
                      {selectedBooking.booking_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="User">
                      {selectedBooking.user_name || "Loading..."}
                    </Descriptions.Item>
                    <Descriptions.Item label="Room">
                      {selectedBooking.room_name || "Loading..."}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date">
                      {formatDate(selectedBooking.date)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Time">
                      {`${formatTime(
                        selectedBooking.start_time
                      )} - ${formatTime(selectedBooking.end_time)}`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color={getStatusColor(selectedBooking.status)}>
                        {selectedBooking.status.toUpperCase()}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            )}
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default BookingList;
