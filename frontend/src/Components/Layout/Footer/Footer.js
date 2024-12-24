import React from "react";
import "./Footer.css"; // Đảm bảo có thêm file CSS tương ứng
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="booking-footer">
      <div className="booking-footer-content">
        <div className="booking-footer-section">
          <h3>MeetSpace</h3>
          <p>
            Chúng tôi tự hào về đội ngũ chuyên gia và chuyên viên năng động,
            giàu kinh nghiệm. Meetspace cam kết hỗ trợ khách thuê đàm phán giá,
            chuẩn bị hợp đồng và cung cấp giải pháp quản lý hiệu quả nhất.
          </p>
          <div className="booking-social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        <div className="booking-footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <i className="fas fa-chevron-right"></i>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>
              <Link to="/rooms">Phòng họp Hà Nội</Link>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>
              <Link to="/aboutUs">Về chúng tôi</Link>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>
              <Link to="/ContactUs">Liên hệ</Link>
            </li>
          </ul>
        </div>

        <div className="booking-footer-section">
          <h3>Liên Hệ</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>Hà Nội, Việt Nam
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>+84 123 456 789
            </li>
            <li>
              <i className="fas fa-envelope"></i>dangq2359@gmail.com
            </li>
            <li>
              <i className="far fa-clock"></i>hoạt động 24/7
            </li>
          </ul>
        </div>
      </div>

      <div className="booking-footer-bottom">
        <p>&copy; 2024 MeetSpace All rights reserved.</p>
        <div className="payment-methods">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-amex"></i>
          <i className="fab fa-cc-paypal"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
