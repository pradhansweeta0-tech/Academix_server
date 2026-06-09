"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSubmissionController = exports.getAssignmentSubmissionsController = exports.getMySubmissionsController = exports.submitAssignmentController = void 0;
const submission_service_1 = require("./submission.service");
const submitAssignmentController = async (req, res) => {
    const user = req.user;
    const result = await (0, submission_service_1.submitAssignment)(user.id, req.params.assignmentId, req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.submitAssignmentController = submitAssignmentController;
const getMySubmissionsController = async (req, res) => {
    const user = req.user;
    const result = await (0, submission_service_1.getMySubmissions)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getMySubmissionsController = getMySubmissionsController;
const getAssignmentSubmissionsController = async (req, res) => {
    const result = await (0, submission_service_1.getAssignmentSubmissions)(req.params.assignmentId);
    res.json({
        success: true,
        data: result,
    });
};
exports.getAssignmentSubmissionsController = getAssignmentSubmissionsController;
const evaluateSubmissionController = async (req, res) => {
    const result = await (0, submission_service_1.evaluateSubmission)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.evaluateSubmissionController = evaluateSubmissionController;
