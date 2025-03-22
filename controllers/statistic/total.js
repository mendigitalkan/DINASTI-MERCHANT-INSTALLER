"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalStatistic = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const merchantModel_1 = require("../../models/merchantModel");
const user_1 = require("../../models/user");
const totalStatistic = async (req, res) => {
    try {
        const totalMerchant = await merchantModel_1.MerchantModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalAdmin = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const total = {
            totalAdmin,
            totalMerchant
        };
        const response = response_1.ResponseData.success(total);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.totalStatistic = totalStatistic;
