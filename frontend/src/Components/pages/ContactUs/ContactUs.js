// ContactUs.js
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLink } from "react-icons/fa"; // Import icons từ React Icons
import "./ContactUs.css";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-header">
          <h2>Liên Hệ Chúng Tôi</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với
            chúng tôi qua thông tin dưới đây.
          </p>
        </div>

        <div className="contact-details">
          {/* Ô thông tin liên hệ 1: Email */}
          <div className="contact-info">
            <FaEnvelope size={30} />
            <h3>Email</h3>
            <p>support@booking.com</p>
          </div>

          {/* Ô thông tin liên hệ 2: Điện thoại */}
          <div className="contact-info">
            <FaPhoneAlt size={30} />
            <h3>Điện thoại</h3>
            <p>+84 123 456 789</p>
          </div>

          {/* Ô thông tin liên hệ 3: Địa chỉ */}
          <div className="contact-info">
            <FaMapMarkerAlt size={30} />
            <h3>Địa chỉ</h3>
            <p>Hà Nội, Việt Nam</p>
          </div>

          {/* Ô thông tin liên hệ 4: Website */}
          <div className="contact-info">
            <FaLink size={30} />
            <h3>Website</h3>
            <p>www.booking.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
