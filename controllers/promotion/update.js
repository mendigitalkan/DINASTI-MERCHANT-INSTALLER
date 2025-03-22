"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const sequelize_1 = require("sequelize");
const promotionSchema_1 = require("../../schemas/promotionSchema");
const promotions_1 = require("../../models/promotions");
const updatePromotion = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(promotionSchema_1.updatePromoSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const notification = await promotions_1.PromotionModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                promotionId: { [sequelize_1.Op.eq]: value.promotionId }
            }
        });
        if (notification == null) {
            const message = 'Promo not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        await notification.update(value);
        const response = response_1.ResponseData.success(notification);
        logger_1.default.info(`Updated notification with ID: ${value.promotionId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updatePromotion = updatePromotion;
