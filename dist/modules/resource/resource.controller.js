"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResourceController = exports.updateResourceController = exports.getResourceByIdController = exports.getAllResourcesController = exports.createResourceController = void 0;
const resource_service_1 = require("./resource.service");
const createResourceController = async (req, res) => {
    const result = await (0, resource_service_1.createResource)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createResourceController = createResourceController;
const getAllResourcesController = async (req, res) => {
    const result = await (0, resource_service_1.getAllResources)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllResourcesController = getAllResourcesController;
const getResourceByIdController = async (req, res) => {
    const result = await (0, resource_service_1.getResourceById)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getResourceByIdController = getResourceByIdController;
const updateResourceController = async (req, res) => {
    const result = await (0, resource_service_1.updateResource)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateResourceController = updateResourceController;
const deleteResourceController = async (req, res) => {
    const result = await (0, resource_service_1.deleteResource)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteResourceController = deleteResourceController;
