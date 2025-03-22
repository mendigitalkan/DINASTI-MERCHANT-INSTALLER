"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWhatsAppVerification = exports.createWhatsAppVerification = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const user_1 = require("../../models/user");
const twilio_1 = require("twilio");
const configs_1 = require("../../configs");
const accountSid = configs_1.CONFIG.twilio?.accountSID ?? '';
const authToken = configs_1.CONFIG.twilio?.authToken ?? '';
const verifyService = configs_1.CONFIG.twilio?.verifyService ?? '';
const twilio = new twilio_1.Twilio(accountSid, authToken);
const createWhatsAppVerification = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['whatsAppNumber'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
            }
        });
        if (user == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        await twilio.verify.v2
            .services(verifyService ?? '')
            .verifications.create({ to: requestBody.whatsAppNumber, channel: 'whatsapp' });
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createWhatsAppVerification = createWhatsAppVerification;
const checkWhatsAppVerification = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['otpCode'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
            }
        });
        console.log(req.body.user);
        if (user == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const verificationCheck = await twilio.verify.v2
            .services(verifyService)
            .verificationChecks.create({
            to: requestBody?.whatsAppNumber ?? 0,
            code: requestBody?.otpCode
        });
        if (verificationCheck.status === 'approved') {
            user.userWhatsAppNumberVerified = true;
            void user.save();
        }
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.checkWhatsAppVerification = checkWhatsAppVerification;
