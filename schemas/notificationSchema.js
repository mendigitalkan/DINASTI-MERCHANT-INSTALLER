"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllNotificationSchema = exports.findOneNotificationSchema = exports.deleteNotificationSchema = exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createNotificationSchema = joi_1.default.object({
    notificationName: joi_1.default.string().required(),
    notificationMessage: joi_1.default.string().required(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.updateNotificationSchema = joi_1.default.object({
    notificationId: joi_1.default.string().uuid().required(),
    notificationName: joi_1.default.string().required(),
    notificationMessage: joi_1.default.string().required(),
    updatedAt: joi_1.default.date().optional()
});
exports.deleteNotificationSchema = joi_1.default.object({
    notificationId: joi_1.default.string().required()
});
exports.findOneNotificationSchema = joi_1.default.object({
    notificationId: joi_1.default.string().uuid().required()
});
exports.findAllNotificationSchema = joi_1.default.object({
    page: joi_1.default.number().optional(),
    size: joi_1.default.number().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
