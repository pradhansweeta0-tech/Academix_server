"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResource = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../../config/s3");
const prisma_1 = require("../../config/prisma");
const uploadResource = async (req, res) => {
    try {
        const { title, type, contentId } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required",
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
        const resource = await prisma_1.prisma.resource.create({
            data: {
                title,
                type,
                fileUrl,
                fileSize: req.file.size,
                contentId,
            },
        });
        res.status(201).json({
            success: true,
            data: resource,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};
exports.uploadResource = uploadResource;
