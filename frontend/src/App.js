import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Rooms from "./Components/pages/Rooms/Rooms";
import RoomDetails from "./Components/pages/RoomsDetails/RoomDetails";
import Login from "./Components/Layout/Login/Login";
import ThankYouPage from "./Components/pages/ThankYouPage/ThanKYouPage";
import AboutUs from "./Components/pages/AboutUs/AboutUs";
import ContactUs from "./Components/pages/ContactUs/ContactUs";
import Register from "./Components/Register/Register";
import BookingHistory from "./Components/pages/BookingHistory/BookingHistory";
import BookingList from "./Components/pages/AdminPage/AdminBookings/BookList";
import AdminRooms from "./Components/pages/AdminPage/AdminRooms/AdminRooms";
import AdminUser from "./Components/pages/AdminPage/AdminUser/AdminUser";
import Home from "./Components/pages/Home/Home";
import Dashboard from "./Components/pages/AdminPage/AdminDashBoard/DashBoard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/users" element={<AdminUser />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
