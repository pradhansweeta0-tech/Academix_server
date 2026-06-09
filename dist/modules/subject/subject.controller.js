"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubjectsController = exports.createSubjectController = void 0;
const subject_service_1 = require("./subject.service");
const createSubjectController = async (req, res) => {
    const result = await (0, subject_service_1.createSubject)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createSubjectController = createSubjectController;
const getAllSubjectsController = async (req, res) => {
    const result = await (0, subject_service_1.getAllSubjects)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllSubjectsController = getAllSubjectsController;
