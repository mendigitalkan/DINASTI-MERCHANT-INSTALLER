"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMerchant = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const merchantSchema_1 = require("../../schemas/merchantSchema");
const merchantModel_1 = require("../../models/merchantModel");
const findAllMerchant = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(merchantSchema_1.findAllMerchantSchema, req.query);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { page: queryPage, size: querySize, search, pagination } = value;
    try {
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const certificates = await merchantModel_1.MerchantModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ merchantName: { [sequelize_1.Op.like]: `%${search}%` } }]
                })
            },
            order: [['id', 'desc']],
            ...(pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(page.formatData(certificates));
        logger_1.default.info('Fetched all certificates successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllMerchant = findAllMerchant;
