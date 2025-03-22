"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMerchantSchema = exports.findOneMerchantSchema = exports.deleteMerchantSchema = exports.updateMerchantSchema = exports.createMerchantSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMerchantSchema = joi_1.default.object({
    merchantName: joi_1.default.string().required(),
    merchantLogo: joi_1.default.string().optional(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.updateMerchantSchema = joi_1.default.object({
    merchantId: joi_1.default.string().uuid().required(),
    merchantName: joi_1.default.string().required(),
    merchantLogo: joi_1.default.string().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.deleteMerchantSchema = joi_1.default.object({
    merchantId: joi_1.default.string().required()
});
exports.findOneMerchantSchema = joi_1.default.object({
    merchantId: joi_1.default.string().uuid().required()
});
exports.findAllMerchantSchema = joi_1.default.object({
    page: joi_1.default.number().optional(),
    size: joi_1.default.number().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
