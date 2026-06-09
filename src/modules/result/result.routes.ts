import { Router } from "express";
import { auth } from "../../middlewares/auth";

import { getMyResultController } from "./result.controller";

const router = Router();

router.get("/my", auth("STUDENT"), getMyResultController);

export default router;
