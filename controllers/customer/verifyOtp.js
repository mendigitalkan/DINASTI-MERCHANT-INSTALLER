"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customerSchema_1 = require("../../schemas/customerSchema");
const redis_1 = __importDefault(require("../../redis"));
const verifyOtp = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.cusotmerVerifyOtpSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    console.log(value);
    try {
        // Retrieve OTP from Redis
        const storedOtp = await redis_1.default.get(`otp:${value.otpCode}`);
        if (!storedOtp || storedOtp !== value.otpCode) {
            const message = 'Invalid or expired OTP!';
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        // Remove OTP from Redis after verification
        await redis_1.default.del(`otp:${value.otpCode}`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'OTP verified successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.verifyOtp = verifyOtp;
