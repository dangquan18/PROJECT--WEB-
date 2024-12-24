import Sidebar from "../../../Layout/Admin/Sidebar/Sidebar";
import Header from "../../../Layout/Admin/Header/Header";
import { Button, Table, Modal, Form, Input, Select, notification } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUser.css";
const { Option } = Select;

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu người dùng từ API
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) =>
        console.error("There was an error fetching the users!", error)
      );
  };

  const handleAddUser = () => {
    setIsEdit(false);
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setIsEdit(true);
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        notification.success({ message: "User deleted successfully" });
      })
      .catch((error) => notification.error({ message: "Error deleting user" }));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleSubmit = (values) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password || editingUser?.password, // Giữ mật khẩu cũ nếu không nhập mới
      role: values.role,
      phone_number: values.phone_number,
    };

    if (isEdit) {
      // Cập nhật người dùng
      axios
        .put(`http://localhost:5000/api/users/${editingUser.id}, user`)
        .then(() => {
          // Cập nhật trực tiếp người dùng trong state
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === editingUser.id ? { ...u, ...user } : u
            )
          );
          notification.success({ message: "User updated successfully" });
          setIsModalVisible(false);
          setEditingUser(null); // Reset trạng thái người dùng đang chỉnh sửa
        })
        .catch((error) =>
          notification.error({
            message: "Error updating user",
            description: error.message,
          })
        );
    } else {
      // Thêm người dùng mới
      axios
        .post("http://localhost:5000/api/users", user)
        .then((response) => {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          notification.success({ message: "User added successfully" });
          setIsModalVisible(false);
          fetchUsers(); // Lấy lại dữ liệu người dùng
        })
        .catch((error) =>
          notification.error({
            message: "Error adding user",
            description: error.message,
          })
        );
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (_, record) => (
        <Input.Password value={record.password} readOnly />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEditUser(user)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteUser(user.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div style={{ padding: "20px" }}>
            <h1>User Management</h1>
            <Button
              type="primary"
              onClick={handleAddUser}
              style={{ marginBottom: "20px" }}
            >
              Add User
            </Button>
            <Table dataSource={users} columns={columns} rowKey="id" />

            {/* Modal for Adding/Editing User */}
            <Modal
              title={isEdit ? "Edit User" : "Add User"}
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                initialValues={isEdit ? editingUser : {}}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input the email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                {!isEdit && (
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input the password!" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                )}

                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    { required: true, message: "Please select the role!" },
                  ]}
                >
                  <Select>
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Phone Number" name="phone_number">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? "Update User" : "Add User"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUser;
