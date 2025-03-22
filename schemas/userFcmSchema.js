"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUserFcmSchema = exports.findOneUserFcmSchema = exports.deleteUserFcmSchema = exports.updateUserFcmSchema = exports.createUserFcmSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserFcmSchema = joi_1.default.object({
    userFcmId: joi_1.default.string().required(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.updateUserFcmSchema = joi_1.default.object({
    userFcmId: joi_1.default.string().required(),
    updatedAt: joi_1.default.date().optional()
});
exports.deleteUserFcmSchema = joi_1.default.object({
    userFcmId: joi_1.default.string().required()
});
exports.findOneUserFcmSchema = joi_1.default.object({
    userFcmId: joi_1.default.string().required()
});
exports.findAllUserFcmSchema = joi_1.default.object({
    page: joi_1.default.number().optional(),
    size: joi_1.default.number().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
