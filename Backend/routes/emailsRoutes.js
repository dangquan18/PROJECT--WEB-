// routes/emailRoutes.js
const express = require("express");
const { sendEmailController } = require("../controllers/sendEmail");

const router = express.Router();

router.post("/send-email", sendEmailController);

module.exports = router;
