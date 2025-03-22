"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNotification = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const notificationSchema_1 = require("../../schemas/notificationSchema");
const notifications_1 = require("../../models/notifications");
const removeNotification = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(notificationSchema_1.deleteNotificationSchema, req.query);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { notificationId } = value;
    try {
        const notification = await notifications_1.NotificationModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                notificationId: { [sequelize_1.Op.eq]: notificationId }
            }
        });
        if (notification == null) {
            const message = 'Notification not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        notification.deleted = 1;
        await notification.save();
        const response = response_1.ResponseData.success('Notification deleted successfully');
        logger_1.default.info(`Deleted notification with ID: ${notificationId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.removeNotification = removeNotification;
