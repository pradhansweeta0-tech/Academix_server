"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentController = exports.updateStudentController = exports.getStudentByIdController = exports.getAllStudentsController = exports.createStudentController = void 0;
const student_service_1 = require("./student.service");
const createStudentController = async (req, res) => {
    const result = await (0, student_service_1.createStudent)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createStudentController = createStudentController;
const getAllStudentsController = async (req, res) => {
    const result = await (0, student_service_1.getAllStudents)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllStudentsController = getAllStudentsController;
const getStudentByIdController = async (req, res) => {
    const result = await (0, student_service_1.getStudentById)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getStudentByIdController = getStudentByIdController;
const updateStudentController = async (req, res) => {
    const result = await (0, student_service_1.updateStudent)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateStudentController = updateStudentController;
const deleteStudentController = async (req, res) => {
    const result = await (0, student_service_1.deleteStudent)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteStudentController = deleteStudentController;
