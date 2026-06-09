import { Router } from "express";

import { sendOTPController, verifyOTPController } from "./otp.controller";

const router = Router();

router.post("/send", sendOTPController);

router.post("/verify", verifyOTPController);

export default router;
