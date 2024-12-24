import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Box,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";
export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Admin Panel</div>
      <nav>
        <ul className="sidebar-nav">
          <li
            className={`nav-item ${
              location.pathname === "/admin" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/dashboard"
              className={`nav-link ${
                location.pathname === "/admin" ? "active" : ""
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/admin/users" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/users"
              className={`nav-link ${
                location.pathname === "/admin/users" ? "active" : ""
              }`}
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/admin/bookings" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/bookings"
              className={`nav-link ${
                location.pathname === "/admin/bookings" ? "active" : ""
              }`}
            >
              <CalendarDays size={20} />
              <span>Bookings</span>
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/admin/rooms" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/rooms"
              className={`nav-link ${
                location.pathname === "/admin/rooms" ? "active" : ""
              }`}
            >
              <Box size={20} />
              <span>Rooms</span>
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => sessionStorage.removeItem("user")}
              className={`nav-link ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              <LogOut size={20} />
              <span>LogOut</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
