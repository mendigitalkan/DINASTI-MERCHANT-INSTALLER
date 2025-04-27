"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointHistorySchema = exports.selectMemberSchema = exports.requestOtpUpdatePasswordCustomerSchema = exports.requestOtpCustomerSchema = exports.updatePasswordCustomerPublicSchema = exports.updatePasswordCustomerSchema = exports.cusotmerVerifyOtpSchema = exports.loginCustomerSchema = exports.cusotmerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPyloadSchema_1 = require("./jwtPyloadSchema");
exports.cusotmerSchema = joi_1.default.object({
    // kode: Joi.string().required(),
    // cardid: Joi.string().required(),
    nama: joi_1.default.string().min(3).max(100).required(),
    alamat: joi_1.default.string().max(255).required(),
    kota: joi_1.default.string().max(100).required(),
    telp: joi_1.default.string().required(),
    ktp: joi_1.default.string()
        .length(16)
        .pattern(/^[0-9]+$/)
        .required(),
    // toko: Joi.string().max(100).required(),
    tgllahir: joi_1.default.string().required(),
    password: joi_1.default.string().max(100).required()
});
exports.loginCustomerSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    password: joi_1.default.string().max(100).required()
});
exports.cusotmerVerifyOtpSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    otpCode: joi_1.default.string().max(100).required()
});
exports.updatePasswordCustomerSchema = joi_1.default.object({
    user: jwtPyloadSchema_1.jwtPayloadSchema,
    password: joi_1.default.string().max(100).required()
});
exports.updatePasswordCustomerPublicSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    password: joi_1.default.string().max(100).required()
});
exports.requestOtpCustomerSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    type: joi_1.default.string().valid('register', 'forgotPassword').required()
});
exports.requestOtpUpdatePasswordCustomerSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
});
exports.selectMemberSchema = joi_1.default.object({
    telp: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
});
exports.pointHistorySchema = joi_1.default.object({
    kodemember: joi_1.default.string()
});
