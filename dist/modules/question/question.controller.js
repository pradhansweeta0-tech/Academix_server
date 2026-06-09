"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionController = exports.updateQuestionController = exports.getQuestionByIdController = exports.getQuestionsController = exports.createQuestionController = void 0;
const question_service_1 = require("./question.service");
const createQuestionController = async (req, res) => {
    const result = await (0, question_service_1.createQuestion)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createQuestionController = createQuestionController;
const getQuestionsController = async (req, res) => {
    const result = await (0, question_service_1.getQuestions)(req.params.testId);
    res.json({
        success: true,
        data: result,
    });
};
exports.getQuestionsController = getQuestionsController;
const getQuestionByIdController = async (req, res) => {
    const result = await (0, question_service_1.getQuestionById)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getQuestionByIdController = getQuestionByIdController;
const updateQuestionController = async (req, res) => {
    const result = await (0, question_service_1.updateQuestion)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateQuestionController = updateQuestionController;
const deleteQuestionController = async (req, res) => {
    const result = await (0, question_service_1.deleteQuestion)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteQuestionController = deleteQuestionController;
