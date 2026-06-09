"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const result_controller_1 = require("./result.controller");
const router = (0, express_1.Router)();
router.get("/my", (0, auth_1.auth)("STUDENT"), result_controller_1.getMyResultController);
exports.default = router;
