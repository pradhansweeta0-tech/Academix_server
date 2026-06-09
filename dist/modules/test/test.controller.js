"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestController = exports.updateTestController = exports.getTestByIdController = exports.getTestsController = exports.createTestController = void 0;
const test_service_1 = require("./test.service");
const createTestController = async (req, res) => {
    const user = req.user;
    const result = await (0, test_service_1.createTest)(user.id, req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createTestController = createTestController;
const getTestsController = async (req, res) => {
    const user = req.user;
    const result = await (0, test_service_1.getTests)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getTestsController = getTestsController;
const getTestByIdController = async (req, res) => {
    const user = req.user;
    const result = await (0, test_service_1.getTestById)(user.id, req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getTestByIdController = getTestByIdController;
const updateTestController = async (req, res) => {
    const user = req.user;
    const result = await (0, test_service_1.updateTest)(user.id, req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateTestController = updateTestController;
const deleteTestController = async (req, res) => {
    const user = req.user;
    const result = await (0, test_service_1.deleteTest)(user.id, req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteTestController = deleteTestController;
