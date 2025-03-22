"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneMerchant = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const merchantSchema_1 = require("../../schemas/merchantSchema");
const merchantModel_1 = require("../../models/merchantModel");
const findOneMerchant = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(merchantSchema_1.findOneMerchantSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { merchantId } = value;
    try {
        const merchant = await merchantModel_1.MerchantModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                merchantId: { [sequelize_1.Op.eq]: merchantId }
            }
        });
        if (merchant == null) {
            const message = 'Merchant not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(merchant);
        logger_1.default.info(`Fetched merchant with ID: ${merchantId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findOneMerchant = findOneMerchant;
