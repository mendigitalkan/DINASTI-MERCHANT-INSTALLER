"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePushToken = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const sequelize_1 = require("sequelize");
const userFcmSchema_1 = require("../../schemas/userFcmSchema");
const userFcm_1 = require("../../models/userFcm");
const updatePushToken = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(userFcmSchema_1.updateUserFcmSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    console.log('=====user fcm======');
    console.log(value);
    try {
        const userFcm = await userFcm_1.UserFcmModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userFcmId: { [sequelize_1.Op.eq]: value.userFcmId }
            }
        });
        if (userFcm == null) {
            await userFcm_1.UserFcmModel.create(value);
        }
        else {
            await userFcm.update(value);
        }
        const response = response_1.ResponseData.success(userFcm);
        logger_1.default.info(`Updated userFcm with ID: ${value.certificateId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updatePushToken = updatePushToken;
