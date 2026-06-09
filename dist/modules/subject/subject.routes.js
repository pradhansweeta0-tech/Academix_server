"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = require("./subject.controller");
const router = (0, express_1.Router)();
router.post("/", subject_controller_1.createSubjectController);
router.get("/", subject_controller_1.getAllSubjectsController);
exports.default = router;
