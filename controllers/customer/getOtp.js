"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const axios_1 = __importDefault(require("axios"));
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customer_1 = require("../../models/customer");
const configs_1 = require("../../configs");
const redis_1 = __importDefault(require("../../redis"));
const customer_2 = require("../../schemas/customer");
const requestOtp = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customer_2.requestOtpCustomerSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { telp } = value;
    try {
        const existingUser = await customer_1.CustomerModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: telp }
            }
        });
        if (existingUser === null) {
            const message = `whatsapp number ${telp} not registered.`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const minutes = 300;
        await redis_1.default.setex(`otp:${otpCode}`, minutes, otpCode); // Store OTP in Redis for 5 minutes
        const message = encodeURIComponent(`*${otpCode}* adalah kode verifikasi Anda.\n\n` +
            `Pengingat keamanan: Untuk memastikan keamanan akun Anda, mohon jangan bagikan informasi apa pun tentang akun Anda kepada siapa pun.`);
        const wablasResponse = await axios_1.default.get(`${configs_1.APP_CONFIGS.wablas.url}/send-message?phone=${telp}&message=${message}&token=${configs_1.APP_CONFIGS.wablas.apiKey}`);
        if (wablasResponse.status !== 200) {
            throw new Error('Failed to send OTP');
        }
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'OTP sent successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.requestOtp = requestOtp;
