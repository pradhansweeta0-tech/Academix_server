"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("./otp.controller");
const router = (0, express_1.Router)();
router.post("/send", otp_controller_1.sendOTPController);
router.post("/verify", otp_controller_1.verifyOTPController);
exports.default = router;
