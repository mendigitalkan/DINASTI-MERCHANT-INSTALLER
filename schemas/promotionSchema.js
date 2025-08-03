"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPromoSchema = exports.findOnePromoSchema = exports.deletePromoSchema = exports.updatePromoSchema = exports.createPromoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPromoSchema = joi_1.default.object({
    promotionName: joi_1.default.string().required(),
    promotionDescription: joi_1.default.string().required(),
    promotionImage: joi_1.default.string().required(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.updatePromoSchema = joi_1.default.object({
    promotionId: joi_1.default.string().uuid().required(),
    promotionName: joi_1.default.string().required(),
    promotionDescription: joi_1.default.string().required(),
    updatedAt: joi_1.default.date().optional()
});
exports.deletePromoSchema = joi_1.default.object({
    promotionId: joi_1.default.string().required()
});
exports.findOnePromoSchema = joi_1.default.object({
    promotionId: joi_1.default.string().uuid().required()
});
exports.findAllPromoSchema = joi_1.default.object({
    page: joi_1.default.number().optional(),
    size: joi_1.default.number().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
