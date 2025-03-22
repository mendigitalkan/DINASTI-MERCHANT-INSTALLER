"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const validateRequest_1 = require("../../utilities/validateRequest");
const logger_1 = __importDefault(require("../../utilities/logger"));
const uuid_1 = require("uuid");
const notifications_1 = require("../../models/notifications");
const expo_server_sdk_1 = require("expo-server-sdk");
const sequelize_1 = require("sequelize");
const notificationSchema_1 = require("../../schemas/notificationSchema");
const userFcm_1 = require("../../models/userFcm");
const createNotification = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(notificationSchema_1.createNotificationSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const users = await userFcm_1.UserFcmModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            },
            attributes: ['userFcmId']
        });
        for (let i = 0; users.length > i; i++) {
            if (users[i].userFcmId !== null) {
                void sendNotification({
                    expoPushToken: users[i].userFcmId,
                    data: {
                        title: value.notificationName,
                        body: value.notificationMessage
                    }
                });
            }
        }
        value.notificationId = (0, uuid_1.v4)();
        const notification = await notifications_1.NotificationModel.create(value);
        const response = response_1.ResponseData.success(notification);
        logger_1.default.info('Notification created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createNotification = createNotification;
const sendNotification = async ({ expoPushToken, data }) => {
    const expo = new expo_server_sdk_1.Expo({ accessToken: process.env.ACCESS_TOKEN, useFcmV1: false });
    const chunks = expo.chunkPushNotifications([{ to: expoPushToken, ...data }]);
    const tickets = [];
    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
        catch (error) {
            logger_1.default.error(`Error sending notification: ${error}`);
        }
    }
    let response = '';
    for (const ticket of tickets) {
        if (ticket.status === 'error') {
            if (ticket.details != null && ticket.details.error === 'DeviceNotRegistered') {
                response = 'DeviceNotRegistered';
            }
        }
        if (ticket.status === 'ok') {
            response = ticket.id;
        }
    }
    return response;
};
