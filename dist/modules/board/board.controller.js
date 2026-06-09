"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBoardsController = exports.createBoardController = void 0;
const board_service_1 = require("./board.service");
const createBoardController = async (req, res) => {
    const result = await (0, board_service_1.createBoard)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createBoardController = createBoardController;
const getAllBoardsController = async (req, res) => {
    const result = await (0, board_service_1.getAllBoards)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllBoardsController = getAllBoardsController;
