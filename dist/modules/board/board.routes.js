"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = require("./board.controller");
const router = (0, express_1.Router)();
router.post("/", board_controller_1.createBoardController);
router.get("/", board_controller_1.getAllBoardsController);
exports.default = router;
