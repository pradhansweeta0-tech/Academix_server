"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcademicSessionController = exports.updateAcademicSessionController = exports.getAcademicSessionByIdController = exports.getAllAcademicSessionsController = exports.createAcademicSessionController = void 0;
const academic_session_service_1 = require("./academic-session.service");
const createAcademicSessionController = async (req, res) => {
    try {
        const result = await (0, academic_session_service_1.createAcademicSession)(req.body);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createAcademicSessionController = createAcademicSessionController;
const getAllAcademicSessionsController = async (req, res) => {
    const result = await (0, academic_session_service_1.getAllAcademicSessions)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllAcademicSessionsController = getAllAcademicSessionsController;
const getAcademicSessionByIdController = async (req, res) => {
    const id = req.params.id;
    const result = await (0, academic_session_service_1.getAcademicSessionById)(id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getAcademicSessionByIdController = getAcademicSessionByIdController;
const updateAcademicSessionController = async (req, res) => {
    const result = await (0, academic_session_service_1.updateAcademicSession)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateAcademicSessionController = updateAcademicSessionController;
const deleteAcademicSessionController = async (req, res) => {
    const result = await (0, academic_session_service_1.deleteAcademicSession)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteAcademicSessionController = deleteAcademicSessionController;
