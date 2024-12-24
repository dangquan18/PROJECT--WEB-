// components/HeroSearch.js
import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function HeroSearch() {
  const navigate = useNavigate();

  return (
    <section className="hero-search">
      <div className="hero-content">
        <h1>Chào mừng đến với hệ thống đặt phòng họp</h1>
        <p>Hãy tìm phòng phù hợp nhất với bạn</p>
        <button className="search on" onClick={() => navigate("/rooms")}>
          Tìm phòng ngay
        </button>
      </div>
    </section>
  );
}

export default HeroSearch;
