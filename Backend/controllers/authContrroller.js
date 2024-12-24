const User = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUser(email, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0 && results[0].password === password) {
      // Gửi thông tin user về frontend
      req.session.user = {
        id: results[0].id,
        email,
        phone_number: results[0].phone_number,
        name: results[0].name,
        role: results[0].role,
      };
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: results[0].id,
          email,
          phone_number: results[0].phone_number,
          name: results[0].name,
          role: results[0].role,
        },
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  });
};
exports.register = (req, res) => {
  const { email, password, phone_number, name } = req.body;

  if (!email || !password || !phone_number || !name) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Kiểm tra xem email đã tồn tại chưa
  User.findUser(email, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi tìm kiếm email." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo tài khoản người dùng mới
    User.createUser(email, password, phone_number, name, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Đăng ký thất bại" });
      }

      return res
        .status(201)
        .json({ message: "Người dùng đã được đăng ký thành công" });
    });
  });
};
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    return res.status(200).json({ message: "Logged out" });
  });
};
