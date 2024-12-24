import React from "react";
import { Users, CalendarDays, Building2, CheckCircle } from "lucide-react";
import "./DashBoard.css";
import Sidebar from "../../../Layout/Admin/Sidebar/Sidebar";
import Header from "../../../Layout/Admin/Header/Header";
const stats = [
  {
    title: "Total Users",
    value: "245",
    icon: Users,
    change: "+4.75%",
    changeType: "positive",
  },
  {
    title: "Active Bookings",
    value: "12",
    icon: CalendarDays,
    change: "+10.2%",
    changeType: "positive",
  },
  {
    title: "Available Rooms",
    value: "8",
    icon: Building2,
    change: "-2.4%",
    changeType: "negative",
  },
  {
    title: "Booking Rate",
    value: "88%",
    icon: CheckCircle,
    change: "+6.2%",
    changeType: "positive",
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="stats-grid">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="stat-card">
                    <div className="stat-header">
                      <p className="stat-title">{stat.title}</p>
                      <div className="stat-icon">
                        <Icon size={24} />
                      </div>
                    </div>
                    <p className="stat-value">{stat.value}</p>
                    <p className={`stat-change ${stat.changeType}`}>
                      {stat.change}
                      <span className="text-gray-600"> from last month</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2 className="dashboard-card-title">Recent Bookings</h2>
                {/* Add recent bookings table here */}
              </div>

              <div className="dashboard-card">
                <h2 className="dashboard-card-title">Room Availability</h2>
                {/* Add room availability chart here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
