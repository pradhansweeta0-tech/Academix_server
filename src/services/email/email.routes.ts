import { Router } from "express";
import { testEmailController } from "./email.controller";

const router = Router();

router.post("/test-email", testEmailController);

export default router;
