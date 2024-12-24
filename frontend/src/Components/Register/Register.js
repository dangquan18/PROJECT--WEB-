import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // State lưu thông tin form
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form

    // Kiểm tra đầu vào trước khi gửi yêu cầu
    if (!name || !phone_number || !email || !password) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setMessage("Email không hợp lệ!");
      return;
    }

    // Kiểm tra số điện thoại (chỉ là ví dụ)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone_number)) {
      setMessage("Số điện thoại không hợp lệ!");
      return;
    }

    try {
      // Gửi yêu cầu đăng kí tới API
      const res = await axios.post("http://localhost:5000/api/register", {
        name,
        phone_number,
        email,
        password,
      });

      console.log(res.data.message);
      alert("Đăng kí thành công!");
      navigate("/login");
    } catch (error) {
      // Xử lý lỗi khi đăng kí thất bại
      console.error(
        "Đăng kí thất bại:",
        error.response ? error.response.data : error.message
      );
      setMessage("Đăng kí thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="register-form">
      <h2>Form Đăng Kí</h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register-btn" type="submit">
          Đăng Kí
        </button>
      </form>
    </div>
  );
};

export default Register;
