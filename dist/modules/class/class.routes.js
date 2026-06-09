"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_controller_1 = require("./class.controller");
const router = (0, express_1.Router)();
router.post("/", class_controller_1.createClassController);
router.get("/", class_controller_1.getAllClassesController);
exports.default = router;
