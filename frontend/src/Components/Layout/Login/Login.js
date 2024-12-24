import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log(res.data.message);

      // Lưu thông tin người dùng vào sessionStorage
      sessionStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);

      // Kiểm tra role và điều hướng
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard"); // Chuyển sang trang admin nếu role là admin
      } else {
        navigate("/"); // Chuyển sang trang user nếu role là user
      }
    } catch (error) {
      console.error("Invalid login");
      setError("Đăng nhập không hợp lệ, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Hiển thị thông báo lỗi nếu có */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Đăng nhập
      </button>
      <div className="signupContainer">
        <p className="signupText">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="signupLink">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
