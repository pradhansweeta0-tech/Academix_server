import { Router } from "express";
import { testEmailController } from "./email.controller";

const router = Router();

router.post("/test-email", testEmailController);
router.get("/env-check", (req, res) => {
  res.json({
    emailUserExists: !!process.env.EMAIL_USER,
    emailPassExists: !!process.env.EMAIL_PASS,
  });
});

export default router;
