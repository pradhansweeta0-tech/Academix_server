"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
        });
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.errors,
        });
    }
};
exports.validateRequest = validateRequest;
