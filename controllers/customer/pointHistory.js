"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointHistory = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customerSchema_1 = require("../../schemas/customerSchema");
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../../configs");
const pointHistory = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.pointHistorySchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        try {
            const apiResponse = await axios_1.default.post(configs_1.APP_CONFIGS.externalAppUrl + '/historypoin', value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .send(response_1.ResponseData.success(apiResponse?.data ?? []));
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(response_1.ResponseData.success([]));
        }
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.pointHistory = pointHistory;
