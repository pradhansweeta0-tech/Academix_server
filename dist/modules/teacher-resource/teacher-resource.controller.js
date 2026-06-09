"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTeacherResourceController = exports.deleteTeacherResourceController = exports.updateTeacherResourceController = exports.getTeacherResourceByIdController = exports.getTeacherResourcesController = exports.createTeacherResourceController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../../config/s3");
const teacher_resource_service_1 = require("./teacher-resource.service");
const createTeacherResourceController = async (req, res) => {
    const user = req.user;
    const result = await (0, teacher_resource_service_1.createTeacherResource)(user.id, req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createTeacherResourceController = createTeacherResourceController;
const getTeacherResourcesController = async (req, res) => {
    const user = req.user;
    const result = await (0, teacher_resource_service_1.getTeacherResources)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getTeacherResourcesController = getTeacherResourcesController;
const getTeacherResourceByIdController = async (req, res) => {
    const user = req.user;
    const result = await (0, teacher_resource_service_1.getTeacherResourceById)(user.id, req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getTeacherResourceByIdController = getTeacherResourceByIdController;
const updateTeacherResourceController = async (req, res) => {
    const user = req.user;
    const result = await (0, teacher_resource_service_1.updateTeacherResource)(user.id, req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateTeacherResourceController = updateTeacherResourceController;
const deleteTeacherResourceController = async (req, res) => {
    const user = req.user;
    const result = await (0, teacher_resource_service_1.deleteTeacherResource)(user.id, req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteTeacherResourceController = deleteTeacherResourceController;
const uploadTeacherResourceController = async (req, res) => {
    try {
        const user = req.user;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const fileName = `${Date.now()}-${req.file.originalname}`;
        await s3_1.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }));
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        const result = await (0, teacher_resource_service_1.createTeacherResource)(user.id, {
            title: req.body.title,
            type: req.body.type,
            contentId: req.body.contentId,
            fileUrl,
            fileSize: req.file.size,
        });
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};
exports.uploadTeacherResourceController = uploadTeacherResourceController;
