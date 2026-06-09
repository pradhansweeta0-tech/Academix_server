import { Router } from "express";
import { upload } from "../../middlewares/upload";
import { uploadFile } from "./upload.controller";

const router = Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
