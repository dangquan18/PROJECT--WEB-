import React from "react";
import "./AboutUs.css";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import logo from "../../../Components/Assets/images.png";
import av1 from "../../../Components/Assets/logo1.jpg";
import av2 from "../../../Components/Assets/logo2.jpg";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us">
        {/* Section: Why Choose OfficeSpace */}
        <section className="why-choose-us">
          <h2 className="section-title">
            Tại sao nên chọn thuê văn phòng với MeetSpace?
          </h2>
          <div className="why-choose-content">
            <img src={logo} alt="MeetSpace" className="why-choose-img" />
            <ul className="why-choose-list">
              <li>
                <h3>Uy tín thương hiệu</h3>
                <p>
                  MeetSpace là một dịch vụ được cung cấp bởi Công ty Cổ phần
                  dịch vụ Bất động sản An Cư. Chúng tôi đại diện cho hơn 800 tòa
                  phòng cho thuê tại Hà Nội.
                </p>
              </li>
              <li>
                <h3>Am hiểu thị trường</h3>
                <p>
                  Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi nắm rõ tình
                  hình thị trường và hàng triệu m² sàn phòng cho thuê.
                </p>
              </li>
              <li>
                <h3>Tư vấn chuyên sâu</h3>
                <p>
                  Định hướng cung cấp thông tin nhanh và chính xác, MeetSpace
                  cam kết mang lại chất lượng vượt trội.
                </p>
              </li>
              <li>
                <h3>Hỗ trợ tận tâm</h3>
                <p>
                  Hỗ trợ chuyên nghiệp 24/7, sẵn sàng gọi lại trong 30 phút, cam
                  kết tận tâm trong từng dịch vụ.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Statistics */}
        <section className="statistics">
          <div className="stat-item">
            <h3>8000+</h3>
            <p>Khách hàng thân thiết</p>
          </div>
          <div className="stat-item">
            <h3>800+</h3>
            <p>Văn phòng tại Hà Nội</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
        </section>

        {/* Section: Our Team */}
        <section className="our-team">
          <h2 className="section-title">Đội ngũ MeetSpace</h2>
          <p>
            Chúng tôi tự hào về đội ngũ chuyên gia và chuyên viên năng động,
            giàu kinh nghiệm. Officespace cam kết hỗ trợ khách thuê đàm phán
            giá, chuẩn bị hợp đồng và cung cấp giải pháp quản lý hiệu quả nhất.
          </p>
          <div className="team-content">
            {/* Add team member cards here */}
            <div className="team-member">
              <img src={av2} alt="Team Member" />
              <h3>Tạ Đăng Quân</h3>
              <p>Chuyên viên tư vấn</p>
            </div>
            <div className="team-member">
              <img src={av1} alt="Team Member" />
              <h3>Trần Thị B</h3>
              <p>Chuyên gia thị trường</p>
            </div>
            {/* Add more members if needed */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
