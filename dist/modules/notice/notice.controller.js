"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoticeController = exports.updateNoticeController = exports.getNoticeByIdController = exports.getAllNoticesController = exports.createNoticeController = void 0;
const notice_service_1 = require("./notice.service");
const createNoticeController = async (req, res) => {
    const user = req.user;
    const result = await (0, notice_service_1.createNotice)(user, req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createNoticeController = createNoticeController;
const getAllNoticesController = async (req, res) => {
    const result = await (0, notice_service_1.getAllNotices)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllNoticesController = getAllNoticesController;
const getNoticeByIdController = async (req, res) => {
    const result = await (0, notice_service_1.getNoticeById)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getNoticeByIdController = getNoticeByIdController;
const updateNoticeController = async (req, res) => {
    const result = await (0, notice_service_1.updateNotice)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateNoticeController = updateNoticeController;
const deleteNoticeController = async (req, res) => {
    const result = await (0, notice_service_1.deleteNotice)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteNoticeController = deleteNoticeController;
