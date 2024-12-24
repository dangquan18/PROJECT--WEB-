import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Modal, Tag, Select, message } from "antd";
import Sidebar from "../../../Layout/Admin/Sidebar/Sidebar";
import Header from "../../../Layout/Admin/Header/Header";
import axios from "axios";
import "./AdminRooms.css";
import { AiFillDelete } from "react-icons/ai";

const API_URL = "http://localhost:5000/api/adminrooms";
const DISTRICT_API_URL = "http://localhost:5000/api/districts";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm(); // Khởi tạo form instance

  const fetchRooms = async () => {
    try {
      const response = await axios.get(API_URL);
      setRooms(response.data);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách phòng.");
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(DISTRICT_API_URL);
      setDistricts(response.data);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách quận.");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchDistricts();
  }, []);

  const handleAddRoom = async (values) => {
    try {
      const response = await axios.post(API_URL, {
        ...values,
        district_id: values.districtId,
      });
      message.success("Thêm phòng thành công!");
      setIsAddModalVisible(false);
      fetchRooms();
    } catch (error) {
      message.error("Lỗi khi thêm phòng.");
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`${API_URL}/${selectedRoom.id}`, {
        ...values,
        district_id: values.districtId,
      });
      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id ? response.data : room
        )
      );
      message.success("Cập nhật phòng thành công!");
      setIsModalVisible(false);
      setSelectedRoom(null);
      fetchRooms();
    } catch (error) {
      message.error("Lỗi khi cập nhật phòng.");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRooms(rooms.filter((room) => room.id !== id));
      message.success("Xóa phòng thành công!");
    } catch (error) {
      message.error("Lỗi khi xóa phòng.");
    }
  };

  const columns = [
    { title: "Tên phòng", dataIndex: "name", key: "name" },
    { title: "Vị trí", dataIndex: "location", key: "location" },
    {
      title: "Quận",
      dataIndex: "district_id",
      key: "district_id",
      render: (districtId) => {
        const district = districts.find((d) => d.id === districtId);
        return district ? district.name : "Chưa có quận";
      },
    },
    { title: "Sức chứa", dataIndex: "capacity", key: "capacity" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <Tag color="green">${price}</Tag>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 70,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setSelectedRoom(record);
              setIsModalVisible(true);
              form.setFieldsValue(record); // Cập nhật giá trị form khi mở modal
            }}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => handleDeleteRoom(record.id)}>
            <AiFillDelete />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div>
          <h2>Quản lý phòng</h2>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            Thêm phòng
          </Button>
          <Table dataSource={rooms} columns={columns} rowKey="id" />

          {/* Modal cập nhật phòng */}
          <Modal
            title={`Cập nhật phòng: ${selectedRoom?.name}`}
            visible={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields(); // Reset form khi đóng modal
            }}
            footer={null}
          >
            {selectedRoom && (
              <Form
                form={form}
                layout="vertical"
                initialValues={selectedRoom}
                onFinish={handleUpdate}
              >
                <Form.Item
                  name="name"
                  label="Tên phòng"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="location" label="Vị trí">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="districtId"
                  label="Quận"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue={selectedRoom.district_id}>
                    {districts.map((district) => (
                      <Select.Option key={district.id} value={district.id}>
                        {district.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="capacity" label="Sức chứa">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="price" label="Giá">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="imageUrl" label="URL hình ảnh">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Lưu thay đổi
                  </Button>
                  <Button
                    onClick={() => setIsModalVisible(false)}
                    style={{ marginLeft: 8 }}
                  >
                    Hủy
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Modal>

          {/* Modal thêm phòng */}
          <Modal
            title="Thêm phòng mới"
            visible={isAddModalVisible}
            onCancel={() => setIsAddModalVisible(false)}
            footer={null}
          >
            <Form layout="vertical" onFinish={handleAddRoom}>
              <Form.Item
                name="name"
                label="Tên phòng"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="location" label="Vị trí">
                <Input />
              </Form.Item>
              <Form.Item
                name="districtId"
                label="Quận"
                rules={[{ required: true }]}
              >
                <Select>
                  {districts.map((district) => (
                    <Select.Option key={district.id} value={district.id}>
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="capacity" label="Sức chứa">
                <Input type="number" />
              </Form.Item>
              <Form.Item name="price" label="Giá">
                <Input type="number" />
              </Form.Item>
              <Form.Item name="imageUrl" label="URL hình ảnh">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button
                  onClick={() => setIsAddModalVisible(false)}
                  style={{ marginLeft: 8 }}
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default AdminRooms;
