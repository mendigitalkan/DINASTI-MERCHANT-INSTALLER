"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const promotionSchema_1 = require("../../schemas/promotionSchema");
const promotions_1 = require("../../models/promotions");
const removePromotion = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(promotionSchema_1.deletePromoSchema, req.query);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { promotionId } = value;
    try {
        const promotion = await promotions_1.PromotionModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                promotionId: { [sequelize_1.Op.eq]: promotionId }
            }
        });
        if (promotion == null) {
            const message = 'promotion not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        promotion.deleted = 1;
        await promotion.save();
        const response = response_1.ResponseData.success('promotion deleted successfully');
        logger_1.default.info(`Deleted promotion with ID: ${promotionId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.removePromotion = removePromotion;
