"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../../config/s3");
const prisma_1 = require("../../config/prisma");
const uploadFile = async (req, res) => {
    try {
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
        const savedFile = await prisma_1.prisma.file.create({
            data: {
                fileName: fileName,
                fileUrl: fileUrl,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            },
        });
        res.status(201).json({
            success: true,
            data: savedFile,
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
exports.uploadFile = uploadFile;
