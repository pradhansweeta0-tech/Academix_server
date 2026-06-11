import { Router } from "express";

import { sendContactMessageController } from "./contact.controller";

const router = Router();

router.post("/", sendContactMessageController);

export default router;
