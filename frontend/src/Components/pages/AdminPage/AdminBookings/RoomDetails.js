import React, { useEffect, useState } from "react";
import { Card, Descriptions, Image, Tag } from "antd";
import axios from "axios";

const RoomDetails = ({ room }) => {
  const [districtName, setDistrictName] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [districts, setDistricts] = useState([]); // Danh sách các quận

  // Hàm lấy tất cả các quận từ API
  const fetchDistricts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/districts");
      setDistricts(response.data); // Lưu tất cả các quận vào state
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Lấy danh sách các quận khi component được mount
  useEffect(() => {
    fetchDistricts();
  }, []);

  // Lọc tên quận từ danh sách dựa trên districtId
  useEffect(() => {
    const findDistrictName = () => {
      if (districts.length > 0 && room.districtId) {
        const district = districts.find(
          (district) => district.id === room.districtId
        );
        setDistrictName(district ? district.name : "Unknown");
      }
    };

    findDistrictName();
    setLoading(false); // Khi tìm thấy tên quận, set loading là false
  }, [districts, room.districtId]); // Đảm bảo re-run khi districts hoặc room.districtId thay đổi

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Card className="mb-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Image src={room.imageUrl} alt={room.name} className="rounded-lg" />
        </div>
        <div className="w-full md:w-2/3">
          <Descriptions title={room.name} bordered column={1}>
            <Descriptions.Item label="Location">
              {loading ? "Loading..." : districtName} - {room.location}
            </Descriptions.Item>
            <Descriptions.Item label="Capacity">
              {room.capacity} people
            </Descriptions.Item>
            <Descriptions.Item label="Capacity">
              {room.district_name}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {room.price * 1000} VNĐ/1h
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Card>
  );
};

export default RoomDetails;
