"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordPublic = exports.updatePassword = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const scure_password_1 = require("../../utilities/scure_password");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customerSchema_1 = require("../../schemas/customerSchema");
const customer_1 = require("../../models/customer");
const updatePassword = async (req, res) => {
    console.log('_____update password_____');
    console.log(req.body);
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.updatePasswordCustomerSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { password } = value;
    console.log('_____update password_____');
    console.log(req.body);
    try {
        const user = await customer_1.CustomerModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: req.body?.user?.telp }
            }
        });
        if (user == null) {
            const message = 'Customer not found!';
            logger_1.default.info('Attempt to update non-existing user');
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const updatedData = {
            ...(password && { password: (0, scure_password_1.hashPassword)(password) })
        };
        await customer_1.CustomerModel.update(updatedData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: req.body?.user?.telp }
            }
        });
        logger_1.default.info('Customer updated successfully');
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'Customer updated successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updatePassword = updatePassword;
const updatePasswordPublic = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.updatePasswordCustomerPublicSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { password, telp } = value;
    console.log('_____update password_____');
    console.log(req.body);
    try {
        const user = await customer_1.CustomerModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: telp }
            }
        });
        if (user == null) {
            const message = 'Customer not found!';
            logger_1.default.info('Attempt to update non-existing user');
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const updatedData = {
            ...(password && { password: (0, scure_password_1.hashPassword)(password) })
        };
        await customer_1.CustomerModel.update(updatedData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: telp }
            }
        });
        logger_1.default.info('Customer updated successfully');
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'Customer updated successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updatePasswordPublic = updatePasswordPublic;
