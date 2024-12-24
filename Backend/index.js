const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const db = require("./config/database");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const booking = require("./routes/bookingRoutes");
const emailRoutes = require("./routes/emailsRoutes");
const AdminRoomRoutes = require("./routes/AdminRoomRoutes");
const AdminUserRoutes = require("./routes/AdminUserRoutes");
app.use(express.json());
app.use(cors());

const PORT = 5000;
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);
app.use(bodyParser.json());
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use("/api", booking);
app.use("/api", emailRoutes);
app.use("/api", AdminRoomRoutes);
app.use("/api", AdminUserRoutes);

app.listen(PORT, () => console.log(`Backend chạy trên cổng ${PORT}`));
