"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClassesController = exports.createClassController = void 0;
const class_service_1 = require("./class.service");
const createClassController = async (req, res) => {
    const result = await (0, class_service_1.createClass)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createClassController = createClassController;
const getAllClassesController = async (req, res) => {
    const result = await (0, class_service_1.getAllClasses)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllClassesController = getAllClassesController;
