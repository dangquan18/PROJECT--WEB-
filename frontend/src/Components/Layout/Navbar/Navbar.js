import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const navigate = useNavigate();

  // Cập nhật user mỗi khi sessionStorage thay đổi
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Xóa thông tin user
    setUser(null); // Cập nhật state về null
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <span className="navbarLogo">MeetSpace</span>

        <div className="navItems">
          <Link to="/" className="navLink">
            Trang chủ
          </Link>
          <Link to="/rooms" className="navLink">
            Phòng họp Hà Nội
          </Link>
          <Link className="navLink" to="/aboutUs">
            Về chúng tôi
          </Link>
          <Link className="navLink" to="/ContactUs">
            Liên hệ
          </Link>

          {user ? (
            <>
              <Link to="/bookinghistory" className="navLink">
                Lịch sử đặt phòng{" "}
              </Link>
              <span className="navUser">Xin chào, {user.user.email}</span>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navLink">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
