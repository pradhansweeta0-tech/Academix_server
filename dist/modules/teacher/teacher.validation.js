"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherSchema = void 0;
const zod_1 = require("zod");
exports.createTeacherSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        password: zod_1.z.string().min(6),
        qualification: zod_1.z.string().optional(),
        experience: zod_1.z.number().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
