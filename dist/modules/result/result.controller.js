"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyResultController = void 0;
const result_service_1 = require("./result.service");
const getMyResultController = async (req, res) => {
    const user = req.user;
    const result = await (0, result_service_1.getMyResult)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getMyResultController = getMyResultController;
