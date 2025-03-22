"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOnePromotion = exports.findAllPromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const promotionSchema_1 = require("../../schemas/promotionSchema");
const promotions_1 = require("../../models/promotions");
const findAllPromotion = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(promotionSchema_1.findAllPromoSchema, req.query);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { page: queryPage, size: querySize, search, pagination } = value;
    try {
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const promotions = await promotions_1.PromotionModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ promotionName: { [sequelize_1.Op.like]: `%${search}%` } }]
                })
            },
            order: [['id', 'desc']],
            ...(pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(page.formatData(promotions));
        logger_1.default.info('Fetched all promotion successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllPromotion = findAllPromotion;
const findOnePromotion = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(promotionSchema_1.findOnePromoSchema, req.params);
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
            const message = 'Promo not found!';
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(promotion);
        logger_1.default.info('Fetched promotion details successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findOnePromotion = findOnePromotion;
