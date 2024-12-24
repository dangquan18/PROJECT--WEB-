// controllers/userController.js
const userModel = require("../models/AdminUser");

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Thêm người dùng mới
const createUser = async (req, res) => {
  const { name, email, password, role, phone_number } = req.body;
  try {
    await userModel.createUser(name, email, password, role, phone_number);
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Error adding user" });
  }
};

// Sửa thông tin người dùng
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone_number } = req.body;
  try {
    const affectedRows = await userModel.updateUser(
      id,
      name,
      email,
      password,
      role,
      phone_number
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await userModel.deleteUser(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
